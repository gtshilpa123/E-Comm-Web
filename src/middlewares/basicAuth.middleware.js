import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  // 1. Check if authorization header is empty.
  // Credentials we give is part of authorization header i.e., HTTP headers.
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader); // [Basic qwergtyhjuikmnbghn] email and password will be encoded in this format.

  // base 64 encoding is a popular encoding technique to encode binary data to text data when transfering from client to server.
  // 2. Extract credentials. [Basic qwergtyhjuikmnbghn] This is credential encoded with base64 format
  const base64Credentials = authHeader.replace("Basic ", "");
  console.log(base64Credentials);
  // 3. decode credentials
  // decode from base64 format to utf8
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds); // [username:password]
  const creds = decodedCreds.split(":"); // generate array of username and password
  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    return res.status(401).send("Incorrect Credentials");
  }
};
export default basicAuthorizer;

// In postman, click on authorization. select "basic auth", enter username and password. Click "send".
// Encoding : To convert data into a different format so it can be safely transmitted or stored. It's about data representation, not security.

// Encryption : To secure data so that only authorized parties can read it. It's about confidentiality, not data formatting. One way of encryption is hashing.

// Problems with basic authentication :-
// 1. No encryption, hence not very secure.
// 2. Client needs to store credentials, which can be exposed. Credentials stored on browser can be accessed by spyware attacks or brute force attacks
// 3. Easy to crack using Brute-Force attacks.
// 4. It has limited scalability.

// JWT (JSON Web Token) :-
// 1. It uses encryption and not use encoding.
// It uses hashing technique. If password is hashed, it cannot be reversed. There is no decoding in hashing.
// 2. JWT is loosely coupled and it is made for stateless protocols.
// 3. Easy to scale
// 4. Can be used by mobile and web both.
// Structure of JWT : drfgtyhjytfghyfhhgdrthgfddx.asfgyhgfdcvbnnjhfdsertgfdxbnh.adbbgfvcdfrtyhhnjuhgdd (3 parts separated by .)
// Header : tells that what is the algorithm used for encryption and what is the type of token.
// Header is JSON format, {"alg": "HS256", "typ":"JWT"}
// Payload : contains what resources that user can access even though user has been logged in. Sensitive data like credentials password should not be stored in payload as payload can be easily decrypted. Hence token containing password is not stored in payload. JWT payload contents can be read without the secret key.
// Payload is in JSON format, {"sub": "1234567890", "name": "John Doe", "admin": true}
// Signature :

// Client                             Server
// 1. Login with credentials --------> 2. Creates a JWT Token
// 3. Sends token to client <-------------
// 4. Sends token in authorization header --------> 5. Verifies JWT token, Access client info
//  <--------- 6. Send response to client

// Intially, client has to give credentials to server. Server verifies credentials, creates a token and send back token to client. Client will place token in authorization header for accessing product API or customer API. No need to send credentials again. Token with authorization header is send to server from client. Server validates token if it is expired or not and access client info. Sends response back to client.

// JWT allows for stateless authentication, eliminating the need for server-side session storage.
// JWT enables easy scalability in distributed systems due to its stateless nature.
// JWT provides a secure mechanism for carrying authentication and authorization information in the token itself.
// JWT tokens can be understood and utilized by both web clients and mobile applications.

// npm i jsonwebtoken -> to create and manage JWT token.
