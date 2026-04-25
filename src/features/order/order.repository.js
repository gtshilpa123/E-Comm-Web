import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();
      // 1. Get cartitems and calculate total amount
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);

      // 2. Create an order record
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, { session });

      // 3. Reduce the stock
      // show dbs
      // use ecomdb
      // db.products.updateMany({},{$set:{stock:20}})
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }

      // 4. Clear the cart items
      await db
        .collection("cartItems")
        .deleteMany({ userID: new ObjectId(userId) }, { session });
      session.commitTransaction(); // updates database. All operations in transaction have been completed and database is now in integrated state.
      session.endSession();
      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getTotalAmount(userId, session) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate(
        [
          // 1. Get cart items for the user
          {
            $match: { userId: new ObjectId(userId) },
          },
          // 2. Get the products from products collection based on productId in cartitems
          {
            $lookup: {
              from: "products", // products collection
              localField: "productID", // attribute from cartitems collection
              foreignField: "_id", // attribute from products collection
              as: "productInfo", // common name and we get array of products
            },
          },
          //   3. unwind the productInfo
          {
            $unwind: "$productInfo", // we get individual products
          },
          // 4. calculate totalAmount for each cartitems
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    console.log(items);
    return items;
  }
}

// Transactions are used to group multiple operations into an atomic unit, ensuring that either all the operations succeed or more of them do. This guarantees data consistency and integrity.
// $match operator will match the specified conditions and returns the filtered documents.

db.collection("news").aggregate([
  {
    $group: {
      _id: { author: "$author", tag: "$tag" },
      totalArticles: { $sum: 1 },
    },
  },
  {
    $project: { author: "$_id.author", tag: "$_id.tag", totalArticles: 1 },
  },
]);

// The code put in transaction, if something fails in middle the entire operation gets reverted back.
// Transaction is a collection of all the database operations which must be performed in such a way that either all the operations are executed or none of them.

// mongodb are made for scalable applications where you can create multiple replica of your databases and then distribute your database over multiple replicas to basically balance load or allow more number of requests to be handled with a single request without any performance issues.
// mongodb instance is a standalone instance. But for transactions to run need to convert standalone instance into replica sets.
// The session object in MongoDB -> represents a logical transaction context, allowing you to group operations into a transaction.
// In scalable applications, a single client will not be able to handle multiple requests. So we can copy databses so that all can handle load using some kind of load balancer. This is replica set.
// Before starting with replica set, in command terminal, mongod --replSet rs0 --dbpath=mongodb-data
// replSet -> replica set
// rs0 -> name for replica set
// db.shutdownserver() -> to come out of server.
// Now return to mongo shell, rs.initiate()
// Now replica set is running
