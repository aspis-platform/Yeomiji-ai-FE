import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SurveyProvider } from "./context/SurveyContext";
import AiChat from "./pages/AiChat";
import Survey from './pages/Survey';
import Result from './pages/Result';
import AdoptionForm from './pages/AdoptionForm';
import AdoptionSuccess from './pages/AdoptionSuccess';

// 관리자 페이지 컴포넌트
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdoptionDetail from './pages/admin/AdoptionDetail';

function App() {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AiChat />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/result" element={<Result />} />
          <Route path="/adoption-form" element={<AdoptionForm />} />
          <Route path="/adoption-success" element={<AdoptionSuccess />} />
          
          {/* 관리자 페이지 라우팅 */}
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/adoptions/:id" element={<AdoptionDetail />} />
        </Routes>
      </Router>
    </SurveyProvider>
  );
}

export default App;
