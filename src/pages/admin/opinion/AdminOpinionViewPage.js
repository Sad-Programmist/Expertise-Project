import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import ViewCriteriaTable from "../../../components/table/ViewCriteriaTable";
import ViewOpinionTextForm from "../../../components/forms/opinion/ViewOpinionTextForm";
import ViewOpinionConclusionForm from "../../../components/forms/opinion/ViewOpinionConclusionForm";

const OpinionViewPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [expertList, setExpertList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [text, setText] = useState("");
  const [criteriaScoreList, setCriteriaScoreList] = useState({});
  const [conclusion, setConclusion] = useState(false);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchCategories();
    fetchCriteria();
    fetchExperts();
  }, []);

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

  const fetchExperts = async () => {
    try {
      const response = await axios.get(serverPath + "/expert/edit", { auth: basicAuth });
      setExpertList(response.data);
    } catch (error) {
      alert("Ошибка загрузки экспертов");
    }
  };

  const handleProjectChange = async (event) => {
    setSelectedProject(event.target.value);
    try {
      const response = await axios.get(serverPath + "/opinion?expertId=" + selectedExpert + "&projectId=" + event.target.value, { auth: basicAuth });
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

  const handleExpertChange = async (event) => {
    setSelectedExpert(event.target.value);
    if (event.target.value === "") {
      setSelectedProject("");
      setText("");
      const newCriteriaScores = {};
      criteriaList.forEach(criteria => {
        newCriteriaScores[criteria.id] = 0;
      });
      setCriteriaScoreList(newCriteriaScores);
      setConclusion(false);
      return;
    }
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(serverPath + "/opinion/change?expertId=" + event.target.value + "&year=" + year, { auth: basicAuth });
      setProjectList(response.data);
      setSelectedProject("");
    } catch (error) {
      alert("Ошибка загрузки проектов");
    }
  };

  return (
    <div>
      <AdminHeader />
      <form>
        <h2>Просмотр экспертного заключения на идею инновационного проекта</h2>
        <p>Чтобы просмотреть экспертное заключение, необходимо сначала в выпадающем списке выберите ФИО эксперта, а потом в 
          выпадающем списке выбрать тему проекта.
          При выборе темы вся информация о сохраненном заключении будет загружена автоматически.
        </p>
      </form>
      <form>
        <div>
          <h3 className="first">Эксперт: </h3>
          <select required value={selectedExpert} onChange={handleExpertChange}>
            <option value="">Выберите ФИО эксперта</option>
            {expertList.map((expert) => (
              <option key={expert.id} value={expert.id}>{expert.name}</option>
            ))}
          </select>
          <h3>Автор: {selectedProject && projectList.find(project => project.id == selectedProject)?.author}</h3>
          <h3>Тема:</h3>
          <select required value={selectedProject} onChange={handleProjectChange}>
            <option value="">Выберите тему проекта</option>
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
