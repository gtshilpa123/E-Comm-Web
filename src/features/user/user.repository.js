import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema
const UserModel = mongoose.model("User", userSchema); // User -> name of the collection

export default class UserRepository {
  async signUp(user) {
    try {
      // create instance of model
      const newUser = new UserModel(user); // instance of constructor
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async signIn() {
    try {
      return await UserModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async resetPassword(userID, newPassword) {
    try {
      const user = await UserModel.findById(userID);
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

// ValidationError class is coming from mongoose.
