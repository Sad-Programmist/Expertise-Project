import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";

const RatingPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [rating, setRating] = useState([]);
  const [years, setYears] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };


  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath + "/project", { auth: basicAuth });
      setYears(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  const fetchRatingByYear = async () => {
    try {
      const response = await axios.get(serverPath + "/rating?year=" + selectedYear, { auth: basicAuth });
      console.log(response.data);
      setRating(response.data);
    } catch (error) {
      alert("Ошибка загрузки рейтинга");
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (selectedYear !== "") {
      fetchRatingByYear();
    }
  }, [selectedYear]);

  return (
    <div>
      <AdminHeader />
      <form>
        <h2>Просмотр рейтинга проектов</h2>
        <p>Для просмотра рейтинга проектов, необходимо сначала в выпадающем списке выбрать год участия проектов. <br /><br />
          Проект, который поддержало меньше половины экспертов, автоматически получает балл раный 0 и не проходит в финал.
        </p>
        <select
          value={selectedYear}
          onChange={handleYearChange}>
          <option value="">Выберите год</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Место</th>
              <th>Тема проекта</th>
              <th>Участники</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {rating.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
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

export default RatingPage;