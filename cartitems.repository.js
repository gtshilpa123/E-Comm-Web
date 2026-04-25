import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db); // this id is used only on insert not on update. So, $setOnInsert is used.
      await collection.updateOne(
        {
          productID: new ObjectId(productID),
          userID: new ObjectId(userID),
        },
        { $inc: { quantity: quantity }, $setOnInsert: { _id: id } },
        { upsert: true } // will update document if it exist or create the document if doesn't exist.
        // When upsert is true, update function will perform insert or update.
      );
      // await collection.insertOne({
      //   productID: new ObjectId(productID),
      //   userID: new ObjectId(userID),
      //   quantity,
      // });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async delete(cartItemID, userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemID),
        userID: new ObjectId(userID),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getNextCounter(db) {
    const resultDocument = await db.collection("counters").findOneAndUpdate(
      { _id: "cartItemId" },
      {
        $inc: { value: 1 },
      },
      { returnDocument: "after" }
    );
    console.log(counter);
    return resultDocument.value.value;
  }
  // resultDocument.value.value -> first value is for mongodb and second value is attribute "value"
  // findOneAndUpdate method will find the document and return the original document before update by default.
  // In option, if "returnDocument" is specified, will return the updated document.
}

// Another program
db.users.updateOne(
  { _id: userId },
  { $inc: { followers: 1 } },
  { upsert: true }
);

// mondodb indexes : Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan i.e., scan every document in a collection, to select those documents that match the query statement.
// MongoDB creates separate storage for indexes.
// Indexes facilitate quicker query read operations.
// The default behaviour of MongoDB indexing -> ascending indexing.
// We can create index on attribute having lot of queries.
// Text based indexes :- In a large paragraph, we want to search for specific string, text based indexes are useful.
// Read queries are faster and write queries are slower.
