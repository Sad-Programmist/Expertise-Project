import React, { useState } from "react";
import axios from "axios";

const AddCategoryForm = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState({ number: "", text: "", maxsum: "" });

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/category";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const category = { number: newCategory.number, text: newCategory.text, maxsum: newCategory.maxsum };
      await axios.post(serverPath + "/create", category, { auth: basicAuth });
      setNewCategory({ text: "", maxsum: "", number: "" });
      fetchCategories();
    } catch (error) {
      alert("Ошибка добавления категории");
    }
  };

  return (
    <form onSubmit={handleAddCategory}>
      <h2>Добавление новой категории</h2>
      <p>Чтобы добавить новую категории критериев в систему, необходимо записать всю информацию о ней в поля ввода и 
        после нажать на кнопку "Добавить". <br />  <br />
        Обратите внимание, что все поля обязательны для заполнения!</p>
      <label>Заполните номер категории:</label>
      <input
        required
        type="number"
        placeholder="Номер"
        value={newCategory.number}
        onChange={(e) => setNewCategory({ ...newCategory, number: e.target.value })}
      />
      <label>Заполните текст категории:</label>
      <input
        required
        type="text"
        placeholder="Текст"
        maxLength={512}
        value={newCategory.text}
        onChange={(e) => setNewCategory({ ...newCategory, text: e.target.value })}
      />
      <label>Заполните максимальный балл, который можно получить по категории:</label>
      <input
        required
        type="number"
        placeholder="Максимальный балл"
        value={newCategory.maxsum}
        onChange={(e) => setNewCategory({ ...newCategory, maxsum: e.target.value })}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddCategoryForm;