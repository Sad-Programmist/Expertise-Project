import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const AddAdminForm = ({ fetchAdmins }) => {
  const [newAdmin, setNewAdmin] = useState({ login: "", password: "" });

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/admin";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleAddOrganizer = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/create?login=" + newAdmin.login, { auth: basicAuth })
      const admin = { login: newAdmin.login, password: newAdmin.password };
      await axios.post(serverPath + "/create", admin, { auth: basicAuth });
      setNewAdmin({ login: "", password: "" });
      fetchAdmins();
    } catch (error) {
      if (error.code === AxiosError.ERR_NETWORK) {
        alert("Ошибка сервера");
      } else if (error.response.status === 400) {
        alert("Организатор с таким логином уже существует в системе");
      } else {
        alert("Ошибка добавления организатора: " + error.response.status);
      }
    }
  };

  return (
    <form onSubmit={handleAddOrganizer}>
      <h2>Добавление нового организатора</h2>
      <p>Чтобы добавить нового организатора в систему, необходимо записать всю информацию о нем в поля ввода и после 
        нажать на кнопку "Добавить". <br />  <br />
        Обратите внимание, что все поля обязательны для заполнения!</p>
      <label>Заполните логин организатора:</label>
      <input
        required
        type="text"
        placeholder="Логин"
        maxLength={128}
        value={newAdmin.login}
        onChange={(e) => setNewAdmin({ ...newAdmin, login: e.target.value })}
      />
      <label>Заполните пароль организатора:</label>
      <input
        required
        type="password"
        placeholder="Пароль"
        maxLength={128}
        value={newAdmin.password}
        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddAdminForm;