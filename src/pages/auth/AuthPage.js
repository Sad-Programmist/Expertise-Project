import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const serverPath = "http://localhost:8080";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      if (selectedRole === "expert") {
        const response = await axios.post(serverPath + "/expert/auth", { login, password }, { auth: basicAuth });
        localStorage.setItem("loggedExpertId", response.data);
      } else if (selectedRole === "admin") {
        await axios.post(serverPath + "/admin/auth", { login, password }, { auth: basicAuth });
      }
      navigate("/" + selectedRole);
    } catch (error) {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <h1>Авторизация</h1>
      <select required value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">Выберите роль</option>
        <option value="expert">Эксперт</option>
        <option value="admin">Организатор</option>
      </select>
      <div>
        <input
          required
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Авторизоваться</button>
      </div>
    </form>
  );
};

export default AuthPage;