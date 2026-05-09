import { Edit, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7001/api/v1/product/getallproducts"
        );

        if (res.data.success) {
          dispatch(setProducts(res.data.products));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("productCategory", editProduct.productCategory);
    formData.append("productBrand", editProduct.productBrand);
    formData.append("productDesc", editProduct.productDesc);

    const existingImages = (editProduct.productImage || [])
      ?.filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    const newFiles = (editProduct.productImage || []).filter(
      (img) => img instanceof File
    );

    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.put(
        `http://localhost:7001/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");

        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        );

        dispatch(setProducts(updatedProducts));
        setOpen(false);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleEdit = (product) => {
    setEditProduct({
      ...product,
      productImage: product.productImage
        ? [...product.productImage]
        : [],
    });

    setOpen(true);
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) setEditProduct(null);
  };

  let filteredProducts = products.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.productBrand
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.productCategory
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  }

  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  }

  const handleDelete = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId
      );

      const res = await axios.delete(
        `http://localhost:7001/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-[350px] pt-20 pr-10 min-h-screen bg-[#E1E5F8]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2218A7]">
          Product Management
        </h1>
        <p className="text-[#737CCF] mt-2">
          Manage all store products
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex justify-between mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-[420px] h-14 rounded-2xl border-[#BBC4EB] pl-5 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-4 text-[#737CCF]" />
        </div>

        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-[220px] h-14 rounded-2xl border-[#BBC4EB] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Low to High</SelectItem>
              <SelectItem value="highToLow">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Products */}
      <div className="space-y-5">
        {filteredProducts?.map((product, index) => (
          <Card
            key={index}
            className="p-5 rounded-3xl border-0 shadow-xl bg-white hover:shadow-2xl transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <img
                  src={product?.productImage?.[0]?.url}
                  alt=""
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-[#BBC4EB]"
                />

                <div className="max-w-xl">
                  <h1 className="font-bold text-xl text-[#2218A7]">
                    {product.productName}
                  </h1>

                  <p className="text-[#737CCF]">
                    {product.productCategory}
                  </p>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#2218A7] text-right">
                ₹{product.productPrice}
              </h1>

              <div className="flex gap-3">
                {/* Edit */}
                <Dialog open={open} onOpenChange={handleOpenChange}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleEdit(product)}
                      className="bg-[#737CCF] hover:bg-[#2218A7] rounded-xl"
                    >
                      <Edit size={18} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[640px] bg-white rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-[#2218A7]">
                        Edit Product
                      </DialogTitle>
                      <DialogDescription>
                        Update product details
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <Input
                        name="productName"
                        value={editProduct?.productName || ""}
                        onChange={handleChange}
                      />

                      <Input
                        name="productPrice"
                        type="number"
                        value={editProduct?.productPrice || ""}
                        onChange={handleChange}
                      />

                      <Input
                        name="productBrand"
                        value={editProduct?.productBrand || ""}
                        onChange={handleChange}
                      />

                      <Input
                        name="productCategory"
                        value={editProduct?.productCategory || ""}
                        onChange={handleChange}
                      />

                      <Textarea
                        name="productDesc"
                        value={editProduct?.productDesc || ""}
                        onChange={handleChange}
                      />

                      <ImageUpload
                        formData={editProduct}
                        setFormData={setEditProduct}
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>

                      <Button
                        onClick={handleSaveChanges}
                        className="bg-[#2218A7]"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-600 rounded-xl">
                      <Trash2 size={18} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Product?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;