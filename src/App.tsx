import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AiChat from "./page/AiChat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AiChat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
