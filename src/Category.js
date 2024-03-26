import React, { useState } from 'react';
import Categories from './CategoryDef';
import AddNewCategory from './CategoryForm';
import Category from './CategoryClass';
import { _pastelColors, assignBackgroundColor } from "./CategoryDef";

var cats = [];

const CategoryPage = () => {
  const [categories, setCategories] = useState(['Category 1']);

  cats = categories.map((category, index) => new Category(category, _pastelColors[index % _pastelColors.length]));

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => {
      if (!prevCategories.includes(newCategory)) {
        return [...prevCategories, newCategory];
      } else {
        return prevCategories;
      }
    });
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="categories">
      <Categories categories={categories} onDelete={deleteCategory} />
      <AddNewCategory addCategory={addCategory} />
    </div>
  );
};

export { cats }; // Exportăm lista de categorii
export default CategoryPage;
