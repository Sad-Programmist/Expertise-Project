import React, { useState } from "react";
import axios from "axios";

const AddCriteriaForm = ({ categoryList, fetchCriteria }) => {
  const [newCriteria, setNewCriteria] = useState({ number: "", text: "", categoryId: "" });

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };


  const handleAddCriteria = async (event) => {
    event.preventDefault();
    try {
      const criteria = { number: newCriteria.number, text: newCriteria.text, categoryId: newCriteria.category };
      await axios.post(serverPath + "/criteria/create", criteria, { auth: basicAuth });
      setNewCriteria({ number: "", text: "", category: "" });
      fetchCriteria();
    } catch (error) {
      alert("Ошибка добавления критерия");
    }
  };

  return (
    <form onSubmit={handleAddCriteria}>
      <h2>Добавление нового критерия</h2>
      <p>Чтобы добавить новый критерий в систему, необходимо записать всю информацию о нем в поля ввода и после нажать на кнопку "Добавить". <br />  <br />
        Обратите внимание, что все поля обязательны для заполнения!</p>
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
        placeholder="Номер"
        value={newCriteria.number}
        onChange={(e) => setNewCriteria({ ...newCriteria, number: e.target.value })}
      />
      <label>Заполните текст критерия:</label>
      <input
        required
        type="text"
        placeholder="Текст"
        maxLength={512}
        value={newCriteria.text}
        onChange={(e) => setNewCriteria({ ...newCriteria, text: e.target.value })}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddCriteriaForm;