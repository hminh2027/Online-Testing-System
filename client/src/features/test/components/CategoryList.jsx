import React, { useState, useEffect } from "react";
import { testApi } from "../api/testApi";
import { CategoryItem } from "./CategoryItem";
import { Skeleton } from "@chakra-ui/react";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { categories } = await testApi.getALlWithCategory();
      setCategories(categories);
    })();
  }, []);

  return categories.length > 0 ? (
    <div className="py-5">
      {categories.map((cate) => (
        <CategoryItem key={cate.id} data={cate} />
      ))}
    </div>
  ) : (
    <Skeleton my={50} height={52} rounded={"md"} fadeDuration={1} />
  );
};
