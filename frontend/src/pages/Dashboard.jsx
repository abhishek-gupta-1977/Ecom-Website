import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#E1E5F8]">
      <div className="flex flex-col lg:flex-row">
        <SideBar />

        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
