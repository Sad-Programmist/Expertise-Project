import React, { useState } from "react";
import axios from "axios";

const ExportRatingForm = ({ yearList }) => {
  const [year, setYear] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.body.style.cursor = 'wait';
    setIsLoading(true);
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
      alert("Ошибка экспорта файла");
    }
    document.body.style.cursor = 'default';
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Экспорт рейтинга проектов</h2>
      <p>Чтобы выполнить экспорт рейтинга проектов, необходимо в выпадающем списке выберать год участия проектов и нажать на кнопку "Экспорт".</p>
      <select
        onChange={(e) => setYear(e.target.value)}>
        <option value="" disabled selected hidden>Выберите год</option>
        {yearList.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <button disabled={isLoading} type="submit">Экспорт</button>
    </form>
  );
};

export default ExportRatingForm;