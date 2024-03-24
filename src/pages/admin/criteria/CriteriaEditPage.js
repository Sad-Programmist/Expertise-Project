import React, { useState, useEffect } from "react";
import axios from "axios";
import CriteriaCreateDto from "../dto/CriteriaCreateDto";
import AdminHeader from "../../../components/AdminHeader";

const CriteriaEditPage = () => {
  const [newCriteria, setNewCriteria] = useState({ number: "", text: "", categoryId: "" });
  const [selectedCriteria, setSelectedCriteria] = useState("");
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

  const handleAddCriteria = async (event) => {
    event.preventDefault();
    try {
      const criteria = new CriteriaCreateDto(newCriteria.number, newCriteria.text, newCriteria.category);
      await axios.post(serverPath + "/criteria/create", criteria, { auth: basicAuth });
      setNewCriteria({ number: "", text: "", category: "" });
      fetchCriteria();
    } catch (error) {
      alert("Ошибка добавления критерия");
    }
  };

  const handleDeleteCriteria = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/criteria/delete?criteriaId=" + selectedCriteria, { auth: basicAuth });
      fetchCriteria();
    } catch (error) {
      alert("Ошибка удаления критерия");
    }
  };

  return (
    <div>
      <AdminHeader />
      <form onSubmit={handleAddCriteria}>
        <h2>Добавление нового критерия</h2>
        <p>Для добавления нового критерия необходимо заполнить номер категории, к которой будет относится критерий, номер самого критерия и текст.
          После нажмите на кнопку "Добавить", чтобы сохранить новый критерий. <br />  <br />
          Внимание! Все поля обязательны для заполнения!</p>
        <select
          required
          value={newCriteria.category}
          onChange={(e) => setNewCriteria({ ...newCriteria, category: e.target.value })}
        >
          <option value="">Выберите категорию</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>{category.number}</option>
          ))}
        </select>
        <label>Заполните номер критерия:</label>
        <input
          required
          type="number"
          placeholder="Номер критерия"
          value={newCriteria.number}
          onChange={(e) => setNewCriteria({ ...newCriteria, number: e.target.value })}
        />
        <label>Заполните текст критерия:</label>
        <input
          required
          type="text"
          placeholder="Текст критерия"
          maxLength={512}
          value={newCriteria.text}
          onChange={(e) => setNewCriteria({ ...newCriteria, text: e.target.value })}
        />
        <button type="submit">Добавить</button>
      </form>

      <form onSubmit={handleDeleteCriteria}>
        <h2>Удаление критерия</h2>
        <p>Для удаления критерия неоходимо в выпадающем списке по номеру критерия выбрать критерий, данные о котором собираетесь удалить. 
          После этого нажмите на кнопку "Удалить", чтобы выбранный критерий был удален. <br /><br />
          Внимание! Данные о критерии нельзя будет восстановить после удаления!
        </p>
        <select
          required
          value={selectedCriteria}
          onChange={(e) => setSelectedCriteria(e.target.value)}>
          <option value="">Выберите критерий</option>
          {criteriaList.map((criteria) => (
            <option key={criteria.id} value={criteria.id}>{`${criteria.categoryNumber}.${criteria.number}`}</option>
          ))}
        </select>
        <button type="submit">Удалить</button>
      </form>
    </div>
  );
};

export default CriteriaEditPage;