import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, UserStar } from "lucide-react";

const OrderCard = ({ orders, loading }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full  ">
      <div className="flex items-center justify-center gap-3 my-3 ">
        <ArrowLeftIcon
          onClick={() => navigate(-1)}
          className="text-white bg-[#2218A7] p-1 rounded-lg cursor-pointer hover:bg-[#737CCF]"
        />
        <h1 className="text-2xl font-bold  text-[#2218A7] pb-1 ">Orders</h1>
      </div>

      {loading ? (
        <div className="h-screen flex items-center justify-center w-full ">
          <p className="font-bold text-4xl text-gray-800">Loading..</p>
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <>
              <div className="text-[#737CCF] text-xl font-semibold">
                No orders found! Shop Now
              </div>
            </>
          ) : (
            <div className="flex items-baseline justify-center   bg-gray-100 p-10 rounded-2xl mb-20">
              <div>
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="border border-[#BBC4EB] bg-[#E1E5F8]  mt-5 w-full rounded-2xl shadow-lg p-8"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <h2 className="text-[#2218A7] text-xl font-semibold">
                          Order ID:
                        </h2>
                        <p className="text-md text-gray-500 font-light">
                          {order._id}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg text-[#2218A7] font-semibold">
                          Amount:
                        </p>
                        <p className="text-sm text-gray-500">
                          INR {order.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <div className="flex gap-1">
                          <p className="font-semibold text-md">User: </p>
                          <span className="text-gray-600 text-sm">
                            {order.user?.firstName} {order.user?.lastName}
                          </span>
                        </div>
                        <p>{order.user?.email}</p>
                      </div>
                      <div
                        className={`p-2 rounded-sm font-bold text-xs ${order.status === "Paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold mt-5">Products:</p>
                      {order.products.map((product, index) => {
                        return (
                          <div key={index} className="bg-white p-3 my-2 rounded-lg">
                            <div className="grid grid-cols-2 gap-5 ">
                              <div className="flex items-center gap-5">
                                <img
                                  onClick={() =>
                                    navigate(
                                      `/product/${product.productId._id}`,
                                    )
                                  }
                                  src={
                                    product?.productId?.productImage?.[0]?.url
                                  }
                                  alt={product.productId.productName}
                                  className="h-20 w-20 rounded-lg cursor-pointer mb-1"
                                />

                                <p className="text-xl font-semibold ">
                                  {product?.productId?.productName}
                                </p>
                                <p>{product?.productId._id}</p>
                              </div>
                              <div className="flex justify-end items-center ">
                                <p className="font-bold text-lg text-[#2218A7] mr-14">
                                  {product.productId.productPrice} X{" "}
                                  {product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCard;
