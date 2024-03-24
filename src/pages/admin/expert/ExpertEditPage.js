import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpertCreateDto from "../dto/ExpertCreateDto";
import ExpertChangeDto from "../dto/ExpertChangeDto";
import AdminHeader from "../../../components/AdminHeader";

const ExpertEditPage = () => {
  const navigate = useNavigate();

  const [newExpert, setNewExpert] = useState({ name: "", login: "", password: "" });
  const [editExpert, setEditExpert] = useState({ id: "", name: "", login: "", password: "" });
  const [selectedExpert, setSelectedExpert] = useState("");
  const [expertList, setExpertList] = useState([]);
  const [selectedNameBeforeEdit, setSelectedNameBeforeEdit] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/expert";
  const basicAuth = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD
  };

  const fetchExperts = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setExpertList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка экспертов");
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleAddExpert = async (event) => {
    event.preventDefault();
    try {
      const expert = new ExpertCreateDto(newExpert.name, newExpert.login, newExpert.password);
      await axios.post(serverPath + "/create", expert, { auth: basicAuth });
      setNewExpert({ name: "", login: "", password: "" });
      fetchExperts();
    } catch (error) {
      alert("Ошибка добавления эксперта");
    }
  };

  const handleEditExpert = async (event) => {
    event.preventDefault();
    try {
      const expert = new ExpertChangeDto(editExpert.id, editExpert.name, editExpert.login, editExpert.password);
      await axios.post(serverPath + "/change", expert, { auth: basicAuth });
      setEditExpert({ id: "", name: "", login: "", password: "" });
      fetchExperts();
    } catch (error) {
      alert("Ошибка изменения эксперта");
    }
  };

  const handleDeleteExpert = async (event) => {
    event.preventDefault();
    try {
      await axios.get(serverPath + "/delete?expertId=" + selectedExpert, { auth: basicAuth });
      fetchExperts();
    } catch (error) {
      alert("Ошибка удаления эксперта");
    }
  };

  const handleSelectExpert = (selectedExpertName) => {
    const selectedExpert = expertList.find(expert => expert.name === selectedExpertName);
    if (selectedExpert) {
      setSelectedNameBeforeEdit(selectedExpertName);
      setEditExpert(selectedExpert);
    }
  };

  const handleExpertViewClick = () => {
    navigate("/admin/expert/view");
  };


  return (
    <div>
      <AdminHeader />
      <form>
        <h2>Просмотр экспертов</h2>
        <p>Для просмотра всех экспертов нажмите на кнопку "Посмотреть".</p>
        <button onClick={handleExpertViewClick}>Посмотреть</button>
      </form>

      <form onSubmit={handleAddExpert}>
        <h2>Добавление нового эксперта</h2>
        <p>Для добавления нового эксперта необходимо заполнить ФИО эксперта, логин и пароль для авторизации на сервисе.
          После нажмите на кнопку "Добавить", чтобы сохранить нового эксперта. <br />  <br />
          Внимание! Все поля обязательны для заполнения!</p>
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

      <form onSubmit={handleEditExpert}>
        <h2>Изменение данных эксперта</h2>
        <p>Для изменения данных об эксперте необходимо в выпадающем списке по ФИО эксперта выбрать эксперта, данные о котором собираетесь изменить. <br /><br />
          После выбора определенного эксперта все поля автоматически заполнятся информацией, сохраненной об эксперте на данный момент. <br /><br />
          Измените все необходимые поля и затем нажмите кнопку "Изменить", чтобы сохранить новые данные об эксперте.</p>
        <select
          required
          value={selectedNameBeforeEdit}
          onChange={(e) => { setSelectedNameBeforeEdit(e.target.value); handleSelectExpert(e.target.value) }}>
          <option value="">Выберите эксперта</option>
          {expertList.map((expert) => (
            <option key={expert.id} value={expert.name}>{expert.name}</option>
          ))}
        </select>
        <label>Заполните ФИО эксперта:</label>
        <input
          required
          type="text"
          placeholder="Новое ФИО"
          maxLength={128}
          value={editExpert.name}
          onChange={(e) => setEditExpert({ ...editExpert, name: e.target.value })}
        />
        <label>Заполните логин эксперта:</label>
        <input
          required
          type="text"
          placeholder="Новый логин"
          maxLength={128}
          value={editExpert.login}
          onChange={(e) => setEditExpert({ ...editExpert, login: e.target.value })}
        />
        <label>Заполните пароль эксперта:</label>
        <input
          required
          type="password"
          placeholder="Новый пароль"
          maxLength={128}
          value={editExpert.password}
          onChange={(e) => setEditExpert({ ...editExpert, password: e.target.value })}
        />
        <button type="submit">Изменить</button>
      </form>

      <form onSubmit={handleDeleteExpert}>
        <h2>Удалить эксперта</h2>
        <p>Для удаления эксперта неоходимо в выпадающем списке по ФИО эксперта выбрать эксперта, данные о котором собираетесь удалить. 
          После этого нажмите на кнопку "Удалить", чтобы выбранный эксперт был удален. <br /><br />
          Внимание! Данные об эксперте нельзя будет восстановить после удаления!
        </p>
        <select
          required
          value={selectedExpert}
          onChange={(e) => setSelectedExpert(e.target.value)}>
          <option value="">Выберите эксперта</option>
          {expertList.map((expert) => (
            <option key={expert.id} value={expert.id}>{expert.name}</option>
          ))}
        </select>
        <button type="submit">Удалить</button>
      </form>
    </div>
  );
};

export default ExpertEditPage;