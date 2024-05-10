import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };
  const isAuthenticated = process.env.REACT_APP_IS_AUTH;

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleAuth = async (event) => {
    event.preventDefault();
    document.body.style.cursor = 'wait';
    setIsLoading(true);
    try {
      if (selectedRole === "expert") {
        const response = await axios.post(serverPath + "/expert/auth", { login, password }, { auth: basicAuth });
        localStorage.setItem("loggedExpertId", response.data);
        localStorage.setItem("isAuthenticated", isAuthenticated);
      } else if (selectedRole === "admin") {
        await axios.post(serverPath + "/admin/auth", { login, password }, { auth: basicAuth });
        localStorage.setItem("isAuthenticated", isAuthenticated);
      }
      navigate("/" + selectedRole);
    } catch (error) {
      if (error.code === AxiosError.ERR_NETWORK) {
        alert("Ошибка сервера");
      } else if (error.response.status === 401) {
        alert("Неверный логин или пароль");
      } else {
        alert("Ошибка входа в ситему: " + error.response.status);
      }
    }
    document.body.style.cursor = 'default';
    setIsLoading(false);
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
        <button disabled={isLoading} type="submit">Авторизоваться</button>
      </div>
    </form>
  );
};

export default AuthPage;