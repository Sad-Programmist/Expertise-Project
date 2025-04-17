import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpertHeader from "../../../components/headers/ExpertHeader";
import AddOpinionForm from "../../../components/forms/opinion/AddOpinionForm";

const OpinionCreatePage = () => {
  const [projectList, setProjectList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [criteriaScoreList, setCriteriaScoreList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [expertName, setExpertName] = useState([]);
  const loggedExpertId = localStorage.getItem("loggedExpertId");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchProjects();
    fetchCategory();
    fetchCriteria();
    fetchExpertName();
  }, []);

  const fetchProjects = async () => {
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(serverPath + "/opinion/create?expertId=" + loggedExpertId + "&year=" + year, { auth: basicAuth });
      setProjectList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка проектов");
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
      alert("Ошибка загрузки данных об эксперте");
    }
  };

  return (
    <div>
      <ExpertHeader />
      <AddOpinionForm
        expertName={expertName}
        criteriaScoreList={criteriaScoreList}
        setCriteriaScoreList={setCriteriaScoreList}
        projectList={projectList}
        criteriaList={criteriaList}
        categoryList={categoryList}
        fetchProjects={fetchProjects} />
    </div>
  );
};

export default OpinionCreatePage;
