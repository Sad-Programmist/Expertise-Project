import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div className="header">
      <ul>
        <li><Link to="/admin">Главная</Link></li>
        <li><Link to="/admin/project">Проекты</Link></li>
        <li><Link to="/admin/expert">Эксперты</Link></li>
        <li><Link to="/admin/admin">Организаторы</Link></li>
        <li><Link to="/admin/criteria">Категории и критерии</Link></li>
        <li><Link to="/admin/opinion">Заключения</Link></li>
        <li><Link to="/admin/rating">Рейтинг</Link></li>
      </ul>
    </div>
  );
};

export default AdminHeader;