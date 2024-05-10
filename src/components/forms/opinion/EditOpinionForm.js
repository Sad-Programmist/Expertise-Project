import React, { useState } from "react";
import axios from "axios";
import EditOpinionInstructionForm from "./EditOpinionInstructionForm";
import InputCriteriaTable from "../../table/InputCriteriaTable";

const EditOpinionForm = ({ expertName, projectList, categoryList, criteriaList }) => {
  const [text, setText] = useState("");
  const [criteriaScoreList, setCriteriaScoreList] = useState({});
  const [conclusion, setConclusion] = useState(false);
  const [invalidCriteriaIds, setInvalidCriteriaIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const loggedExpertId = localStorage.getItem("loggedExpertId");

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const validateCategoryScores = () => {
    const invalidCategories = [];

    categoryList.forEach(category => {
      const criteriaInCategory = criteriaList.filter(criteria => criteria.categoryId === category.id);
      const categoryScores = criteriaInCategory.reduce((total, criteria) => {
        return total + parseInt(criteriaScoreList[criteria.id] || 0);
      }, 0);

      if (categoryScores > category.maxsum) {
        invalidCategories.push(category.id);
      }
    });

    return invalidCategories;
  };

  const handleProjectChange = async (event) => {
    setSelectedProject(event.target.value);
    try {
      const response = await axios.get(serverPath + "/opinion?expertId=" + loggedExpertId + "&projectId=" + event.target.value, { auth: basicAuth });
      const { projectName, expertName, scores, text, conclusion } = response.data;
      setText(text);
      const newCriteriaScores = {};
      criteriaList.forEach((criteria, index) => {
        newCriteriaScores[criteria.id] = scores[index] || "0";
      });

      setCriteriaScoreList(newCriteriaScores);
      setConclusion(conclusion);

    } catch (error) {
      alert("Ошибка загрузки данных");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.body.style.cursor = 'wait';
    setIsLoading(true);

    const invalidCategories = validateCategoryScores();

    if (invalidCategories.length > 0) {
      alert("Сумма баллов в выделенных категориях превышает максимально возможную сумму");
      const invalidCriteria = criteriaList.filter(criteria => invalidCategories.includes(criteria.categoryId));
      const invalidCriteriaIds = invalidCriteria.map(criteria => criteria.id);
      setInvalidCriteriaIds(invalidCriteriaIds);
      document.body.style.cursor = 'default';
      setIsLoading(false);
      return;
    }

    try {
      const scores = categoryList.flatMap(category =>
        criteriaList.filter(criteria => criteria.categoryId === category.id).map(criteria => criteriaScoreList[criteria.id])
      );
      const opinion = { projectId: selectedProject, expertId: loggedExpertId, scores: scores, text: text, conclusion: conclusion };
      await axios.post(serverPath + "/opinion/change", opinion, { auth: basicAuth });

      setSelectedProject("");
      setText("");
      setCriteriaScoreList({});
      setConclusion(false);
      setInvalidCriteriaIds([]);
    } catch (error) {
      alert("Ошибка при отправке экспертного заключения");
    }
    document.body.style.cursor = 'default';
    setIsLoading(false);
  };

  return (
    <div>
      <EditOpinionInstructionForm />
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="first">Эксперт: {expertName}</h3>
          <h3>Автор: {selectedProject && projectList.find(project => project.id == selectedProject)?.author}</h3>
          <h3>Тема:</h3>
          <select required value={selectedProject} onChange={handleProjectChange}>
            <option value="">Выберите тему проекта</option>
            {projectList.map((project) => (
              <option key={project.id} value={project.id}>{project.theme}</option>
            ))}
          </select>
        </div>
        <InputCriteriaTable
          criteriaList={criteriaList}
          categoryList={categoryList}
          invalidCriteriaIds={invalidCriteriaIds}
          criteriaScoreList={criteriaScoreList}
          setCriteriaScoreList={setCriteriaScoreList} />
        <div>
          <h2>Заключение эксперта</h2>
          <textarea maxLength={512} value={text} onChange={(event) => setText(event.target.value)} />
        </div>
        <div>
          <h2>Выводы</h2>
          <div className="radio">
            <input type="radio" name="support" value="true" onChange={() => setConclusion(true)} checked={conclusion === true} />
            <label className="light"> проект заслуживает безусловной поддержки, допустить к финальной презентационной сессии</label>
          </div>
          <div className="radio">
            <input type="radio" name="support" value="false" onChange={() => setConclusion(false)} checked={conclusion === false} />
            <label className="light"> проект не заслуживает поддержки</label>
          </div>
        </div>
        <button disabled={isLoading} type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default EditOpinionForm;