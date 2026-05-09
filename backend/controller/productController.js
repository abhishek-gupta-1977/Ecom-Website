import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDesc,
      productPrice,
      productBrand,
      productCategory,
    } = req.body;
    const userId = req.user._id;
    productPrice: Number(productPrice);

    if (
      !productName ||
      !productPrice ||
      !productDesc ||
      !productCategory ||
      !productBrand
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    let productImage = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "Ecom_products",
        });

        productImage.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newProduct = await Product.create({
      userId,
      productName,
      productBrand,
      productDesc,
      productCategory,
      productPrice: productPrice,
      productImage,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Products not found!",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product Id not found!",
      });
    }

    const product = await Product.findById(productId);

    if (product.productImage && product.productImage.length > 0) {
      for (let img of product.productImage) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product id not found!",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    const {
      productName,
      productDesc,
      productBrand,
      productCategory,
      productPrice,
      existingImages,
    } = req.body;

    product.productPrice = Number(productPrice) || product.productPrice;

    let updatedImages = [];
    if (existingImages) {
      let keepIds = [];

      try {
        keepIds = JSON.parse(existingImages);
      } catch (error) {
        keepIds = [];
      }

      updatedImages = product.productImage.filter((img) =>
        keepIds.includes(img.public_id),
      );

      const removedImages = product.productImage.filter(
        (img) => !keepIds.includes(img.public_id),
      );
      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImages = product.productImage;
    }

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "Ecom_products",
        });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    //updated product

    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productBrand = productBrand || product.productBrand;
    product.productCategory = productCategory || product.productCategory;
    product.productPrice = Number(productPrice) || product.productPrice;
    product.productImage = updatedImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
