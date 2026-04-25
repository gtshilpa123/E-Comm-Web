import jwt from "jsonwebtoken";

// In postman, in headers, Authorization present, which contains token.

const jwtAuth = (req, res, next) => {
  // 1. read the token
  console.log(req.headers);
  const token = req.headers["authorization"];

  // 2. if no token, return the error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. check if token is valid
  try {
    const payload = jwt.verify(
      token,
      "ZZT7jBL5HJAd0kL8zT4FsgzohkSDsnyMDhDoDrWqIu8"
    ); // same key used in jwt.sign().
    console.log(payload);
    req.userID = payload.userID;
  } catch (error) {
    // 4. return error
    return res.status(401).send("Unauthorized"); // reasons like token is modified, not present or expired
  }

  // 5. call next middleware
  next();
};
export default jwtAuth;
