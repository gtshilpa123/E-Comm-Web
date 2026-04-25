import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this._id = id;
    this.type = type; // e.g., 'admin', 'customer'
  }
  // static async Signup(name, email, password, type) {
  //   try {
  //     // 1. get access to database
  //     const db = getDB();
  //     // 2. get the collection
  //     const collection = db.collection("users");

  //     const newUser = new UserModel(name, email, password, type);

  //     // newUser.id = users.length + 1;
  //     // users.push(newUser);

  //     // 3. Insert the document
  //     await collection.insertOne(newUser); // since insertOne returns promise. So need to use async-await.
  //     return newUser;
  //   } catch (error) {
  //     throw new ApplicationError("Something went wrong", 500);
  //   }
  // }

  // static SignIn(email, password) {
  //   const user = users.find(
  //     (u) => u.email === email && u.password === password
  //   );
  //   return user || null;
  // }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "Password1",
    type: "seller",
  },
];

// All database operations are asynchronous and must be enclosed in try-catch block.

// Database operation and models operation should be separated and database operation is placed in Repository module. This helps to maintain separation of concern, which makes easy to maintain, easy to test our application. Now follows single responsibility principle.
