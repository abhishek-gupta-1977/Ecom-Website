import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDesc: {
      type: String,
      required: true,
    },
    productImage: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    productPrice: { type: Number },
    productBrand: { type: String },
    productCategory: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", productSchema);
