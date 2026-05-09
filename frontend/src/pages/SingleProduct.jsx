import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImage from "@/components/ProductImage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  return (
    <div className="py-24  bg-[#E1E5F8]">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrums product={product} />

        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-5 grid lg:grid-cols-2 gap-16">
          <ProductImage images={product.productImage} />
          <ProductDesc product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;