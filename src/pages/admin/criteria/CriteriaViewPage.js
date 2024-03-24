import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";

const CriteriaViewPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(serverPath + "/category/edit", { auth: basicAuth });
      setCategoryList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка категорий");
    }
  };

  const fetchCriteria = async () => {
    try {
      const response = await axios.get(serverPath + "/criteria/edit", { auth: basicAuth });
      setCriteriaList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка критериев");
    }
  };

  useEffect(() => {
    fetchCategories()
    fetchCriteria();
  }, []);

  return (
    <div>
      <Header />
      <form>
        <h2>Просмотреть таблицу критериев</h2>
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Текст</th>
              <th>Максимальная сумма баллов</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map(category => (
              <React.Fragment key={category.id}>
                <tr>
                  <td>{category.number}</td>
                  <td>{category.text}</td>
                  <td>{category.maxsum}</td>
                </tr>
                {criteriaList.filter(criteria => criteria.categoryId === category.id).map(criteria => (
                  <tr key={criteria.id}>
                    <td>{`${category.number}.${criteria.number}`}</td>
                    <td>{criteria.text}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CriteriaViewPage;