import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { testApi } from "../api/testApi";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getTests() {
      try {
        const rs = await testApi.getALlWithCategory();
        setCategories(rs.data.data.categories);
        console.log(rs);
      } catch (e) {
        console.log(e);
      }
    }

    getTests();
  }, []);
  return (
    <div className="py-5">
      {categories.map((cate) => (
        <CategoryItem key={cate.id} data={cate} />
      ))}
    </div>
  );
};
