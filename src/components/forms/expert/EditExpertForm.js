import React, { useState } from "react";
import axios from "axios";

const EditExpertForm = ({ expertList, fetchExperts }) => {
  const [editExpert, setEditExpert] = useState({ id: "", name: "", login: "", password: "" });
  const [selectedNameBeforeEdit, setSelectedNameBeforeEdit] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/expert";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleEditExpert = async (event) => {
    event.preventDefault();
    try {
      const expert = { id: editExpert.id, name: editExpert.name, login: editExpert.login, password: editExpert.password };
      await axios.post(serverPath + "/change", expert, { auth: basicAuth });
      fetchExperts();
      setEditExpert({ id: "", name: "", login: "", password: "" });
    } catch (error) {
      alert("Ошибка изменения эксперта");
    }
  };

  const handleSelectExpert = (selectedExpertName) => {
    const selectedExpert = expertList.find(expert => expert.name === selectedExpertName);
    if (selectedExpert) {
      setSelectedNameBeforeEdit(selectedExpertName);
      setEditExpert(selectedExpert);
    }
  };

  return (
    <form onSubmit={handleEditExpert}>
      <h2>Изменение данных об эксперте</h2>
      <p>Чтобы измененить данные об эксперте, необходимо в выпадающем списке выбрать ФИО эксперта.
        При выборе ФИО все поля автоматически заполнятся информацией, сохраненной об эксперте на данный момент. <br /><br />
        После внесения изменений нажмите на кнопку "Изменить", чтобы сохранить новые данные об эксперте.</p>
      <select
        required
        value={selectedNameBeforeEdit}
        onChange={(e) => { setSelectedNameBeforeEdit(e.target.value); handleSelectExpert(e.target.value) }}>
        <option value="">Выберите ФИО эксперта</option>
        {expertList.map((expert) => (
          <option key={expert.id} value={expert.name}>{expert.name}</option>
        ))}
      </select>
      <label>Заполните новое ФИО эксперта:</label>
      <input
        required
        type="text"
        placeholder="ФИО"
        maxLength={128}
        value={editExpert.name}
        onChange={(e) => setEditExpert({ ...editExpert, name: e.target.value })}
      />
      <label>Заполните новый логин эксперта:</label>
      <input
        required
        type="text"
        placeholder="Логин"
        maxLength={128}
        value={editExpert.login}
        onChange={(e) => setEditExpert({ ...editExpert, login: e.target.value })}
      />
      <label>Заполните новый пароль эксперта:</label>
      <input
        required
        type="password"
        placeholder="Пароль"
        maxLength={128}
        value={editExpert.password}
        onChange={(e) => setEditExpert({ ...editExpert, password: e.target.value })}
      />
      <button type="submit">Изменить</button>
    </form>
  );
};

export default EditExpertForm;