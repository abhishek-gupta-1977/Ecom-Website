import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice";
import userlogo from "../assets/user.webp";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items = [], totalPrice = 0 } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCart = async () => {
      if (!accessToken) return;
      try {
        const res = await axios.get("http://localhost:7001/api/v1/cart", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.data.success) {
          dispatch(setCart(res.data.cart));
          console.log(res.data.cart);
          // ← now correctly handled by new slice
        }
      } catch (error) {
        console.log("Cart fetch error:", error.response?.data || error);
      }
    };

    fetchCart();
  }, [accessToken, dispatch]);

  const navigate = useNavigate();

  const tax = totalPrice * 0.05;
  const shipping = totalPrice > 50 ? 0 : 12;
  const grandTotal = totalPrice + tax + shipping;

  let API = "http://localhost:7001/api/v1/cart";

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);
      console.log("MESSAGE:", error.response.data.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart.");
      }
    } catch (error) {
      console.log("Remove Error:", error.response?.data || error);
    }
  };

  return (
    <div className="pt-20 bg-[#F7F8FF] min-h-screen">
      {items.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#2218A7] mb-8">
            Shopping Cart
          </h1>

          <div className="flex gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-6 ">
              {items.map((item, index) => (
                <div
                  key={index}
                  className=" flex items-center p-10   gap-6 bg-white rounded-2xl border border-[#BBC4EB] shadow-sm"
                >
                  <img
                    src={item?.productId?.productImage?.[0]?.url || userlogo}
                    alt={item?.productId?.productName}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {item?.productId?.productName}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      ${item.price} × {item.quantity}
                    </p>
                    <p className="text-lg font-bold mt-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className=" flex gap-5 items-center">
                    <Button
                      onClick={() =>
                        handleUpdateQuantity(item.productId._id, "decrease")
                      }
                      variant="outline"
                      className="border-[#737CCF] text-[#2218A7]"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() =>
                        handleUpdateQuantity(item.productId._id, "increase")
                      }
                      variant="outline"
                      className="border-[#737CCF] text-[#2218A7]"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleRemove(item?.productId?._id)}
                    className="flex items-center gap-3 text-red-500  text-sm cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-96 ">
              <Card className="p-6 bg-white sticky top-28 border border-[#BBC4EB] rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="flex justify-between text-xl">
                  <span className="text-gray-600">Sub Total Amount</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Tax (5%):</span>
                  <span>{tax}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Shipping Charge:</span>
                  <span>{shipping}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span className="">Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Promo Code" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/address")}
                  className="w-full mt-8 bg-[#2218A7] hover:bg-[#737CCF] text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
                >
                  Proceed to Checkout
                </button>
                <Button
                 
                  className="bg-[#737CCF] hover:bg-[#2218A7] text-white p-4"
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>* Free shipping on orders above $50</p>
                  <p>* 7 days Return/Replace policy</p>
                  <p>* Secure checkout with SSL encryption</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-32">
          <h2 className="text-4xl font-bold text-gray-300">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-400 mt-4">
            Add some products to get started!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-26 w-80 p-2  bg-[#737CCF] hover:bg-[#2218A7] rounded-lg text-white font-bold transition duration-500"
            variant="outline"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
