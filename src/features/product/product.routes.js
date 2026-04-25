// Manage routes/paths to ProductController

// Import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// Initialize Express router
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to controller methods
// localhost/api/products/

productRouter.get("/rate", (req, res, next) =>
  productController.rateProduct(req, res, next)
);
productRouter.get("/filter", (req, res) => {
  productController.filterProducts;
});

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

productRouter.post(
  "/",
  upload.single("imageUrl"),
  // upload.single() to upload single file
  // upload.array() to upload multiple files
  (req, res) => {
    productController.addProduct(req, res);
  }
);

productRouter.post("/rate/:productId", productController.rateProduct);

productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res);
});

productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
// localhost:3200/api/products/filter?minPrice=10&maxPrice=50&category=Category1

export default productRouter;

// In postman, to test file upload:
// Select POST method
// Enter URL: localhost:3200/api/products
// Go to Body tab and select form-data
// Add key as name, price, sizes and imageUrl
// For sizes, give comma separated values e.g., S,M,L
// For imageUrl, select type as File from dropdown
// Choose a file to upload
// Click Send

// As per the HTTP/1.1 specification, a POST request that results in the creation of a new resource should return a 201 (Created) status code. This indicates that the request has been fulfilled and has led to the creation of a new resource  and to provide clarity to the client with the new resource's details, including any server-generated fields like IDs.

// The purpose of req.body is when you want to modify something on the server, like adding a new product, updating user info, etc. It carries the data you want to send to the server to perform those actions.

// The req.query object in Express.js captures query parameters from the URL. Query parameters are typically used to filter or sort data when making GET requests. For example, in a URL like /products?minPrice=10&maxPrice=50, minPrice and maxPrice are query parameters that can be accessed via req.query.minPrice and req.query.maxPrice. 50 and 10 are strings here. So, if you need them as numbers, you'll have to convert them using parseInt() or parseFloat() as needed.

// The tight coupling between views and controllers in MVC can cause unintended effects or errors when one is changed, making rapid interface iteration difficult.

// Caching is a technique where responses from frequently accessed resources are stored temporarily to improve system performance and efficiency. This reduces unnecessary network  calls, making response retrieval faster for repeated requests.

// /api/ prefix is used in routes in RESTful APIs to clearly indicate that the endpoints are part of an Application Programming Interface (API). This helps differentiate API routes from standard web page routes in a full-stack application, making it easier for developers to identify and interact with the API. It provides a clear separation between frontend and backend routes.
