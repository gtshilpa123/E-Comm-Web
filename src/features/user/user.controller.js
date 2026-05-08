import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      // const user = await UserModel.Signup(name, email, password, type);

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, password, type);
      await this.userRepository.Signup(user);
    } catch (error) {
      next(error);
      // throw new ApplicationError("Something went wrong", 500);
    }
  }
  // UserModel.Signup return promise. Hence, enclose it in try-catch block and use async-await.

  async signIn(req, res, next) {
    try {
      // 1. find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 2. compare password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. create token
          const token = jwt.sign(
            { userID: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          // 4. send token
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
      // const result = await this.userRepository.Signin(
      //   req.body.email,
      //   req.body.password
      // );
      // if (result) {
      // // 1. create token
      // const token = jwt.sign(
      //   { userID: result.id, email: result.email }, // payload part
      //   "ZZT7jBL5HJAd0kL8zT4FsgzohkSDsnyMDhDoDrWqIu8", // private key
      //   { expiresIn: "1h" } // optional
      // );
      // // 2. send token
      // return res.status(200).send(token); // token is passed to client separated by (.) which can be seen in postman.
      // } else {
      //   return res.status(401).send("Invalid credentials");
      // }
    } catch (error) {
      next(error);
      console.log(error);
      return res.status(500).send("Something went wrong");
      // next();
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const userID = req.userID;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is reset");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
}
// status 401 is for unauthorized access due to invalid credentials
// status 400 is for bad request due to malformed syntax
// jwt.sign() -> function basically signs the token by provided algorithm and private key and payload.
// jwt header and signature managed internally and payload can store id's which can always retrieve when a user sends another request to understand who this user is.
// payload stores users authorization permissions what all details or resources user is authorized to access.

// npm i bcrypt
// salt -> is the additional data added to password while hashing so that it is difficult to break using brute-force algorithms.
// If 2 users have same password, then hashing will be same. It can easily break using brute-force algorithms. Hence, salt is used.
// When a user logs in, they first enter their password. The system then retrieves the stored hash from the database and compares both passwords to authenticate the user.

// npm i dotenv
// dotenv package helps to load environment variables in our application.
