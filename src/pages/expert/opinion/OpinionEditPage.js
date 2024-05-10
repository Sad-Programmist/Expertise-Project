import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpertHeader from "../../../components/headers/ExpertHeader";
import EditOpinionForm from "../../../components/forms/opinion/EditOpinionForm";

const OpinionChangePage = () => {
  const [projectList, setProjectList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [expertName, setExpertName] = useState([]);
  const loggedExpertId = localStorage.getItem("loggedExpertId");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchProjectThemes();
    fetchCategory();
    fetchCriteria();
    fetchExpertName();
  }, []);

  const fetchProjectThemes = async () => {
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(serverPath + "/opinion/change?expertId=" + loggedExpertId + "&year=" + year, { auth: basicAuth });
      setProjectList(response.data);
    } catch (error) {
      alert("Ошибка загрузки проектов");
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

  const fetchCategory = async () => {
    try {
      const response = await axios.get(serverPath + "/category/edit", { auth: basicAuth });
      setCategoryList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка категорий");
    }
  };

  const fetchExpertName = async () => {
    try {
      const response = await axios.get(serverPath + "/expert?expertId=" + loggedExpertId, { auth: basicAuth });
      setExpertName(response.data.name);
    } catch (error) {
      alert("Ошибка загрузки эксперта");
    }
  };

  return (
    <div>
      <ExpertHeader />
      <EditOpinionForm
        expertName={expertName}
        criteriaList={criteriaList}
        categoryList={categoryList}
        projectList={projectList} />
    </div>
  );
};

export default OpinionChangePage;
