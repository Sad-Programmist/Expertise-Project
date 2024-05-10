import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader";
import ViewExpertForm from "../../../components/forms/expert/ViewExpertForm";
import AddExpertForm from "../../../components/forms/expert/AddExpertForm";
import EditExpertForm from "../../../components/forms/expert/EditExpertForm";
import DeleteExpertForm from "../../../components/forms/expert/DeleteExpertForm";

const ExpertManagePage = () => {
  const [expertList, setExpertList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/expert";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchExperts = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setExpertList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка экспертов");
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <div>
      <AdminHeader />
      <ViewExpertForm />
      <AddExpertForm
        fetchExperts={fetchExperts} />
      <EditExpertForm
        expertList={expertList}
        fetchExperts={fetchExperts} />
      <DeleteExpertForm
        expertList={expertList}
        fetchExperts={fetchExperts} />
    </div>
  );
};

export default ExpertManagePage;