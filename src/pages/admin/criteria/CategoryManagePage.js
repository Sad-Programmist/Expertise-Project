import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import AddCategoryForm from "../../../components/forms/category/AddCategoryForm";
import DeleteCategoryForm from "../../../components/forms/category/DeleteCategoryForm";
import EditCategoryForm from "../../../components/forms/category/EditCategoryForm";

const CategoryEditPage = () => {
  const [categoryList, setCategoryList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/category";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setCategoryList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка категорий");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <AdminHeader />
      <AddCategoryForm
        fetchCategories={fetchCategories} />
      <EditCategoryForm
        categoryList={categoryList}
        fetchCategories={fetchCategories} />
      <DeleteCategoryForm
        categoryList={categoryList}
        fetchCategories={fetchCategories} />
    </div>
  );
};

export default CategoryEditPage;