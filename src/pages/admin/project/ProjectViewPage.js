import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader"

const ProjectsViewPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [yearList, setYearList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath, { auth: basicAuth });
      setYearList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  const fetchProjectsByYear = async (selectedYear) => {
    try {
      const response = await axios.get(serverPath + "/edit?year=" + selectedYear, { auth: basicAuth });
      setProjectList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка проектов");
    }
  };


  return (
    <div>
      <AdminHeader />
      <form>
        <h2>Просмотр проектов</h2>
        <p>Для просмотра всех проектов сохраненных в системе, необходимо в выпадающем списке выбрать год участия проектов. 
          После этого данные будут загружены автоматически.</p>
        <select onChange={(e) => { fetchProjectsByYear(e.target.value); }}>
          <option value="" disabled selected hidden>Выберите год</option>
          {yearList.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Тема</th>
              <th>Участники</th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map(project => (
              <tr key={project.id}>
                <td>{project.orderNumber}</td>
                <td>{project.theme}</td>
                <td>{project.author}</td>
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