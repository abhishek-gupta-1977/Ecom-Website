import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartSlice";
import axios from "axios";
import { useState } from "react";

const ProductDesc = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:7001/api/v1/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(`${product.productName} added to the cart.`);
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };
  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-4xl font-bold text-gray-800">
        {product.productName}
      </h1>
      <p className="text-gray-700">
        {product.productCategory} | {product.productBrand}
      </p>
      <h2 className="text-white bg-blue-500 p-2 rounded-2xl w-26 text-2xl font-semibold">
        ₹{product.productPrice}.00
      </h2>
      <p className="text-muted-foreground line-clamp-6">
        {product.productDesc}
      </p>
      <div>
        <p className="text-gray-800">Quantity:</p>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-14 mt-4"
          type="number"
          min={1}
          max={20}
        />
      </div>
      <Button
        onClick={() => addToCart(product._id)}
        className="w-max bg-amber-400 cursor-pointer"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
