// npm init
// npm install express
// npm i swagger-ui-express for swagger implementation
// npm i cors
// npm i mongodb

// env file must be loaded first before any files imported.
import "./env.js";

// 1. Import express
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import body from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartitems/cartitems.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongoose.config.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.router.js";
// localhost:3200/api-docs

// 2. Create Server
const server = express();

// CORS policy configuration

var corsOptions = {
  origin: "http://localhost:5500",
  allowedHeaders: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // to allow cookies and authentication headers
};
server.use(cors(corsOptions));

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500");
//   // res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
//   res.header("Access-Control-Allow-Headers", "*"); // to allow all headers
//   res.header("Access-Control-Allow-Headers", "*"); // to allow what methods that client can access.
//   // return ok for preflight request
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// res.header("Access-Control-Allow-Origin", "*"); to allow access to all web browser clients.
// Response to preflight request doesn't pass access control check. It does not have HTTP OK status.
// preflight is verification request. If server does not respond OK to preflight request, client will not send actual request.
// The "Access-Control-Allow-Origin" header is used to specify the origin(s) that are allowed to access the server APIs. It defines which client URLs are granted access to the server resources.
// In CORS, a preflight request is a verification request sent by the client to the server before making an actual request. The purpose of the preflight request is to check whether the server allows the client to access its resources, and it includes specific headers to determine the permissions.
// });

server.use(body.json()); // to parse json body
server.use(express.json()); // to parse json data and put it in req.body

// server.get("/products", ProductController.getAllProducts);
// For all requests related to product, redirect to product routes.
// localhost:3200/products -> according to MVC.
// localhost:3200/api/products -> according to API.

// server.use("/api/products", basicAuthorizer, productRouter);
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs)); // server will create API using setup document apiDocs
// Bearer <token>
server.use(loggerMiddleware);
server.use("/api/orders", jwtAuth, orderRouter);

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", loggerMiddleware, jwtAuth, cartRouter);
server.use("/api/likes", jwtAuth, likeRouter);

// 3. Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to E-Commerce API"); // on browser display this message
});

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  // for mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  // for user-defined errors
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  // for server errors
  res.status(500).send("Something went wrong, please try later");
});

// 4. Middleware to handle 404 requests.
server.use((req, res) => {
  res.status(404).send("API not found.");
}); // 404 middleware should put at below when none of the requests are not matched.

// 5. Specify port.
server.listen(3200, () => {
  console.log("Server is running on port 3200");
  // connectToMongoDB();
  connectUsingMongoose();
});

// 400 -> for incorrect or bad request errors
// 500 -> for server errors
// 503 -> service unavailable for some reasons if server is gone, if there's some network issues.

// The status codes in a REST API provides detailed information about the status of the request to users, making the API more user-friendly.
// Validating data helps prevent security vulnerabilities such as SQL injection and enhances the overall security of the application.
// In Express, for the API endpoint "api/user/123456" where "123456" is the user ID, you can correctly retrieve the user ID using req.params.userId. This is because req.params captures values from the URL path, specifically the 'userId' we define in the route.
// req.query.userId (for query parameters), req.body.userId (for request body)
