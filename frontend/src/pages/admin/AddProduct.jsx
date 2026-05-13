import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productBrand: "",
    productCategory: "",
    ProductDesc: "",
    productImage: [],
  });

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productCategory", formData.productCategory);
    data.append("productBrand", formData.productBrand);
    data.append("productDesc", formData.ProductDesc);

    formData.productImage.forEach((file) => {
      data.append("files", file);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success("Product added successfully");
        navigate('/products')
        
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:pl-[330px] pt-20 px-15 md:px-8 py-10 p-16  bg-[#E1E5F8]">
      <Card className="max-w-4xl mx-auto rounded-3xl border-0 shadow-2xl overflow-hidden">
        <div className="bg-[#2218A7] p-8 text-white">
          <h1 className="text-3xl font-bold">Add Product</h1>
          <p className="opacity-80">Upload products to inventory</p>
        </div>

        <CardContent className="p-10 bg-white space-y-6">
          <div>
            <Label>Product Name</Label>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-2 rounded-xl border-[#BBC4EB]"
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              name="productPrice"
              type="number"
              value={formData.productPrice}
              onChange={handleChange}
              className="mt-2 rounded-xl border-[#BBC4EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              name="productBrand"
              placeholder="Brand"
              value={formData.productBrand}
              onChange={handleChange}
              className="rounded-xl border-[#BBC4EB]"
            />

            <Input
              name="productCategory"
              placeholder="Category"
              value={formData.productCategory}
              onChange={handleChange}
              className="rounded-xl border-[#BBC4EB]"
            />
          </div>

          <Textarea
            name="ProductDesc"
            placeholder="Description"
            value={formData.ProductDesc}
            onChange={handleChange}
            className="rounded-xl border-[#BBC4EB]"
          />

          <ImageUpload formData={formData} setFormData={setFormData} />

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#2218A7] hover:bg-[#737CCF] rounded-xl h-14"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
