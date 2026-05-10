import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImage = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0].url);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-5 w-full">
      <div className="flex flex-row md:flex-col gap-5">
        {images.map((img, index) => {
          return (
            <img
              key={index}
              onClick={() => setMainImage(img.url)}
              src={img.url}
              className="cursor-pointer w-16 h-16 sm:w-20 sm:h-20"
            />
          );
        })}
      </div>
      <Zoom>
        <img src={mainImage} className="w-full max-w-md lg:max-w-lg border shadow-lg" />
      </Zoom>
    </div>
  );
};

export default ProductImage;
