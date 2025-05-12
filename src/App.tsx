import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "./context/SurveyContext";
import AiChat from "./page/AiChat";
import Survey from './pages/Survey';
import Result from './pages/Result';
import AdoptionForm from './pages/AdoptionForm';
import AdoptionSuccess from './pages/AdoptionSuccess';

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
        </Routes>
      </Router>
    </SurveyProvider>
  );
}

export default App;
