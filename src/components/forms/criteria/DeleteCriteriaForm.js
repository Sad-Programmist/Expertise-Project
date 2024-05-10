import React, { useState } from "react";
import axios from "axios";

const DeleteCriteriaForm = ({ criteriaList, fetchCriteria }) => {
  const [selectedCriteria, setSelectedCriteria] = useState("");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const handleDeleteCriteria = async (event) => {
    event.preventDefault();
    var isDelete = window.confirm("Вы точно хотите удалить выбранный критерий?");
    if (!isDelete) {
      return;
    }
    try {
      await axios.get(serverPath + "/criteria/delete?criteriaId=" + selectedCriteria, { auth: basicAuth });
      fetchCriteria();
      setSelectedCriteria("");
    } catch (error) {
      alert("Ошибка удаления критерия");
    }
  };

  return (
    <form onSubmit={handleDeleteCriteria}>
      <h2>Удаление критерия</h2>
      <p>Чтобы удалить сохраненный в системе критерий, неоходимо в выпадающем списке выбрать номер критерия.
        После выбора номера нажмите на кнопку "Удалить", чтобы выбранный критерий был удален из системы. <br /><br />
        Обратите внимание, что данные о критерии нельзя будет восстановить после удаления!
      </p>
      <select
        required
        value={selectedCriteria}
        onChange={(e) => setSelectedCriteria(e.target.value)}>
        <option value="">Выберите номер критерия</option>
        {criteriaList.map((criteria) => (
          <option key={criteria.id} value={criteria.id}>{`${criteria.categoryNumber}.${criteria.number}`}</option>
        ))}
      </select>
      <button type="submit">Удалить</button>
    </form>
  );
};

export default DeleteCriteriaForm;