import React, { useState } from "react";
import axios from "axios";

const DeleteCategoryForm = ({ categoryList, fetchCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/category";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleDeleteCategory = async (event) => {
    event.preventDefault();
    var isDelete = window.confirm("Вы точно хотите удалить выбранную категорию? В случае удаления данной категории будут удалены все критерии, которые к ней относятся");
    if (!isDelete) {
      return;
    }
    try {
      await axios.get(serverPath + "/delete?categoryId=" + selectedCategory, { auth: basicAuth });
      fetchCategories();
      setSelectedCategory("");
    } catch (error) {
      alert("Ошибка удаления категории");
    }
  };

  return (
    <form onSubmit={handleDeleteCategory}>
      <h2>Удаление категории</h2>
      <p>Чтобы удалить сохраненную в системе категорию, неоходимо в выпадающем списке выбрать номер категории.
        После выбора номера нажмите на кнопку "Удалить", чтобы выбранная категория была удалена из системы. <br /><br />
        Обратите внимание, что данные о категории нельзя будет восстановить после удаления!
      </p>
      <select
        required
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="" disabled selected hidden>Выберите номер категории</option>
        {categoryList.map((category) => (
          <option key={category.id} value={category.id}>{category.number}</option>
        ))}
      </select>
      <button type="submit">Удалить</button>
    </form>
  );
};

export default DeleteCategoryForm;