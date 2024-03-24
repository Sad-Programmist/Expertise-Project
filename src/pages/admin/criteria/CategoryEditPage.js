import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCreateDto from "../dto/CategoryCreateDto";
import CategoryChangeDto from "../dto/CategoryChangeDto";
import Header from "../../../components/Header.js";

const CategoryEditPage = () => {
  const [newCategory, setNewCategory] = useState({ number: "", text: "", minsum: "", maxsum: "" });
  const [editCategory, setEditCategory] = useState({ id: "", number: "", text: "", minsum: "", maxsum: "" });
  const [selectedCategory, setSelectedCategoryNumber] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedNumberBeforeEdit, setSelectedNumberBeforeEdit] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/category";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setCategoryList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка категорий");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const category = new CategoryCreateDto(newCategory.number, newCategory.text, newCategory.minsum, newCategory.maxsum);
      await axios.post(serverPath + "/create", category, { auth: basicAuth });
      setNewCategory({ text: "", minsum: "", maxsum: "", number: "" });
      fetchCategories();
    } catch (error) {
      alert("Ошибка добавления категории");
    }
  };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    try {
      const category = new CategoryChangeDto(editCategory.id, editCategory.number, editCategory.text, editCategory.minsum, editCategory.maxsum); await axios.post(serverPath + "/category/change", category, { auth: basicAuth });
      setEditCategory({ id: "", text: "", minsum: "", maxsum: "", number: "" });
      setSelectedNumberBeforeEdit("");
      fetchCategories();
    } catch (error) {
      alert("Ошибка изменения категории");
    }
  };

  const handleDeleteCategory = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/delete?categoryId=" + selectedCategory, { auth: basicAuth });
      fetchCategories();
    } catch (error) {
      alert("Ошибка удаления категории");
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
    <div>
      <Header />
      <form onSubmit={handleAddCategory}>
        <h2>Добавить новую категорию</h2>
        <input
          required
          type="number"
          placeholder="Номер категории"
          value={newCategory.number}
          onChange={(e) => setNewCategory({ ...newCategory, number: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Текст категории"
          maxLength={512}
          value={newCategory.text}
          onChange={(e) => setNewCategory({ ...newCategory, text: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Минимальный балл"
          value={newCategory.minsum}
          onChange={(e) => setNewCategory({ ...newCategory, minsum: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Максимальный балл"
          value={newCategory.maxsum}
          onChange={(e) => setNewCategory({ ...newCategory, maxsum: e.target.value })}
        />
        <button type="submit">Добавить</button>
      </form>

      <form onSubmit={handleEditCategory}>
        <h2>Изменить категорию</h2>
        <select
          required
          value={selectedNumberBeforeEdit}
          onChange={(e) => { setSelectedNumberBeforeEdit(e.target.value); handleSelectCategory(e.target.value) }}>
          <option value="">Выберите категорию</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.number}>{category.number}</option>
          ))}
        </select>
        <input
          required
          type="number"
          placeholder="Новый номер категории"
          value={editCategory.number}
          onChange={(e) => setEditCategory({ ...editCategory, number: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Новый текст категории"
          maxLength={512}
          value={editCategory.text}
          onChange={(e) => setEditCategory({ ...editCategory, text: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Новый минимальный балл"
          value={editCategory.minsum}
          onChange={(e) => setEditCategory({ ...editCategory, minsum: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Новый максимальный балл"
          value={editCategory.maxsum}
          onChange={(e) => setEditCategory({ ...editCategory, maxsum: e.target.value })}
        />
        <button type="submit">Изменить</button>
      </form>

      <form onSubmit={handleDeleteCategory}>
        <h2>Удалить категорию</h2>
        <select
          required
          value={selectedCategory}
          onChange={(e) => setSelectedCategoryNumber(e.target.value)}>
          <option value="">Выберите категорию</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>{category.number}</option>
          ))}
        </select>
        <button type="submit">Удалить</button>
      </form>
    </div>
  );
};

export default CategoryEditPage;