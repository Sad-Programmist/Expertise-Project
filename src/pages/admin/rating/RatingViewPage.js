import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import ExportRatingForm from "../../../components/forms/rating/ExportRatingForm";

const RatingPage = () => {
  const [rating, setRating] = useState([]);
  const [yearList, setYearList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath + "/project", { auth: basicAuth });
      setYearList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  const fetchRatingByYear = async (selectedYear) => {
    try {
      const response = await axios.get(serverPath + "/rating?year=" + selectedYear, { auth: basicAuth });
      console.log(response.data);
      setRating(response.data);
    } catch (error) {
      alert("Ошибка загрузки рейтинга");
    }
  };

  return (
    <div>
      <AdminHeader />
      <ExportRatingForm
        yearList={yearList} />
      <form>
        <h2>Просмотр рейтинга проектов</h2>
        <p>Чтобы просмотреть рейтинг проектов, необходимо в выпадающем списке выбрать год участия проектов.
          При выборе года рейтинг будет загружен автоматически.
        </p>
        <select
          onChange={(e) => fetchRatingByYear(e.target.value)}>
          <option value="">Выберите год</option>
          {yearList.map(year => (
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

export default RatingPage;