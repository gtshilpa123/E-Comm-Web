import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
  constructor() {
    this.collection = "users";
  }

  async Signup(newUser) {
    try {
      // 1. get access to database
      const db = getDB();
      // 2. get the collection
      const collection = db.collection(this.collection);
      // 3. Insert the document
      await collection.insertOne(newUser); // since insertOne returns promise. So need to use async-await.
      return newUser;
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async Signin(email, password) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
export default UserRepository;

// The repository module in a Node.js application is primarily designed to serve as an abstraction layer over the data access code. This means that instead of having database-related code scattered throughtout the application, it is centralized within the repository.
