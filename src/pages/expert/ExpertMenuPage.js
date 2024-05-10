import React from "react";
import { useNavigate } from "react-router-dom";

const ExpertPage = () => {
  const navigate = useNavigate();

  const handleOpinionCreateClick = () => {
    navigate("/expert/create");
  };

  const handleOpinionChangeClick = () => {
    navigate("/expert/change");
  };

  const handleOpinionViewClick = () => {
    navigate("/expert/view");
  };

  const handleOpinionViewTableClick = () => {
    navigate("/expert/view/table");
  };

  const handleExitClick = () => {
    navigate("/auth");
  };

  return (
    <div>
      <form>
        <h1>Меню эксперта</h1>
        <div>
          <button onClick={handleOpinionCreateClick}>Добавление экспертного заключения</button>
          <button onClick={handleOpinionChangeClick}>Изменение экспертного заключения</button>
          <button onClick={handleOpinionViewClick}>Просмотр экспертного заключения</button>
          <button onClick={handleOpinionViewTableClick}>Просмотр таблицы экспертных заключений</button>
          <button onClick={handleExitClick}>Выход</button>
        </div>
      </form>
    </div>
  );
};

export default ExpertPage;