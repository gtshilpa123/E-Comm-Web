import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async addProduct(req, res) {
    // console.log(req.body);
    // console.log("This is a post request");
    // res.status(200).send("Post request received");
    try {
      const { name, price, sizes, categories, description } = req.body;
      // const newProduct = {
      //   name,
      //   price: parseFloat(price),
      //   sizes: sizes.split(","),
      //   imageUrl: req.file.filename,
      // };
      const newProduct = new ProductModel(
        name,
        description,
        parseFloat(price),
        req?.file?.filename,
        categories,
        sizes?.split(",")
      );
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }
  // /api/producs : {"name":"Amazon Kindle","price":15000,"description":"E-book reader by Amazon", "categories":"id1,id2"}

  async rateProduct(req, res, next) {
    // next parameter for calling application level error handling
    console.log(req.query);
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      // try {
      await this.productRepository.rate(userID, productID, rating);
      // } catch (error) {
      // return res.status(400).send(error.message);
      // }
      return res.status(200).send("Rating has been added");
    } catch (error) {
      console.log(error);
      console.log("Passing error to middleware");
      next(error); // calling application level middleware from controller
    }
    // localhost:3200/api/products/rate?userID=2&productID=1&rating=4
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(minPrice, categories);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }

  async averagePrice(req, res, next) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }
}
