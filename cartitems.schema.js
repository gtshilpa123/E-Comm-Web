import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // product is collection from which productId is coming
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: Number,
});
