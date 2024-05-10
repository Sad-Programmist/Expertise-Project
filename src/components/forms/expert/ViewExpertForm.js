import React from "react";
import { useNavigate } from "react-router-dom";

const ViewExpertForm = () => {
  const navigate = useNavigate();

  const handleExpertViewClick = () => {
    navigate("/admin/expert/view");
  };

  return (
    <form>
      <h2>Просмотр экспертов</h2>
      <p>Чтобы перейти на страницу для просмотра всех сохраненных в системе экспертов, нажмите на кнопку "Посмотреть".</p>
      <button onClick={handleExpertViewClick}>Посмотреть</button>
    </form>
  );
};

export default ViewExpertForm;