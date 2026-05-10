import FilterSideBar from "@/components/FilterSideBar";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortOrder,setSortOrder] = useState("")
  
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/getallproducts`,
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts ]

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.productCategory === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.productBrand === brand);
    }

    const getPrice = (price) => parseFloat(price)
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => getPrice(a.productPrice) - getPrice(b.productPrice));
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => getPrice(b.productPrice) - getPrice(a.productPrice));
    }

    dispatch(setProducts(filtered));
  }, [
    search,
    brand,
    category,
    allProducts,
    dispatch,
    sortOrder
  ]);

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(allProducts);
  return (
    <div className="pt-20 pb-10 bg-[#F7F8FF] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 px-4 sm:px-6">
        {/* {Sidebar} */}
        <FilterSideBar
          allProducts={allProducts}
          brand={brand}
          setBrand={setBrand}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />
        {/* {Main Product Section} */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-[220px] border-[#BBC4EB] text-[#2218A7]">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
