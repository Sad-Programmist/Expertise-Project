import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProjectForm = () => {
  const navigate = useNavigate();

  const handleProjectViewClick = () => {
    navigate("/admin/project/view");
  };

  return (
    <form>
      <h2>Просмотр проектов</h2>
      <p>Чтобы перейти на страницу для просмотра всех сохраненных в системе проектов, нажмите на кнопку "Посмотреть".</p>
      <button onClick={handleProjectViewClick}>Посмотреть</button>
    </form>
  );
};

export default ViewProjectForm;