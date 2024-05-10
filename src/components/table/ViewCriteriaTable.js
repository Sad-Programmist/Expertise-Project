import React from "react";

const ViewCriteriaTable = ({ criteriaList, categoryList, criteriaScoreList }) => {
  return (
    <div>
      <h2>Критерии экспертной оценки проекта</h2>
      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Текст</th>
            <th>Балл</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map(category => (
            <React.Fragment key={category.id}>
              <tr>
                <td>{category.number}</td>
                <td>{category.text}</td>
                <td>Максимальная сумма баллов - {category.maxsum}</td>
              </tr>
              {criteriaList.filter(criteria => criteria.categoryId === category.id).map(criteria => (
                <tr key={criteria.id}>
                  <td>{`${category.number}.${criteria.number}`}</td>
                  <td>{criteria.text}</td>
                  <td>{criteriaScoreList[criteria.id] !== undefined ? criteriaScoreList[criteria.id] : ""}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCriteriaTable;