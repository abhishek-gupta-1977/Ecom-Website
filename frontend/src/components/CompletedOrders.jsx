import axios from "axios";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import OrderCard from "./OrderCard";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        toast.success("Orders fetched successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [accessToken]);
  return (
    <div className="">
      <OrderCard orders={orders} loading={loading}/>
    </div>
  );
};
export default CompletedOrders;
