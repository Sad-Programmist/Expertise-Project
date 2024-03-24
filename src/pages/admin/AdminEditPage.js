import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminCreateDto from "./dto/AdminCreateDto";
import AdminHeader from "../../components/AdminHeader";

const AdminEditPage = () => {
  const [newAdmin, setNewAdmin] = useState({ login: "", password: "" });
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [adminList, setAdminList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/admin";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setAdminList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка организаторов");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddOrganizer = async (event) => {
    event.preventDefault();
    try {
      const admin = new AdminCreateDto(newAdmin.login, newAdmin.password);
      await axios.post(serverPath + "/create", admin, { auth: basicAuth });
      setNewAdmin({ login: "", password: "" });
      fetchAdmins();
    } catch (error) {
      alert("Ошибка добавления организатора");
    }
  };

  const handleDeleteOrganizer = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/delete?adminId=" + selectedAdmin, { auth: basicAuth });
      fetchAdmins();
    } catch (error) {
      alert("Ошибка удаления организатора");
    }
  };

  return (
    <div>
      <AdminHeader />
      <form onSubmit={handleAddOrganizer}>
        <h2>Добавление нового организатора</h2>
        <p>Для добавления нового организатора необходимо заполнить логин и пароль для авторизации на сервисе.
          После нажмите на кнопку "Добавить", чтобы сохранить нового организатора. <br />  <br />
          Внимание! Все поля обязательны для заполнения!</p>
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

      <form onSubmit={handleDeleteOrganizer}>
        <h2>Удаление организатора</h2>
        <p>Для удаления организатора неоходимо в выпадающем списке по логину выбрать организатора, данные о котором собираетесь удалить. 
          После этого нажмите на кнопку "Удалить", чтобы выбранный организатор был удален. <br /><br />
          Внимание! Данные об организаторе нельзя будет восстановить после удаления!
        </p>
        <select
          required
          value={selectedAdmin}
          onChange={(e) => setSelectedAdmin(e.target.value)}>
          <option value="">Выберите организатора</option>
          {adminList.map((organizer) => (
            <option key={organizer.id} value={organizer.id}>{organizer.login}</option>
          ))}
        </select>
        <button type="submit">Удалить</button>
      </form>
    </div>
  );
};

export default AdminEditPage;