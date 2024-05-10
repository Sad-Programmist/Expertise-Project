import React, { useState } from "react";
import axios from "axios";

const EditCategoryForm = ({ categoryList, fetchCategories }) => {
  const [editCategory, setEditCategory] = useState({ id: "", number: "", text: "", maxsum: "" });
  const [selectedNumberBeforeEdit, setSelectedNumberBeforeEdit] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/category";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    try {
      const category = { id: editCategory.id, number: editCategory.number, text: editCategory.text, maxsum: editCategory.maxsum };
      await axios.post(serverPath + "/category/change", category, { auth: basicAuth });
      setEditCategory({ id: "", text: "", maxsum: "", number: "" });
      setSelectedNumberBeforeEdit("");
      fetchCategories();
    } catch (error) {
      alert("Ошибка изменения категории");
    }
  };

  const handleSelectCategory = (selectedNumber) => {
    const selectedCategory = categoryList.find(category => category.number == selectedNumber);
    if (selectedCategory) {
      setSelectedNumberBeforeEdit(selectedNumber);
      setEditCategory(selectedCategory);
    }
  };

  return (
    <form onSubmit={handleEditCategory}>
      <h2>Изменение данных о категории</h2>
      <p>Чтобы измененить данных о сохраненной в системе категории критериев, необходимо в выпадающем списке выбрать номер категории.
        При выборе номера все поля автоматически заполнятся информацией, сохраненной о категории на данный момент. <br /><br />
        После внесения изменений нажмите на кнопку "Изменить", чтобы сохранить новые данные о категории.</p>
      <select
        required
        value={selectedNumberBeforeEdit}
        onChange={(e) => { setSelectedNumberBeforeEdit(e.target.value); handleSelectCategory(e.target.value) }}>
        <option value="" disabled selected hidden>Выберите номер категории</option>
        {categoryList.map((category) => (
          <option key={category.id} value={category.number}>{category.number}</option>
        ))}
      </select>
      <label>Заполните новый номер категории:</label>
      <input
        required
        type="number"
        placeholder="Номер"
        value={editCategory.number}
        onChange={(e) => setEditCategory({ ...editCategory, number: e.target.value })}
      />
      <label>Заполните новый текст категории:</label>
      <input
        required
        type="text"
        placeholder="Текст"
        maxLength={512}
        value={editCategory.text}
        onChange={(e) => setEditCategory({ ...editCategory, text: e.target.value })}
      />
      <label>Заполните новый максимальный балл, который можно получить по категории:</label>
      <input
        required
        type="number"
        placeholder="Максимальный балл"
        value={editCategory.maxsum}
        onChange={(e) => setEditCategory({ ...editCategory, maxsum: e.target.value })}
      />
      <button type="submit">Изменить</button>
    </form>
  );
};

export default EditCategoryForm;