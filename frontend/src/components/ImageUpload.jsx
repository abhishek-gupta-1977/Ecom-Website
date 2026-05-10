;
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import ProductImage from "./ProductImage";
import { Label } from "./ui/label";

const ImageUpload = ({ formData, setFormData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if(files.length){
      setFormData((prev) => ({
        ...prev,
        productImage:[...(prev.productImage || []), ...files]
      }))
    }
  }

  const removeImage = (index) => {
    setFormData((prev) => {
      const updatedImages = (prev.productImage || []).filter((_,i) => i !== index)
      return {...prev, productImage:updatedImages}
    })
  }

  const currentImages = formData?.productImage || [];
  return (
    <div>
      <Label>Product Images</Label>
      <Input
      hidden
        type="file"
        id="file-upload"
        className=""
        accept="image/*"
        multiple
        onChange={handleFiles}
      />
      <Button variant="outline ">
        <label htmlFor="file-upload" className="cursor-pointer w-full sm:w-auto">
          Upload Images
        </label>
      </Button>
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
          {currentImages.map((file, index) => {
            let preview;
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file?.url) {
              preview = file.url;
            } else {
              return null;
            }

            return (
              <Card key={index} className="relative group overflow-hidden mt-3">
                <CardContent>
                  <img
                    src={preview}
                    alt=""
                    width={200}
                    height={200}
                    className="w-full h-24 sm:h-32h-32 object-cover rounded-md"
                  />
                  <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
