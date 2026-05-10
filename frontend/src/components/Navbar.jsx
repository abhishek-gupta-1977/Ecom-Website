import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice.js";
import { setCart } from "@/redux/cartSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const items = useSelector((store) => store.cart.items);
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setCart({ items: [] }));
        localStorage.removeItem("accessToken");
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <header className="bg-[#1E3A8A]/90 backdrop-blur-md fixed w-full z-20 border-b  text-white order-[#BBC4EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <div>
          <h1 className="font-bold text-white text-2xl">E Commerce</h1>
        </div>
        <nav className="flex  items-center justify-between gap-4 sm:gap-6 lg:gap-10">
          <ul className="hidden md:flex items-center gap-8">
            <Link className=" hover:text-[#64748B] transition" to={"/"}>
              <li>Home</li>
            </Link>
            <Link className=" hover:text-[#64748B] transition" to={"/products"}>
              <li>Products</li>
            </Link>
            {user && (
              <Link
                className=" hover:text-[#64748B] transition"
                to={`/profile/${user?._id}`}
              >
                Hello, {user.firstName}
              </Link>
            )}
            {admin && (
              <Link
                className=" hover:text-[#64748B] transition"
                to={"/dashboard/sales"}
              >
                Dashboard
              </Link>
            )}
          </ul>
          {user ? (
            <Button
              onClick={logoutHandler}
              className="bg-[#EA580C] hover:bg-[#1a1282] text-white"
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#737CCF] hover:bg-[#2218A7] text-white"
            >
              LogIn
            </Button>
          )}
          <Link onClick={() => navigate("/cart")} className="relative ">
            <ShoppingCart />
            <span className="bg-[#F97316] absolute text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs px-1 -top-3 -right-5">
              {items.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
