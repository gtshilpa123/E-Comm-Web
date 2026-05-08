import { ObjectId } from "mongodb";

import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async get(id) {
    // id coming from postman is plain string not objectId of mongodb.
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //   filterExpression.price = {
      //     ...filterExpression.price,
      //     $lte: parseFloat(maxPrice),
      //   };
      // }
      // ['Cat1','Cat2']
      categories = JSON.parse(categories.replace(/'/g, '"'));
      console.log(categories);
      if (categories) {
        filterExpression = {
          $or: [{ category: { $in: categories } }, filterExpression],
        }; // In Postman, localhost:3200/api/products/filter?categories=['Cat1','Cat2']&minPrice=70000
        // $in will treat categories as an array. In postman categories come as string. So need to convert string into array.
        // JSON.parse will convert string into object.
        // $in operator is employed to filter the documents, retaining only those which matches excluding others.
        // filterExpression.category = category;
      }
      return collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } })
        .toArray();
      // projection operator changes the view of the final result. Inclusion of attribute -> 1. Exclusion of attribute -> 0.
      // $slice operator will give 1 rating in all documents.
      // {$slice:-1} -> will give last rating in all documents.
      // {$slice:-2} -> will give last 2 ratings in all documents.
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  // async rate(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     // 1. Find the product
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productID),
  //     });
  //     // 2. Find the rating
  //     const userRatingObject = product?.ratings?.find(
  //       (item) => item.userID == userID
  //     );
  //     if (userRatingObject) {
  //       // Update the rating
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "ratings.userID": new ObjectId(userID),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //           // "$" placeholder will give first rating, which it will find based on above criteria in that product.
  //         }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productID) },
  //         {
  //           $push: { ratings: { userID: new ObjectId(userID), rating } },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }

  async rate(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      // 1. Removes existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );
      // 2. Add new entry
      await collection.updateOne(
        { _id: new ObjectId(productID) },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
      // push and pull are atomic operations, either both will execute at the same time or none of these.
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            // Stage 1: Get average price per category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  // aggregate function return array of multiple objects.
}

export default ProductRepository;

// All mongodb functions return as promises.
// mongodb has its own set of operators.

// collection.find({category:"Electronics", price:{$gte:50, $lte:150}}).toArray();

// Race condition is when there are 2 requests parallely running to perform the same operation on a shared data. For example, rating is updated by same user on 2 different computer. Then, database will give incorrect data.

// $pull -> will remove completed tasks from the list based on a condition without adding new tasks in MongoDB

// Another program
// {
//   "_id": ObjectId("456"),
//     "tasks": [
//       {
//         "taskId": "task123",
//         "taskName": "Task A",
//         "progress":"incomplete"
//       },
//       {
//         "taskId": "task456",
//         "taskName": "Task B",
//         "progress":"incomplete"
//       }
//   ]
// }

db.projects.updateOne(
  { _id: ObjectId("456"), "tasks.taskId": "task123" },
  { $set: { "tasks.$.progress": "completed" } }
);

// Another program
db.collection.updateOne(
  { _id: ObjectId("456") },
  { $pull: { scores: { $gt: 90 } } }
);
// This code snippet performs an update operation using $pull operator to remove all array elements that are greater than 90.

// Another program
// {$group:{_id:"$product",totalRevenue:{$sum:{$multiply:["$quantity","$price"]}}}}
// This uses the $group stage to group documents by the "product" field. Inside the $group stage, it utilizes the $sum accumulator with the $multiply operator to calculate the total revenue for each product.

// $cond -> evaluates boolean expression to return one of the two specified return expressions.

// Run below code on mongo shell.
// show dbs
// use ecomdb
db.products.aggregate([
  // 1. Create documents for ratings
  {
    $unwind: "$ratings",
  },
  // 2. Group rating per product and get average
  {
    $group: {
      _id: "$name",
      averageRating: { $avg: "ratings.rating" },
    },
  },
]);

db.products.aggregate([
  // 1. Project the name of product, and countOfRating
  {
    $project: {
      name: 1,
      countOfRating: {
        $cond: {
          if: { $isArray: "$ratings" },
          then: { $size: "$ratings" },
          else: 0,
        },
      },
    },
  },
  {
    // 2. Sort the collection
    $sort: { countOfRating: -1 },
  },
  {
    // 3. Limit to just 1 item in result
    $limit: 1,
  },
]);
// meetup.com
// Mediam.com
// analytics vidhya
// arxiv

// Another program
// The $unwind stage is used to create a separate document for each score within the "scores" array.
// The $group stage groups the documents back together by _id and calculates the average score using the $avg accumulator.
// The $first operator is used to retain the student's name during the grouping process.
// Original: {
//   "_id": ObjectId("1"),
//   "name": "Alice",
//   "scores": [85, 92, 78, 95]
// }
// {
//   "_id": ObjectId("2"),
//   "name": "Bob",
//   "scores": [70, 88, 92, 75]
// }
// Transformed:
// {
//   "_id": ObjectId("1"),
//   "name": "Alice",
//   "averageScore":87.5
// }
// {
//   "_id": ObjectId("2"),
//   "name": "Bob",
//   "averageScore":81.25
// }

db.students.aggregate([
  { $unwind: "$scores" },
  { $group: { _id: "$_id", averageScore: { $avg: "$scores" } } },
]);
// aggregation will not modify data in database but modifies the result.
