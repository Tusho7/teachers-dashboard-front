import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import EntantStudents from "./pages/EntantStudents";
import AbroadStudents from "./pages/AbroadStudents";
import AllStudents from "./pages/AllStudents";
import { useUser } from "./contexts/useUser";
import PersonalCabinet from "./pages/PersonalCabinet";
import Settings from "./pages/Settings";
import { NotificationProvider } from "./contexts/NotificationContext";
import WebSocketProvider from "./utils/WebSocketProvider";
import AddStudent from "./pages/AddStudent";
import Registration from "./pages/Registration";

function App() {
  const { user } = useUser();

  return (
    <NotificationProvider>
      <WebSocketProvider />
      <div>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/admin_dashboard" element={<Home />} />
              <Route path="/entrant_students" element={<EntantStudents />} />
              <Route path="/abroad_students" element={<AbroadStudents />} />
              <Route path="/students" element={<AllStudents />} />
              <Route path="/personal_cabinet" element={<PersonalCabinet />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/add_student" element={<AddStudent />} />
            </>
          ) : (
            <>
              <Route path="/login-admin" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </>
          )}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/login-admin" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login-admin" replace />} />
        </Routes>
      </div>
    </NotificationProvider>
  );
}

export default App;
