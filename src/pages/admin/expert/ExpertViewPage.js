import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";

const ExpertViewPage = () => {
  const [expertList, setExpertList] = useState([]);

  const serverPath = "http://localhost:8080/expert";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setExpertList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка экспертов");
    }
  };

  return (
    <div>
      <Header />
      <form>
        <h2>Просмотреть экспертов</h2>
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Логин</th>
            </tr>
          </thead>
          <tbody>
            {expertList.map((expert) => (
              <tr key={expert.id}>
                <td>{expert.name}</td>
                <td>{expert.login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ExpertViewPage;