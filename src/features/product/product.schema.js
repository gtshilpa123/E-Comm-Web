import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  inStock: Number,
  reviews: [
    // every product has an array of reviews. One to many relationship
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

// Another example for many-many relationship.
const jobSchema = new mongoose.Schema({
  title: String,
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
    },
  ],
});
const applicantSchema = new mongoose.Schema({
  name: String,
  jobsApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});
