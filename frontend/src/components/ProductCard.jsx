import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const { productImage, productName, productPrice } = product;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`${productName} added to cart`);
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#BBC4EB] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      
      {/* Image */}
      <div className="relative bg-[#F8FAFC] p-4 sm:p-6 overflow-hidden">
        {loading ? (
          <Skeleton className="h-72 w-full rounded-2xl" />
        ) : (
          <img
            onClick={() => navigate(`/product/${product._id}`)}
            src={productImage[0]?.url || "./user.webp"}
            alt=""
            className="w-full h-48 sm:h-56 lg:h-64 object-contain rounded-2xl cursor-pointer transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* subtle top badge */}
        <span className="absolute top-4 right-4 bg-[#EA580C] text-white text-xs px-3 py-1 rounded-full shadow-lg">
          New
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-full" />
          </>
        ) : (
          <>
            <h1
              className="text-base sm:text-lg font-semibold text-[#111827] line-clamp-2 cursor-pointer hover:text-[#737CCF] transition"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {productName}
            </h1>

            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#64748B]">
                ₹{productPrice}
              </h2>

              <span className="text-sm bg-[#EA580C] text-white px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>

            <Button
              onClick={() => addToCart(product._id)}
              className="w-full h-12 rounded-2xl bg-[#EA580C]/50 hover:bg-[#EA580C] text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;