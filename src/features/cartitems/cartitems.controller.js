import CartItemModel from "./cartitems.model.js";
import CartItemsRepository from "./cartitems.repository.js";

export class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID; // userID attached to request object in jwtAuth middleware after verifying the token. Verification results in payload which contains userID.
      // userID cannot be taken from client. Instead taken from token.
      await this.cartItemsRepository.add(productID, userID, quantity);
      res.status(201).send("Cart is added");
    } catch (error) {
      console.log(error);
      return res.status(200).send("Something went wrong");
    }
  }

  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartItemsRepository.get(userID);
      return res.status(200).send(items);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }

  async delete(req, res) {
    try {
      const userID = req.userID;
      const cartItemID = req.params.id;
      const isDeleted = await this.cartItemsRepository.delete(
        cartItemID,
        userID
      );
      if (!isDeleted) {
        return res.status(404).send("Item not found");
      }
      return res.status(200).send("Cart item is removed");
      // if (error) {
      //   return res.status(404).send(error);
      // } else {
      //   return res.status(200).send("Cart item is removed");
      // }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
}
