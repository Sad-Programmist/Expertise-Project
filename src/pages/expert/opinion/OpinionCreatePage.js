import React, { useState, useEffect } from "react";
import axios from "axios";
import OpinionCreateDto from "../../admin/dto/OpinionCreateDto";
import ExpertHeader from "../../../components/ExpertHeader";

const OpinionCreatePage = () => {
    const [projectList, setProjectList] = useState([]);
    const [expertName, setExpertName] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedProject, setSelectedProjectTheme] = useState("");
    const [opinion, setOpinion] = useState("");
    const [criteriaScores, setCriteriaScores] = useState({});
    const [support, setSupport] = useState(false);
    const [invalidCriteriaIds, setInvalidCriteriaIds] = useState([]);
    const loggedExpertId = localStorage.getItem("loggedExpertId");

    const serverPath = process.env.REACT_APP_SERVER_PATH;
    const basicAuth = {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD
    };

    useEffect(() => {
        fetchProjectThemes();
        fetchCategory();
        fetchCriteria();
        fetchExpertName();
    }, []);

    const fetchProjectThemes = async () => {
        try {
            const year = new Date().getFullYear();
            const response = await axios.get(serverPath + "/opinion/create?expertId=" + loggedExpertId + "&year=" + year, { auth: basicAuth });
            setProjectList(response.data);
        } catch (error) {
            alert("Ошибка загрузки проектов");
        }
    };

    const fetchCriteria = async () => {
        try {
            const response = await axios.get(serverPath + "/criteria/edit", { auth: basicAuth });
            setCriteriaList(response.data);
        } catch (error) {
            alert("Ошибка загрузки списка критериев");
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get(serverPath + "/category/edit", { auth: basicAuth });
            setCategoryList(response.data);
        } catch (error) {
            alert("Ошибка загрузки списка категорий");
        }
    };

    const fetchExpertName = async () => {
        try {
            const response = await axios.get(serverPath + "/expert?expertId=" + loggedExpertId, { auth: basicAuth });
            setExpertName(response.data.name);
        } catch (error) {
            alert("Ошибка загрузки эксперта");
        }
    };

    const handleProjectChange = (event) => {
        setSelectedProjectTheme(event.target.value);
    };

    const handleCriteriaScoreChange = (criterionId, event) => {
        const value = event.target.value;
        setCriteriaScores((prevScores) => ({
            ...prevScores,
            [criterionId]: value,
        }));
    };

    const validateCategoryScores = () => {
        const invalidCategories = [];

        categoryList.forEach(category => {
            const criteriaInCategory = criteriaList.filter(criteria => criteria.categoryId === category.id);
            const categoryScores = criteriaInCategory.reduce((total, criteria) => {
                return total + parseInt(criteriaScores[criteria.id] || 0);
            }, 0);

            if (categoryScores < category.minsum || categoryScores > category.maxsum) {
                invalidCategories.push(category.id);
            }
        });

        return invalidCategories;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const invalidCategories = validateCategoryScores();

        if (invalidCategories.length > 0) {
            alert("Сумма баллов в выделенных категориях превышает максимально возможную сумму");
            const invalidCriteria = criteriaList.filter(criteria => invalidCategories.includes(criteria.categoryId));
            const invalidCriteriaIds = invalidCriteria.map(criteria => criteria.id);
            setInvalidCriteriaIds(invalidCriteriaIds);
            return;
        }

        try {
            const scores = categoryList.flatMap(category =>
                criteriaList.filter(criteria => criteria.categoryId === category.id).map(criteria => criteriaScores[criteria.id])
            );
            const opinionDto = new OpinionCreateDto(selectedProject, loggedExpertId, scores, opinion, support);
            await axios.post(serverPath + "/opinion/create", opinionDto, { auth: basicAuth });

            setSelectedProjectTheme("");
            setOpinion("");
            setCriteriaScores({});
            setSupport(false);
            setInvalidCriteriaIds([]);
        } catch (error) {
            alert("Ошибка при отправке экспертного заключения");
        }
    };

    return (
        <div>
            <ExpertHeader />
            <form>
                <h2>Добавление экспертного заключения на идею инновационного проекта</h2>
                <p>Чтобы добавить новое экспертное заключение в выпадающем списке по теме проекта выберите проект, который собираетесь оценить.
                    Данные об авторе проекта заполнятся автоматически. <br /> <br />
                    Далее заполните таблицу критериев, заключение эксперта и выберите один из вариантов вывода по проекту.
                    Учитывайте, что у каждой категории есть максимальная сумма баллов. Если сумма будет превышена, появится сообщение об ошибке и неправильно заполненная категория будет подсвечена красным цветом. <br /> <br />
                    После того.как все данные будут заполнены, нажмите кнопку "Отправить", чтобы новое экспертное заключение было сохранено. <br /> <br />
                    Внимание! Все поля должны быть заполнены!
                </p>
            </form>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3 className="first">Эксперт: {expertName}</h3>
                    <h3>Автор: {selectedProject && projectList.find(project => project.id == selectedProject)?.participants}</h3>
                    <h3>Тема:</h3>
                    <select required value={selectedProject} onChange={handleProjectChange}>
                        <option value="">Выберите тему проекта</option>
                        {projectList.map((project) => (
                            <option key={project.id} value={project.id}>{project.theme}</option>
                        ))}
                    </select>
                </div>
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
                                                    value={criteriaScores[criteria.id] || ""}
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
                <div>
                    <h2>Заключение эксперта</h2>
                    <textarea maxLength={512} value={opinion} onChange={(event) => setOpinion(event.target.value)} />
                </div>
                <div>
                    <h2>Выводы</h2>
                    <div className="radio">
                        <input type="radio" name="support" value="true" onChange={() => setSupport(true)} checked={support === true} />
                        <label className="light"> проект заслуживает безусловной поддержки, допустить к финальной презентационной сессии</label>
                    </div>
                    <div className="radio">
                        <input type="radio" name="support" value="false" onChange={() => setSupport(false)} checked={support === false} />
                        <label className="light"> проект не заслуживает поддержки</label>
                    </div>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default OpinionCreatePage;
