import React, { useState } from "react";
import axios from "axios";

const EditProjectForm = ({ projectEditList, yearList, fetchProjectsByYearEdit, fetchYear }) => {
  const [editProject, setEditProject] = useState({ id: "", theme: "", author: "", year: "", orderNumber: "" });
  const [selectedThemeBeforeEdit, setSelectedThemeBeforeEdit] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleEditProject = async (event) => {
    event.preventDefault();
    try {
      const project = {
        id: editProject.id, author: editProject.author, theme: editProject.theme,
        year: editProject.year, orderNumber: editProject.orderNumber
      };
      await axios.post(serverPath + "/change", project, { auth: basicAuth });
      fetchProjectsByYearEdit(selectedYear);
      fetchYear();
      setEditProject({ id: "", theme: "", author: "", year: "", orderNumber: "" });
      setSelectedThemeBeforeEdit("");
    } catch (error) {
      alert("Ошибка изменения проекта");
    }
  };

  const handleSelectProject = (selectedTheme) => {
    const selectedProject = projectEditList.find(project => project.theme === selectedTheme);
    if (selectedProject) {
      setSelectedThemeBeforeEdit(selectedTheme);
      setEditProject(selectedProject);
    }
  };

  return (
    <form onSubmit={handleEditProject}>
      <h2>Изменение данных о проекте</h2>
      <p>Чтобы измененить данные о сохраненном в системе проекте, необходимо сначала в выпадающем списке выбрать год участия проекта, 
        а потом в другом выпадающем списке его тему.
        При выборе темы все поля автоматически заполнятся информацией, сохраненной о проекте на данный момент. <br /><br />
        После внесения изменений нажмите на кнопку "Изменить", чтобы сохранить новые данные о проекте.</p>
      <select onChange={(e) => { setSelectedYear(e.target.value); fetchProjectsByYearEdit(e.target.value); }}>
        <option value="">Год</option>
        {yearList.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select
        required
        value={selectedThemeBeforeEdit}
        onChange={(e) => { setSelectedThemeBeforeEdit(e.target.value); handleSelectProject(e.target.value); }}>
        <option value="">Выберите проект</option>
        {projectEditList.map((project) => (
          <option key={project.id} value={project.theme}>{project.theme}</option>
        ))}
      </select>
      <label>Заполните новый год участия проекта:</label>
      <input
        required
        type="number"
        placeholder="Год участия"
        maxLength={4}
        value={editProject.year}
        onChange={(e) => setEditProject({ ...editProject, year: e.target.value })}
      />
      <label>Заполните новый порядковый номер проекта при выступлении:</label>
      <input
        required
        type="number"
        placeholder="Порядковый номер"
        value={editProject.orderNumber}
        onChange={(e) => setEditProject({ ...editProject, orderNumber: e.target.value })}
      />
      <label>Заполните новую тему проекта:</label>
      <input
        required
        type="text"
        placeholder="Тема"
        maxLength={256}
        value={editProject.theme}
        onChange={(e) => setEditProject({ ...editProject, theme: e.target.value })}
      />
      <label>Заполните новое ФИО автора проекта (если авторов несколько, запишите их ФИО через запятую):</label>
      <input
        required
        type="text"
        placeholder="ФИО автора"
        maxLength={512}
        value={editProject.author}
        onChange={(e) => setEditProject({ ...editProject, author: e.target.value })}
      />
      <button type="submit">Изменить</button>
    </form>
  );
};

export default EditProjectForm;