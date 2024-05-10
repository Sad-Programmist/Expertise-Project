import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const AddExpertForm = ({ fetchExperts }) => {
  const [newExpert, setNewExpert] = useState({ name: "", login: "", password: "" });

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/expert";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleAddExpert = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/create?login=" + newExpert.login, { auth: basicAuth })
      const expert = { name: newExpert.name, login: newExpert.login, password: newExpert.password };
      await axios.post(serverPath + "/create", expert, { auth: basicAuth });
      fetchExperts();
      setNewExpert({ name: "", login: "", password: "" });
    } catch (error) {
      if (error.code === AxiosError.ERR_NETWORK) {
        alert("Ошибка сервера");
      } else if (error.response.status === 400) {
        alert("Эксперт с таким логином уже существует в системе");
      } else {
        alert("Ошибка добавления эксперта: " + error.response.status);
      }
    }
  };

  return (
    <form onSubmit={handleAddExpert}>
      <h2>Добавление нового эксперта</h2>
      <p>Чтобы добавить нового эксперта, необходимо записать всю информацию о нем в поля ввода и после 
        нажать на кнопку "Добавить". <br />  <br />
        Обратите внимание, что все поля обязательны для заполнения!</p>
      <label>Заполните ФИО эксперта:</label>
      <input
        required
        type="text"
        placeholder="ФИО"
        maxLength={128}
        value={newExpert.name}
        onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
      />
      <label>Заполните логин эксперта:</label>
      <input
        required
        type="text"
        placeholder="Логин"
        maxLength={128}
        value={newExpert.login}
        onChange={(e) => setNewExpert({ ...newExpert, login: e.target.value })}
      />
      <label>Заполните пароль эксперта:</label>
      <input
        required
        type="password"
        placeholder="Пароль"
        maxLength={128}
        value={newExpert.password}
        onChange={(e) => setNewExpert({ ...newExpert, password: e.target.value })}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddExpertForm;