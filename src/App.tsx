import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AiChat from "./page/AiChat";
import { SurveyProvider } from "./context/SurveyContext";

function App() {
  console.log('App rendering');
  return (
    <>
      <SurveyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AiChat />} />
          </Routes>
        </BrowserRouter>
      </SurveyProvider>
    </>
  );
}

export default App;
