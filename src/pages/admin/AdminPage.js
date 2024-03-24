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

  const handleOpinionClick = () => {
    navigate("/admin/opinion");
  };

  const handleExitClick = () => {
    navigate("/auth");
  };

  return (
    <form>
      <h1>Меню организатора</h1>
      <button onClick={handleProjectClick}>Редактирование проектов</button>
      <button onClick={handleExpertClick}>Редактирование экспертов</button>
      <button onClick={handleAdminClick}>Редактирование организаторов</button>
      <button onClick={handleCriteriaClick}>Редактирование критериев</button>
      <button onClick={handleOpinionClick}>Просмотр экспертных заключений</button>
      <button onClick={handleRatingClick}>Просмотр рейтинга</button>
      <button onClick={handleExitClick}>Выход</button>
    </form>
  );
};

export default AdminPage;