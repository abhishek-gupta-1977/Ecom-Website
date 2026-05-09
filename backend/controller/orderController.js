import instance from "../config/razorpay.js";
import { Order } from "../models/orderModel.js";
import crypto from "crypto";
import { Cart } from "../models/cartModel.js";
import { log } from "console";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";
export const createOrder = async (req, res) => {
  try {
    const { amount, tax, shipping, currency, products } = req.body;

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    const neworder = new Order({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency,
      razorpayOrderId: razorpayOrder.id,
    });

    await neworder.save();

    res.status(201).json({
      success: true,
      order: razorpayOrder,
      dbOrder: neworder,
    });
  } catch (error) {
    console.log("Failed to create order", error);

    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentFailed,
    } = req.body;
    console.log(req.body);

    const userId = req.user._id;

    if (!razorpay_order_id) {
      return res
        .status(400)
        .json({ success: false, message: "Order id is required" });
    }

    if (paymentFailed) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { returnDocument: "after" },
      );
      return res
        .status(200)
        .json({ success: false, message: "Payment Failed!" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { returnDocument: "after" },
      );

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      await Cart.findOneAndUpdate(
        { userId: userId },
        { $set:{ items: [], totalPrice: 0 } },
      );
      return res.json({ success: true, message: "Payment successful", order });
    } else {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "Failed" },
        { returnDocument: "after" },
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Error verifying payment ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = req.user._id;

    const orders = await Order.find({ user })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImage",
      })
      .populate("user", "firstName lastName email");

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching my orders ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "produtName productPrice productImage",
      })
      .populate("user", "firstName lastName email");
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "firstName email")
      .populate("products.productId", "productName productPrice");
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    const totalSaleAggregation = await Order.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSales = totalSaleAggregation[0]?.total || 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesByDate = await Order.aggregate([
      { $match: { status: "Paid", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedSales = salesByDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));

    console.log(formattedSales);

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });
  } catch (error) {
    console.error("Error fetchinn sales data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
