import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";

const CriteriaTableEditPage = () => {
  const navigate = useNavigate();

  const handleViewCriteria = () => {
    navigate("/admin/criteria/view");
  };

  const handleCategories = () => {
    navigate("/admin/criteria/category");
  };

  const handleCriteria = () => {
    navigate("/admin/criteria/criteria");
  };

  return (
    <div>
      <AdminHeader />
      <form>
        <h2>Просмотр таблицы критериев</h2>
        <p>Для просмотра всех критериев нажмите на кнопку "Посмотреть".</p>
        <button onClick={handleViewCriteria}>Посмотреть</button>
      </form>
      <form>
        <h2>Меню редактирования категорий и критериев</h2>
        <button onClick={handleCategories}>Редактирование категорий критериев</button>
        <button onClick={handleCriteria}>Редактирование критериев</button>
      </form>
    </div>
  );
};

export default CriteriaTableEditPage;