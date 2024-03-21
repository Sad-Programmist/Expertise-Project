import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header.js";

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
      <Header />
      <form>
        <h2>Просмотреть таблицу критериев</h2>
        <button onClick={handleViewCriteria}>Посмотреть</button>
      </form>
      <form>
        <h2>Меню редактирования категорий и критериев</h2>
        <button onClick={handleCategories}>Работа с категориями критериев</button>
        <button onClick={handleCriteria}>Работа с критериями</button>
      </form>
    </div>
  );
};

export default CriteriaTableEditPage;