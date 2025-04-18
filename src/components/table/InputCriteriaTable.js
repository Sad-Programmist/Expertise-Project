import React from "react";

const InputCriteriaTable = ({ criteriaList, categoryList, invalidCriteriaIds, criteriaScoreList, setCriteriaScoreList }) => {

  const handleCriteriaScoreChange = (criterionId, event) => {
    const value = event.target.value;
    setCriteriaScoreList((prevScores) => ({
      ...prevScores,
      [criterionId]: value,
    }));
  };

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
                <tr key={criteria.id} className={invalidCriteriaIds.includes(criteria.id) ? "invalid-criteria" : ""}>
                  <td>{`${category.number}.${criteria.number}`}</td>
                  <td>{criteria.text}</td>
                  <td>
                    <input
                      type="number"
                      required
                      min="0"
                      value={criteriaScoreList[criteria.id] || ""}
                      onChange={(event) => handleCriteriaScoreChange(criteria.id, event)}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputCriteriaTable;

