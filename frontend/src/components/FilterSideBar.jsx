import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterSideBar = ({ allProducts, brand, setBrand, category, setCategory, search, setSearch }) => {
  const Category = allProducts.map((p) => p.productCategory);
  const UniqueCategory = ["All", ...new Set(Category)];
  const Brand = allProducts.map((p) => p.productBrand);
  const UniqueBrand = ["All", ...new Set(Brand)];

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
  }

  const handleCategoryClick = (val) => {
    setCategory(val)
  }

  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setCategory("All");
  }
  return (
    <div className="bg-[#E1E5F8] p-4 sm:p-5 mt-6 sm:mt-10 rounded-xl shadow-md h-max border border-[#BBC4EB] w-full lg:w-72">
      <Input
        placeholder="Search..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white border-2 border-[#BBC4EB] focus:border-[#2218A7]"
      />
      <h1 className="mt-5 font-semibold text-xl text-[#2218A7]">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="radio"  className="accent-[#2218A7]" checked={category === item} onChange={() => handleCategoryClick(item)}/>
            <label htmlFor="">{item}</label>
          </div>
        ))}
      </div>
      <h1 className="mt-5 text-xl font-semibold text-[#2218A7]">Brand</h1>
      <div className="flex flex-col gap-2 mt-3">
        <select  className="w-full border border-[#BBC4EB] rounded-md p-2" value={brand} onChange={handleBrandChange}>
          {UniqueBrand.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <Button onClick={() => resetFilters()} className="bg-[#737CCF] hover:bg-[#2218A7] text-white w-full rounded-lg mt-20 p-2">Reset Filters</Button>
    </div>
  );
};

export default FilterSideBar;
