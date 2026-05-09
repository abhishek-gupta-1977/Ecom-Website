import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ShowUserOrders = () => {
  const { userId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState([]);
  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/order/user-orders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res?.data?.success) {
        setOrders(res.data.orders);
        toast.success(`Found ${res.data.orders.length} orders`);
        console.log(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [userId]);
  return (
    <div className="pl-[350px] pr-10 py-20">
      <OrderCard orders={orders}/>
    </div>
  );
};

export default ShowUserOrders;
