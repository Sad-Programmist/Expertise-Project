import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ExpertMenuPage from "./pages/expert/ExpertMenuPage";
import OpinionCreatePage from "./pages/expert/opinion/OpinionCreatePage";
import OpinionEditPage from "./pages/expert/opinion/OpinionEditPage";
import OpinionViewPage from "./pages/expert/opinion/OpinionViewPage";
import OpinionViewTablePage from "./pages/expert/opinion/OpinionViewTablePage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import ProjectManagePage from "./pages/admin/project/ProjectManagePage";
import ProjectViewPage from "./pages/admin/project/ProjectViewPage";
import ExpertManagePage from "./pages/admin/expert/ExpertManagePage";
import ExpertViewPage from "./pages/admin/expert/ExpertViewPage";
import AdminManagePage from "./pages/admin/admin/AdminManagePage";
import AdminOpinionViewPage from "./pages/admin/opinion/AdminOpinionViewPage";
import RatingViewPage from "./pages/admin/rating/RatingViewPage";
import CriteriaManagePage from "./pages/admin/criteria/CriteriaManagePage";
import CriteriaViewPage from "./pages/admin/criteria/CriteriaViewPage";
import CategoryManagePage from "./pages/admin/criteria/CategoryManagePage";
import CriteriaMenuPage from "./pages/admin/criteria/CriteriaMenuPage";
import "./style.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route path="/expert" element={<ProtectedRoute><ExpertMenuPage /></ProtectedRoute>} />
        <Route path="/expert/create" element={<ProtectedRoute><OpinionCreatePage /></ProtectedRoute>} />
        <Route path="/expert/change" element={<ProtectedRoute><OpinionEditPage /></ProtectedRoute>} />
        <Route path="/expert/view" element={<ProtectedRoute><OpinionViewPage /></ProtectedRoute>} />
        <Route path="/expert/view/table" element={<ProtectedRoute><OpinionViewTablePage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminMenuPage /></ProtectedRoute>} />
        <Route path="/admin/project" element={<ProtectedRoute><ProjectManagePage /></ProtectedRoute>} />
        <Route path="/admin/project/view" element={<ProtectedRoute><ProjectViewPage /></ProtectedRoute>} />
        <Route path="/admin/expert" element={<ProtectedRoute><ExpertManagePage /></ProtectedRoute>} />
        <Route path="/admin/expert/view" element={<ProtectedRoute><ExpertViewPage /></ProtectedRoute>} />
        <Route path="/admin/admin" element={<ProtectedRoute><AdminManagePage /></ProtectedRoute>} />
        <Route path="/admin/opinion" element={<ProtectedRoute><AdminOpinionViewPage /></ProtectedRoute>} />
        <Route path="/admin/rating" element={<ProtectedRoute><RatingViewPage /></ProtectedRoute>} />
        <Route path="/admin/criteria/criteria" element={<ProtectedRoute><CriteriaManagePage /></ProtectedRoute>} />
        <Route path="/admin/criteria/category" element={<ProtectedRoute><CategoryManagePage /></ProtectedRoute>} />
        <Route path="/admin/criteria/view" element={<ProtectedRoute><CriteriaViewPage /></ProtectedRoute>} />
        <Route path="/admin/criteria" element={<ProtectedRoute><CriteriaMenuPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
