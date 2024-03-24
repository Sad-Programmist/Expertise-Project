import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpertHeader from "../../../components/ExpertHeader";

const OpinionViewPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [expertName, setExpertName] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedProject, setSelectedProjectTheme] = useState("");
    const [opinion, setOpinion] = useState("");
    const [criteriaScores, setCriteriaScores] = useState({});
    const [support, setSupport] = useState(false);
    const loggedExpertId = localStorage.getItem("loggedExpertId");

    const serverPath = process.env.REACT_APP_SERVER_PATH;
    const basicAuth = {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD
    };

    useEffect(() => {
        fetchProjectThemes();
        fetchCategories();
        fetchCriteria();
        fetchExpertName();
    }, []);

    const fetchProjectThemes = async () => {
        try {
            const year = new Date().getFullYear();
            const response = await axios.get(serverPath + "/opinion/change?expertId=" + loggedExpertId + "&year=" + year, { auth: basicAuth });
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

    const fetchCategories = async () => {
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

    const handleProjectChange = async (event) => {
        setSelectedProjectTheme(event.target.value);
        try {
            const response = await axios.get(serverPath + "/opinion?expertId=" + loggedExpertId + "&projectId=" + event.target.value, { auth: basicAuth });
            const { projectName, expertName, scores, text, conclusion } = response.data;
            setOpinion(text);
            const newCriteriaScores = {};
            criteriaList.forEach((criteria, index) => {
                newCriteriaScores[criteria.id] = scores[index] || "0";
            });

            setCriteriaScores(newCriteriaScores);
            setSupport(conclusion);

        } catch (error) {
            alert("Ошибка загрузки данных");
        }
    };

    return (
        <div>
            <ExpertHeader />
            <form>
                <h2>Просмотр экспертного заключения на идею инновационного проекта</h2>
                <p>Для просмотра экспертного заключения в выпадающем списке по теме проекта выберите проект, экспертное заключение по которому собираетесь посмотреть.</p>
            </form>
            <form>
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
                                        <tr key={criteria.id}>
                                            <td>{`${category.number}.${criteria.number}`}</td>
                                            <td>{criteria.text}</td>
                                            <td>{criteriaScores[criteria.id] !== undefined ? criteriaScores[criteria.id] : ""}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Заключение эксперта</h2>
                    <textarea disabled maxLength={512} value={opinion} />
                </div>
                <div>
                    <h2>Выводы</h2>
                    <div className="radio">
                        <input disabled type="radio" name="support" value="true" checked={support === true} />
                        <label className="light"> проект заслуживает безусловной поддержки, допустить к финальной презентационной сессии</label>
                    </div>
                    <div className="radio">
                        <input disabled type="radio" name="support" value="false" checked={support === false} />
                        <label className="light"> проект не заслуживает поддержки</label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OpinionViewPage;
