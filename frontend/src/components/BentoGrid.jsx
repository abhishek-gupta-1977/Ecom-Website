import FilterSideBar from "@/components/FilterSideBar";
import React, { useEffect, useState, useTransition } from "react";

import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const BentoGrid = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      
      const res = await axios.get(
        "http://localhost:7001/api/v1/product/getallproducts",
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } 
  };

  const featuredProducts = products.slice(0, 8);



  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(allProducts);
  return (
    <div className="pt-20 pb-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-7 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
