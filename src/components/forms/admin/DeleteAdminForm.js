import React, { useState } from "react";
import axios from "axios";

const DeleteAdminForm = ({ adminList, fetchAdmins }) => {
  const [selectedAdmin, setSelectedAdmin] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/admin";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleDeleteOrganizer = async (event) => {
    event.preventDefault();
    var isDelete = window.confirm("Вы точно хотите удалить выбранного организатора? В случае удаления данный организатор больше не будет иметь доступ к системе");
    if (!isDelete) {
      return;
    }
    try {
      if (adminList.length > 1) {
        await axios.get(serverPath + "/delete?adminId=" + selectedAdmin, { auth: basicAuth });
        fetchAdmins();
      } else {
        alert("Нельзя удалить организатора, так как остался только 1 организатор")
      }
    } catch (error) {
      alert("Ошибка удаления организатора");
    }
  };

  return (
    <form onSubmit={handleDeleteOrganizer}>
      <h2>Удаление организатора</h2>
      <p>Чтобы удалить сохраненного в системе организатора, неоходимо в выпадающем списке выбрать логин организатора.
        После выбора логина нажмите на кнопку "Удалить", чтобы выбранный организатор был удален из системы. <br /><br />
        Обратите внимание, что данные об организаторе нельзя будет восстановить после удаления!
      </p>
      <select
        required
        value={selectedAdmin}
        onChange={(e) => setSelectedAdmin(e.target.value)}>
        <option value="" disabled selected hidden>Выберите логин организатора</option>
        {adminList.map((organizer) => (
          <option key={organizer.id} value={organizer.id}>{organizer.login}</option>
        ))}
      </select>
      <button type="submit">Удалить</button>
    </form>
  );
};
export default DeleteAdminForm;