import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import ExpertPage from "./pages/expert/ExpertPage";
import OpinionCreatePage from "./pages/expert/opinion/OpinionCreatePage";
import OpinionChangePage from "./pages/expert/opinion/OpinionChangePage";
import OpinionViewPage from "./pages/expert/opinion/OpinionViewPage";
import AdminPage from "./pages/admin/AdminPage";
import ProjectEditPage from "./pages/admin/project/ProjectEditPage";
import ProjectViewPage from "./pages/admin/project/ProjectViewPage";
import ExpertEditPage from "./pages/admin/expert/ExpertEditPage";
import ExpertViewPage from "./pages/admin/expert/ExpertViewPage";
import AdminEditPage from "./pages/admin/AdminEditPage";
import AdminOpinionViewPage from "./pages/admin/AdminOpinionViewPage";
import RatingPage from "./pages/admin/RatingPage";
import CriteriaEditPage from "./pages/admin/criteria/CriteriaEditPage";
import CriteriaViewPage from "./pages/admin/criteria/CriteriaViewPage";
import CategoryEditPage from "./pages/admin/criteria/CategoryEditPage";
import CriteriaTableEditPage from "./pages/admin/criteria/CriteriaTableEditPage";
import "./Page.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route path="/expert" element={<ExpertPage />} />
        <Route path="/expert/create" element={<OpinionCreatePage />} />
        <Route path="/expert/change" element={<OpinionChangePage />} />
        <Route path="/expert/view" element={<OpinionViewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/project" element={<ProjectEditPage />} />
        <Route path="/admin/project/view" element={<ProjectViewPage />} />
        <Route path="/admin/expert" element={<ExpertEditPage />} />
        <Route path="/admin/expert/view" element={<ExpertViewPage />} />
        <Route path="/admin/admin" element={<AdminEditPage />} />
        <Route path="/admin/opinion" element={<AdminOpinionViewPage />} />
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
