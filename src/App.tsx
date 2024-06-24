import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import EntantStudents from "./pages/EntantStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/entrant_students" element={<EntantStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
