import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/auth/AuthPage.js";
import ExpertPage from "./pages/expert/ExpertPage.js";
import OpinionCreatePage from "./pages/expert/opinion/OpinionCreatePage.js";
import OpinionChangePage from "./pages/expert/opinion/OpinionChangePage.js";
import AdminPage from "./pages/admin/AdminPage";
import ProjectEditPage from "./pages/admin/project/ProjectEditPage.js";
import ProjectViewPage from "./pages/admin/project/ProjectViewPage.js";
import ExpertEditPage from "./pages/admin/expert/ExpertEditPage.js";
import ExpertViewPage from "./pages/admin/expert/ExpertViewPage.js";
import AdminEditPage from "./pages/admin/AdminEditPage.js";
import RatingPage from "./pages/admin/RatingPage.js";
import CriteriaEditPage from "./pages/admin/criteria/CriteriaEditPage.js";
import CriteriaViewPage from "./pages/admin/criteria/CriteriaViewPage.js";
import CategoryEditPage from "./pages/admin/criteria/CategoryEditPage.js";
import CriteriaTableEditPage from "./pages/admin/criteria/CriteriaTableEditPage.js";
import "./Page.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route path="/expert" element={<ExpertPage />} />
        <Route path="/expert/create" element={<OpinionCreatePage />} />
        <Route path="/expert/change" element={<OpinionChangePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/project" element={<ProjectEditPage />} />
        <Route path="/admin/project/view" element={<ProjectViewPage />} />
        <Route path="/admin/expert" element={<ExpertEditPage />} />
        <Route path="/admin/expert/view" element={<ExpertViewPage />} />
        <Route path="/admin/admin" element={<AdminEditPage />} />
        <Route path="/admin/rating" element={<RatingPage />} />
        <Route path="/admin/criteria/criteria" element={<CriteriaEditPage />} />
        <Route path="/admin/criteria/category" element={<CategoryEditPage />} />
        <Route path="/admin/criteria/view" element={<CriteriaViewPage />} />
        <Route path="/admin/criteria" element={<CriteriaTableEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
