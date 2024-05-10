import React from 'react';
import { Link } from 'react-router-dom';

const ExpertHeader = () => {
  return (
    <div className="header">
      <ul>
        <li><Link to="/expert">Главная</Link></li>
        <li><Link to="/expert/create">Добавление</Link></li>
        <li><Link to="/expert/change">Изменение</Link></li>
        <li><Link to="/expert/view">Просмотр</Link></li>
        <li><Link to="/expert/view/table">Таблица</Link></li>
      </ul>
    </div>
  );
};

export default ExpertHeader;