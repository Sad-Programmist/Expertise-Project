import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import AddCriteriaForm from "../../../components/forms/criteria/AddCriteriaForm";
import DeleteCriteriaForm from "../../../components/forms/criteria/DeleteCriteriaForm";

const CriteriaEditPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(serverPath + "/category/edit", { auth: basicAuth });
      setCategoryList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка категорий");
    }
  };

  const fetchCriteria = async () => {
    try {
      const response = await axios.get(serverPath + "/criteria/edit", { auth: basicAuth });
      setCriteriaList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка критериев");
    }
  };

  useEffect(() => {
    fetchCategories()
    fetchCriteria();
  }, []);

  return (
    <div>
      <AdminHeader />
      <AddCriteriaForm
        categoryList={categoryList}
        fetchCriteria={fetchCriteria} />
      <DeleteCriteriaForm
        criteriaList={criteriaList}
        fetchCriteria={fetchCriteria} />
    </div>
  );
};

export default CriteriaEditPage;