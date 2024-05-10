import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpertHeader from "../../../components/headers/ExpertHeader";

const OpinionViewTablePage = () => {
  const [opinionList, setOpinionList] = useState([]);
  const loggedExpertId = localStorage.getItem("loggedExpertId");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchOpinions = async () => {
    try {
      const year = new Date().getFullYear();
      const response = await axios.get(serverPath + "/opinion/view?expertId=" + loggedExpertId + "&year=" + year, { auth: basicAuth });
      setOpinionList(response.data);
    } catch (error) {
      alert("Ошибка загрузки проектов");
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  return (
    <div>
      <ExpertHeader />
      <form>
        <h2>Просмотр экспертных заключений по проектам</h2>
        <p>В данной таблице отображены итоговые оценки и выводы по проектам, полученные из сохраненных в системе экспертных заключений.</p>
      </form>
      <form>
        <table>
          <thead>
            <tr>
              <th>Тема</th>
              <th>Автор</th>
              <th>Итоговая оценка</th>
              <th>Поддержка</th>
            </tr>
          </thead>
          <tbody>
            {opinionList.map(opinion => (
              <React.Fragment key={opinion.id}>
                <tr>
                  <td>{opinion.projectName}</td>
                  <td>{opinion.author}</td>
                  <td>{opinion.finalScore}</td>
                  <td>{opinion.conclusion ? 'Да' : 'Нет'}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default OpinionViewTablePage;