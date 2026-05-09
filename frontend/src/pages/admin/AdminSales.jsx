import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminSales = () => {
  const [state, setState] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/order/sales`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) setState(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { title: "Users", value: state.totalUsers },
    { title: "Products", value: state.totalProducts },
    { title: "Orders", value: state.totalOrders },
    { title: "Revenue", value: `₹${Math.round(state.totalSales)}` },
  ];

  return (
    <div className="pl-[330px] p-16 min-h-screen bg-[#E1E5F8]">
      <h1 className="text-4xl font-bold text-[#2218A7] mb-8">
        Sales Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="bg-[#BBC4EB] border-0 rounded-3xl shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-[#2218A7]">{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <h2 className="text-3xl font-bold text-[#2218A7]">
                {item.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 rounded-3xl bg-white shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-[#2218A7]">
            Revenue Analytics
          </CardTitle>
        </CardHeader>

        <CardContent style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.sales}>
              <XAxis dataKey="date" stroke="#737CCF" />
              <YAxis stroke="#737CCF" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2218A7"
                fill="#737CCF"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;