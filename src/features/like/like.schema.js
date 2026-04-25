import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "referenceName",
  },
  referenceName: {
    type: String,
    enum: ["Product", "Category"],
  },
})
  .pre("save", (next) => {
    console.log("New like coming in");
    next();
  })
  .post("save", (doc) => {
    console.log("Like is saved");
    console.log(doc);
  })
  .pre("find", (next) => {
    console.log("Retriving likes");
    next();
  })
  .post("find", (docs) => {
    console.log("Find is completed");
    console.log(docs);
  });
// in "pre" hooks, "next" is used to proceed to the next middleware or operation

// in "post" hooks, "doc" refers to the document that was just saved. There is no "next" parameter here because the operation has already completed.
