import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import EntantStudents from "./pages/EntantStudents";
import AbroadStudents from "./pages/AbroadStudents";
import AllStudents from "./pages/AllStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin_dashboard" element={<Home />} />
        <Route path="/entrant_students" element={<EntantStudents />} />
        <Route path="/abroad_students" element={<AbroadStudents />} />
        <Route path="/students" element={<AllStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
