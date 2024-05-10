import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import AddProjectForm from "../../../components/forms/project/AddProjectForm";
import EditProjectForm from "../../../components/forms/project/EditProjectForm";
import DeleteProjectForm from "../../../components/forms/project/DeleteProjectForm";
import ViewProjectForm from "../../../components/forms/project/ViewProjectForm";

const ProjectManagePage = () => {
  const [projectEditList, setProjectEditList] = useState([]);
  const [projectDeleteList, setProjectDeleteList] = useState([]);
  const [yearList, setYearList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/project";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchYears = async () => {
    try {
      const response = await axios.get(serverPath, { auth: basicAuth });
      setYearList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка годов");
    }
  };

  const fetchProjectsByYearEdit = async (year) => {
    try {
      const response = await axios.get(serverPath + "/edit?year=" + year, { auth: basicAuth });
      setProjectEditList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка проектов для изменения");
    }
  };

  const fetchProjectsByYearDelete = async (year) => {
    try {
      const response = await axios.get(serverPath + "/edit?year=" + year, { auth: basicAuth });
      setProjectDeleteList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка проектов для удаления");
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <div>
      <AdminHeader />
      <ViewProjectForm />
      <AddProjectForm
        fetchProjectsByYearEdit={fetchProjectsByYearEdit}
        fetchProjectsByYearDelete={fetchProjectsByYearDelete}
        fetchYears={fetchYears} />
      <EditProjectForm
        projectEditList={projectEditList}
        yearList={yearList}
        fetchProjectsByYearEdit={fetchProjectsByYearEdit}
        fetchYears={fetchYears}
      />
      <DeleteProjectForm
        projectDeleteList={projectDeleteList}
        yearList={yearList}
        fetchProjectsByYearDelete={fetchProjectsByYearDelete}
        fetchYears={fetchYears}
      />
    </div>
  );
};

export default ProjectManagePage;