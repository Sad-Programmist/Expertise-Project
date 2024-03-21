import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header.js"

const ProjectsViewPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [projects, setProjects] = useState([]);
  const [years, setYears] = useState([]);

  const serverPath = "http://localhost:8080/project";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath, { auth: basicAuth });
      setYears(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  const fetchProjectsByYear = async () => {
    try {
      const response = await axios.get(serverPath + "/edit?year=" + selectedYear, { auth: basicAuth });
      setProjects(response.data);
    } catch (error) {
      alert("Ошибка загрузки проектов");
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (selectedYear !== "") {
      fetchProjectsByYear();
    }
  }, [selectedYear]);

  return (
    <div>
      <Header />
      <form>
        <h2>Просмотреть проекты</h2>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Выберите год</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Тема</th>
              <th>Участники</th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.theme}</td>
                <td>{project.participants}</td>
                <td>{project.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ProjectsViewPage;