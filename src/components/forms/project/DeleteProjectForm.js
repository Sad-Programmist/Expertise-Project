import React, { useState } from "react";
import axios from "axios";

const DeleteProjectForm = ({ projectDeleteList, yearList, fetchProjectsByYearDelete, fetchYears }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleDeleteProject = async (event) => {
    event.preventDefault();
    var isDelete = window.confirm("Вы точно хотите удалить выбранный проект? В случае удаления этого проекта будут удалены все сделанные по нему экспертные заключения");
    if (!isDelete) {
      return;
    }
    try {
      await axios.get(serverPath + "/delete?projectId=" + selectedProject, { auth: basicAuth });
      fetchProjectsByYearDelete(selectedYear);
      fetchYears();
      setSelectedProject("");
      setSelectedYear("");
    } catch (error) {
      alert("Ошибка удаления проекта");
    }
  };

  return (
    <form onSubmit={handleDeleteProject}>
      <h2>Удаление проекта</h2>
      <p>Чтобы удалить сохраненный в системе проект, необходимо сначала в выпадающем списке выбрать год участия проекта,
        а потом в другом выпадающем списке его тему.
        После выбора темы нажмите на кнопку "Удалить", чтобы выбранный проект был удален из системы. <br /><br />
        Обратите внимание, что данные о проекте нельзя будет восстановить после удаления!
      </p>
      <select
        required
        value={selectedYear}
        onChange={(e) => { setSelectedYear(e.target.value); fetchProjectsByYearDelete(e.target.value); }}>
        <option value="" disabled selected hidden>Выберите год</option>
        {yearList.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select
        required
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="" disabled selected hidden>Выберите тему проекта</option>
        {projectDeleteList.map((project) => (
          <option key={project.id} value={project.id}>{project.theme}</option>
        ))}
      </select>
      <button type="submit">Удалить</button>
    </form>
  );
};

export default DeleteProjectForm;