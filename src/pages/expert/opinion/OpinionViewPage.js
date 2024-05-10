import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpertHeader from "../../../components/headers/ExpertHeader";
import ViewCriteriaTable from "../../../components/table/ViewCriteriaTable";
import ViewOpinionTextForm from "../../../components/forms/opinion/ViewOpinionTextForm";
import ViewOpinionConclusionForm from "../../../components/forms/opinion/ViewOpinionConclusionForm";

const OpinionViewPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [expertName, setExpertName] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [text, setText] = useState("");
  const [criteriaScoreList, setCriteriaScoreList] = useState({});
  const [conclusion, setConclusion] = useState(false);
  const loggedExpertId = localStorage.getItem("loggedExpertId");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchProjectThemes();
    fetchCategories();
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

  const fetchCategories = async () => {
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

  const handleProjectChange = async (event) => {
    setSelectedProject(event.target.value);
    try {
      const response = await axios.get(serverPath + "/opinion?expertId=" + loggedExpertId + "&projectId=" + event.target.value, { auth: basicAuth });
      const { projectName, expertName, scores, text, conclusion } = response.data;
      setText(text);
      const newCriteriaScores = {};
      criteriaList.forEach((criteria, index) => {
        newCriteriaScores[criteria.id] = scores[index] || "0";
      });

      setCriteriaScoreList(newCriteriaScores);
      setConclusion(conclusion);

    } catch (error) {
      alert("Ошибка загрузки данных");
    }
  };

  return (
    <div>
      <ExpertHeader />
      <form>
        <h2>Просмотр экспертного заключения на идею инновационного проекта</h2>
        <p>Для просмотра экспертного заключения в выпадающем списке по теме проекта выберите проект, экспертное заключение по которому собираетесь посмотреть.</p>
      </form>
      <form>
        <div>
          <h3 className="first">Эксперт: {expertName}</h3>
          <h3>Автор: {selectedProject && projectList.find(project => project.id == selectedProject)?.participants}</h3>
          <h3>Тема:</h3>
          <select required value={selectedProject} onChange={handleProjectChange}>
            <option value="" disabled selected hidden>Выберите тему проекта</option>
            {projectList.map((project) => (
              <option key={project.id} value={project.id}>{project.theme}</option>
            ))}
          </select>
        </div>
        <ViewCriteriaTable
          criteriaList={criteriaList}
          categoryList={categoryList}
          criteriaScoreList={criteriaScoreList} />
        <ViewOpinionTextForm
          text={text} />
        <ViewOpinionConclusionForm
          conclusion={conclusion} />
      </form>
    </div>
  );
};

export default OpinionViewPage;
