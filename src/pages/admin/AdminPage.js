import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate("/admin/project");
  };

  const handleExpertClick = () => {
    navigate("/admin/expert");
  };

  const handleAdminClick = () => {
    navigate("/admin/admin");
  };

  const handleRatingClick = () => {
    navigate("/admin/rating");
  };

  const handleCriteriaClick = () => {
    navigate("/admin/criteria");
  };

  return (
    <form>
      <h1>Меню организатора</h1>
      <button onClick={handleProjectClick}>Редактировать проекты</button>
      <button onClick={handleExpertClick}>Редактировать экспертов</button>
      <button onClick={handleAdminClick}>Редактировать организаторов</button>
      <button onClick={handleCriteriaClick}>Редактировать критерии</button>
      <button onClick={handleRatingClick}>Посмотреть рейтинг</button>
    </form>
  );
};

export default AdminPage;