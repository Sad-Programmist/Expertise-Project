import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../../components/headers/AdminHeader"
import AddAdminForm from "../../../components/forms/admin/AddAdminForm"
import DeleteAdminForm from "../../../components/forms/admin/DeleteAdminForm";

const AdminEditPage = () => {
  const [adminList, setAdminList] = useState([]);

  const serverPath = process.env.REACT_APP_SERVER_PATH + "/admin";
  const basicAuth = { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(serverPath + "/edit", { auth: basicAuth });
      setAdminList(response.data);
    } catch (error) {
      alert("Ошибка загрузки списка организаторов");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);


  return (
    <div>
      <AdminHeader />
      <AddAdminForm
        fetchAdmins={fetchAdmins} />
      <DeleteAdminForm
        adminList={adminList}
        fetchAdmins={fetchAdmins} />
    </div>
  );
};

export default AdminEditPage;