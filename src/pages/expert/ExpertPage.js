import React from "react";
import { useNavigate } from "react-router-dom";

const ExpertPage = () => {
  const navigate = useNavigate();

  const handleOpinionCreate = () => {
    navigate("/expert/create");
  };

  const handleOpinionChange = () => {
    navigate("/expert/change");
  };

  return (
    <div>
      <form>
        <h1>Меню эксперта</h1>
        <div>
          <button onClick={handleOpinionCreate}>Добавить экспертное заключение</button>
        </div>
        <div>
          <button onClick={handleOpinionChange}>Изменить экспертное заключение</button>
        </div>
      </form>
    </div>
  );
};

export default ExpertPage;