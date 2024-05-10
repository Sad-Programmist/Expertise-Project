import React, { useState } from "react";
import axios from "axios";

const AddProjectForm = ({ fetchProjectsByYearEdit, fetchProjectsByYearDelete, fetchYears }) => {
  const [newProject, setNewProject] = useState({ theme: "", author: "", year: "", orderNumber: "" });

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleAddProject = async (event) => {
    event.preventDefault();
    try {
      const project = {
        author: newProject.author, theme: newProject.theme,
        year: newProject.year, orderNumber: newProject.orderNumber
      };
      await axios.post(serverPath + "/create", project, { auth: basicAuth });
      fetchProjectsByYearEdit(newProject.year);
      fetchProjectsByYearDelete(newProject.year);
      fetchYears();
      setNewProject({ theme: "", author: "", year: "", orderNumber: "" });
    } catch (error) {
      alert("Ошибка добавления проекта");
    }
  };

  return (
    <form onSubmit={handleAddProject}>
      <h2>Добавление нового проекта</h2>
      <p>Чтобы добавить новый проект в систему, необходимо записать всю информацию о нем в поля ввода и
        после нажать на кнопку "Добавить". <br />  <br />
        Обратите внимание, что все поля обязательны для заполнения!</p>
      <label>Заполните год участия проекта:</label>
      <input
        required
        type="number"
        placeholder="Год участия"
        maxLength={4}
        value={newProject.year}
        onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
      />
      <label>Заполните порядковый номер проекта при выступлении:</label>
      <input
        required
        type="number"
        placeholder="Порядковый номер"
        value={newProject.orderNumber}
        onChange={(e) => setNewProject({ ...newProject, orderNumber: e.target.value })}
      />
      <label>Заполните тему проекта:</label>
      <input
        required
        type="text"
        placeholder="Тема"
        maxLength={256}
        value={newProject.theme}
        onChange={(e) => setNewProject({ ...newProject, theme: e.target.value })}
      />
      <label>Заполните ФИО автора проекта (если авторов несколько, запишите их ФИО через запятую):</label>
      <input
        required
        type="text"
        placeholder="ФИО автора"
        maxLength={512}
        value={newProject.author}
        onChange={(e) => setNewProject({ ...newProject, author: e.target.value })}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddProjectForm;