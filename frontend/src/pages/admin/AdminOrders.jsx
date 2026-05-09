import OrderCard from "@/components/OrderCard";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/order/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(`Found ${res.data.orders.length} orders`);
        setOrders(res.data.orders);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

return (
  <div className="pl-[350px] pr-20 py-16 min-h-screen bg-slate-50">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#0F172A]">
  Orders Dashboard
</h1>
      <p className="text-slate-500 mt-2">
        Monitor and manage all customer orders
      </p>
    </div>

    <Card className="rounded-3xl border border-[#E2E8F0] shadow-xl">
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-8 py-5">
        <h2 className="text-white text-xl font-semibold">
          All Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-slate-50 transition text-center"
              >
                <td className="p-4 text-slate-700">{order._id}</td>
                <td>{order.user.firstName}</td>
                <td>{order.products.length} Items</td>
                <td className="font-semibold">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Paid"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);
};

export default AdminOrders;
