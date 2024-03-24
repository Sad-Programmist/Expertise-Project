import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectCreateDto from "../dto/ProjectCreateDto";
import ProjectChangeDto from "../dto/ProjectChangeDto";
import Header from "../../../components/Header";

const ProjectEditPage = () => {
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState({ theme: "", participants: "", year: "" });
  const [editProject, setEditProject] = useState({ id: "", theme: "", participants: "", year: "" });
  const [selectedProject, setSelectedProject] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [selectedThemeBeforeEdit, setSelectedThemeBeforeEdit] = useState("");
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const fetchProjectsByYear = async (year) => {
    try {
      const response = await axios.get(serverPath + "/edit?year=" + year, { auth: basicAuth });
      setProjectsList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка проектов");
    }
  };

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath, { auth: basicAuth });
      setYearsList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchProjectsByYear(selectedYear);
    }
  }, [selectedYear]);

  const handleAddProject = async (event) => {
    event.preventDefault();
    try {
      const project = new ProjectCreateDto(newProject.participants, newProject.theme, newProject.year);
      await axios.post(serverPath + "/create", project, { auth: basicAuth });
      fetchProjectsByYear(selectedYear);
      fetchYears();
      setNewProject({ theme: "", participants: "", year: "" });
    } catch (error) {
      alert("Ошибка добавления проекта");
    }
  };

  const handleEditProject = async (event) => {
    event.preventDefault();
    try {
      const project = new ProjectChangeDto(editProject.id, editProject.participants, editProject.theme, editProject.year);
      await axios.post(serverPath + "/change", project, { auth: basicAuth });
      fetchProjectsByYear(selectedYear);
      setEditProject({ id: "", theme: "", participants: "", year: "" });
      setSelectedThemeBeforeEdit("");
    } catch (error) {
      alert("Ошибка изменения проекта");
    }
  };

  const handleDeleteProject = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/delete?projectId=" + selectedProject, { auth: basicAuth });
      fetchProjectsByYear(selectedYear);
      setSelectedProject("");
    } catch (error) {
      alert("Ошибка удаления проекта");
    }
  };

  const handleSelectProject = (selectedTheme) => {
    const selectedProject = projectsList.find(project => project.theme === selectedTheme);
    if (selectedProject) {
      setSelectedThemeBeforeEdit(selectedTheme);
      setEditProject(selectedProject);
    }
  };

  const handleProjectViewClick = () => {
    navigate("/admin/project/view");
  };

  return (
    <div>
      <Header />
      <form>
        <h2>Просмотреть проекты</h2>
        <button onClick={handleProjectViewClick}>Посмотреть</button>
      </form>
      <form onSubmit={handleAddProject}>
        <h2>Добавить новый проект</h2>
        <input
          required
          type="text"
          placeholder="Тема проекта"
          maxLength={256}
          value={newProject.theme}
          onChange={(e) => setNewProject({ ...newProject, theme: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="ФИО участников"
          maxLength={512}
          value={newProject.participants}
          onChange={(e) => setNewProject({ ...newProject, participants: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Год участия"
          maxLength={4}
          value={newProject.year}
          onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
        />
        <button type="submit">Добавить</button>
      </form>

      <form>
        <h2>Выберите год</h2>
        <p>Перед изменением или удаленим проектов обязательно выберите год</p>
        <select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Год</option>
          {yearsList.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </form>

      <form onSubmit={handleEditProject}>
        <h2>Изменить данные о проекте</h2>
        <select
          required
          value={selectedThemeBeforeEdit}
          onChange={(e) => { setSelectedThemeBeforeEdit(e.target.value); handleSelectProject(e.target.value); }}>
          <option value="">Выберите проект</option>
          {projectsList.map((project) => (
            <option key={project.id} value={project.theme}>{project.theme}</option>
          ))}
        </select>
        <input
          required
          type="text"
          placeholder="Тема проекта"
          maxLength={256}
          value={editProject.theme}
          onChange={(e) => setEditProject({ ...editProject, theme: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="ФИО участников"
          maxLength={512}
          value={editProject.participants}
          onChange={(e) => setEditProject({ ...editProject, participants: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Год участия"
          maxLength={4}
          value={editProject.year}
          onChange={(e) => setEditProject({ ...editProject, year: e.target.value })}
        />
        <button type="submit">Изменить</button>
      </form>

      <form onSubmit={handleDeleteProject}>
        <h2>Удалить проект</h2>
        <select
          required
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">Выберите проект</option>
          {projectsList.map((project) => (
            <option key={project.id} value={project.id}>{project.theme}</option>
          ))}
        </select>
        <button type="submit">Удалить</button>
      </form>
    </div>
  );
};

export default ProjectEditPage;