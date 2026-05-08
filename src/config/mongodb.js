// MongoClient is a class importing from "mongodb" package.
//   mongodb://localhost:27017/ -> copy connection string from mongodb compass.
// ecomdb -> name of the database that want to connect.
// mongodb connection string format
// connect() function return promise.
// We need to connect to database as soon as server has started.

// import dotenv from "dotenv";

// dotenv.config();
// If these 2 lines are imported at beginning in server file, no need to import again.

// const url = process.env.DB_URL; this url is undefined as it is executed before mongodb imported in server.js

import { MongoClient } from "mongodb";

let client;

export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongodb is connected");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};
// we are receiving client instance of mongodb while connecting to database.

export const getClient = () => {
  return client;
};

export const getDB = () => {
  return client.db(); // this line optionally take database name.Since we have given database name in url, so no need to specify database name here.
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });
  } catch (error) {
    console.log(error);
  }
  console.log("Indexes are created");
};

// const connectToMongoDB = async () => {
//   try {
//     await MongoClient.connect(url);
//     console.log("Connected to DB!");
//   } catch (error) {
//     console.log(err);
//   }
// };

// To access a specific database after connecting to a MongoDB server using the Node.js MongoDB driver is by invoking the db method on the client instance and passing the name of the database as an argument.
// process.env is an object which loads environment variables in application.

// Environment file contains all the secrets like configuration details, connection strings, JWT token secrets. This file is never commit to repository and never pushed outside the system.

// The dotenv library in Node.js is designed to read and load variables from a .env file directly into the process.env object.
// The dotenv library expects environment variables in a .env file to be in the format KEY=value.

// ObjectId has 12 bytes long.
// First 4 bytes -> timestamp, the time when this document is created.
// Second 3 bytes -> is machine identifier. Every machine has an identifier unique ID.
// Next 2 bytes -> is process ID. MongoDB is being executed by a process on computer
// Last 3 bytes -> counter. Even if machine, timestamp, process is same, it uses counter to make unique.

// 1. Counter collection (_id:"cartItemId", value:0) -> will keep track of last ID inserted.
// 2. While adding cart items, increment the counter and then use counter value as id to cartitem document.

// There's a "books" collection with "title"(text), "author"(text), and "publishedYear"(number). Books are sorted by title (A-Z) and author (Z-A).
// db.books.createIndex({ title: 1, author: -1 });
