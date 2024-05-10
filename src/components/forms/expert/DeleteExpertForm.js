import React, { useState } from "react";
import axios from "axios";

const DeleteExpertForm = ({ expertList, fetchExperts }) => {
  const [selectedExpert, setSelectedExpert] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/expert";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleDeleteExpert = async (event) => {
    event.preventDefault();
    var isDelete = window.confirm("Вы точно хотите удалить выбранного эксперта? В случае удаления данный эксперт большене не будет иметь доступ к системе");
    if (!isDelete) {
      return;
    }
    try {
      await axios.get(serverPath + "/delete?expertId=" + selectedExpert, { auth: basicAuth });
      fetchExperts();
      setSelectedExpert("");
    } catch (error) {
      alert("Ошибка удаления эксперта");
    }
  };

  return (
    <form onSubmit={handleDeleteExpert}>
      <h2>Удаление эксперта</h2>
      <p>Чтобы удалить сохраненного в системе эксперта, неоходимо в выпадающем списке выбрать ФИО эксперта.
        После выбора ФИО нажмите на кнопку "Удалить", чтобы выбранный эксперт был удален из системы. <br /><br />
        Обратите внимание, что данные об эксперте нельзя будет восстановить после удаления!
      </p>
      <select
        required
        value={selectedExpert}
        onChange={(e) => setSelectedExpert(e.target.value)}>
        <option value="">Выберите ФИО эксперта</option>
        {expertList.map((expert) => (
          <option key={expert.id} value={expert.id}>{expert.name}</option>
        ))}
      </select>
      <button type="submit">Удалить</button>
    </form>
  );
};

export default DeleteExpertForm;