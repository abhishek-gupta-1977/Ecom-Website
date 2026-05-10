import {
  Edit,
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-semibold transition-all
    ${
      isActive
        ? "bg-[#2218A7] text-white shadow-lg"
        : "text-[#2218A7] hover:bg-[#BBC4EB]"
    }`;

  return (
   <div className="hidden lg:block fixed w-[280px] xl:w-[300px] h-screen bg-[#E1E5F8] border-r border-[#BBC4EB] pt-24 px-4">
      <h1 className="text-2xl font-bold text-[#2218A7] mb-10 text-center">
        Admin Panel
      </h1>

      <div className="space-y-3">
        <NavLink to="/dashboard/sales" className={navClass}>
          <LayoutDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/add-product" className={navClass}>
          <PackagePlus />
          Add Product
        </NavLink>

        <NavLink to="/dashboard/products" className={navClass}>
          <PackageSearch />
          Products
        </NavLink>

        <NavLink to="/dashboard/users" className={navClass}>
          <Users />
          Users
        </NavLink>

        <NavLink to="/dashboard/orders" className={navClass}>
          <Edit />
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;