import React, { useState } from "react";
import axios from "axios";

const ExportRatingForm = ({ yearList }) => {
  const [year, setYear] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(serverPath + "/rating/export?year=" + year, {
        responseType: 'blob',
        auth: basicAuth
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rating.xlsx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Ошибка загрузки файла");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Экспорт рейтинга проектов</h2>
      <p>Чтобы выполнить экспорт рейтинга проектов, необходимо в выпадающем списке выберать год участия проектов и нажать на кнопку "Экспорт".</p>
      <select
        onChange={(e) => setYear(e.target.value)}>
        <option value="">Выберите год</option>
        {yearList.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button type="submit">Экспорт</button>
    </form>
  );
};

export default ExportRatingForm;