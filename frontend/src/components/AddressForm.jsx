import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  addAddress,
  deletedAddress,
  setSelectedAddress,
} from "@/redux/productSlice.js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { setCart } from "@/redux/cartSlice";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const { addresses, selectedAddress } = useSelector((store) => store.product);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 50 ? 0 : 12;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate()
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/order/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      if (!data.success) return toast.error("Something went wrong!");
      console.log("Razor Pay Data:", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "ECommerce",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
              response,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            if (verifyRes.data.success) {
              toast.success("Payment Successful");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Error verifying payment");
          }
        },
        modal: {
          ondismiss: async function () {
            await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true,
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            toast.error("Payment Cancelled or failed!");
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNo,
        },
        theme: { color: "#F47286" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        await axios.post(
          `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
          {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        toast.error("Payment failed Please try again");
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      console.log(error.message);

      toast.error( error?.response?.data?.message ||"Something went wrong while processing payment");
    }
  };

return (
  <div className="min-h-screen bg-[#E1E5F8] py-16">
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 px-8">

      {/* Left Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#BBC4EB] p-8">
        {showForm ? (
          <>
            <h1 className="text-3xl font-bold text-[#2218A7] mb-8">
              Shipping Address
            </h1>

            <div className="space-y-5">
              {[
                ["Full Name", "fullName"],
                ["Phone Number", "phoneNo"],
                ["Email", "email"],
                ["Address", "address"],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="text-[#2218A7] font-medium">{label}</Label>
                  <Input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-2 h-12 rounded-xl border-[#BBC4EB] focus:ring-2 focus:ring-[#737CCF]"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-[#BBC4EB]"
                />
                <Input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-[#BBC4EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-[#BBC4EB]"
                />
                <Input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-[#BBC4EB]"
                />
              </div>

              <Button
                className="w-full h-14 bg-[#2218A7] hover:bg-[#737CCF] rounded-xl text-white"
                onClick={handleSubmit}
              >
                Save & Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#2218A7] mb-8">
              Saved Addresses
            </h1>

            <div className="space-y-4">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`p-5 rounded-2xl cursor-pointer transition border-2
                    ${
                      selectedAddress === index
                        ? "bg-[#737CCF] text-white border-[#2218A7]"
                        : "bg-[#E1E5F8] border-[#BBC4EB]"
                    }`}
                >
                  <h2 className="font-bold text-lg">{address.fullName}</h2>
                  <p>{address.phoneNo}</p>
                  <p>{address.email}</p>
                  <p>
                    {address.address}, {address.city}, {address.state}
                  </p>

                  <button
                    onClick={() => dispatch(deletedAddress(index))}
                    className="mt-3 text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-5 bg-[#737CCF] hover:bg-[#2218A7]"
              onClick={() => setShowForm(true)}
            >
              + Add New Address
            </Button>

            <Button
              className="w-full mt-4 bg-[#2218A7] hover:bg-[#737CCF]"
              disabled={selectedAddress === null}
              onClick={handlePayment}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </div>

      {/* Order Summary */}
      <Card className="rounded-3xl shadow-xl border border-[#BBC4EB] bg-white h-fit">
        <CardHeader className="bg-[#737CCF] rounded-t-3xl">
          <CardTitle className="text-2xl text-white">
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 space-y-5">
          <div className="flex justify-between text-[#2218A7]">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          <div className="flex justify-between">
            <p>Tax</p>
            <p>₹{tax}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>₹{shipping}</p>
          </div>

          <Separator />

          <div className="flex justify-between text-xl font-bold text-[#2218A7]">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
};

export default AddressForm;
