import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader";

const OpinionViewPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [expertList, setExpertList] = useState([]);
    const [criteriaList, setCriteriaList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState("");
    const [selectedProject, setSelectedProjectTheme] = useState("");
    const [opinion, setOpinion] = useState("");
    const [criteriaScores, setCriteriaScores] = useState({});
    const [support, setSupport] = useState(false);

    const serverPath = process.env.REACT_APP_SERVER_PATH;
    const basicAuth = {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD
    };

    useEffect(() => {
        fetchCategories();
        fetchCriteria();
        fetchExperts();
    }, []);

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

    const fetchExperts = async () => {
        try {
            const response = await axios.get(serverPath + "/expert/edit", { auth: basicAuth });
            setExpertList(response.data);
        } catch (error) {
            alert("Ошибка загрузки экспертов");
        }
    };

    const handleProjectChange = async (event) => {
        setSelectedProjectTheme(event.target.value);
        try {
            const response = await axios.get(serverPath + "/opinion?expertId=" + selectedExpert + "&projectId=" + event.target.value, { auth: basicAuth });
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

    const handleExpertChange = async (event) => {
        setSelectedExpert(event.target.value);
        if (event.target.value === "") {
            setSelectedProjectTheme("");
            setOpinion("");
            const newCriteriaScores = {};
            criteriaList.forEach(criteria => {
                newCriteriaScores[criteria.id] = 0;
            });
            setCriteriaScores(newCriteriaScores);
            setSupport(false);
            return;
        }
        try {
            const year = new Date().getFullYear();
            const response = await axios.get(serverPath + "/opinion/change?expertId=" + event.target.value + "&year=" + year, { auth: basicAuth });
            setProjectList(response.data);
            setSelectedProjectTheme("");
        } catch (error) {
            alert("Ошибка загрузки проектов");
        }
    };

    return (
        <div>
            <AdminHeader />
            <form>
                <h2>Просмотр экспертного заключения на идею инновационного проекта</h2>
                <p>Для просмотра экспертного заключения сначала в выпадающем списке по ФИО эксперта выберите эксперта, заключения которого собираетесь помотреть.
                    Потом в выпадающем списке по теме проекта выберите проект, экспертное заключение по которому собираетесь посмотреть.
                </p>
            </form>
            <form>
                <div>
                    <h3 className="first">Эксперт: </h3>
                    <select required value={selectedExpert} onChange={handleExpertChange}>
                        <option value="">Выберите эксперта</option>
                        {expertList.map((expert) => (
                            <option key={expert.id} value={expert.id}>{expert.name}</option>
                        ))}
                    </select>
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
