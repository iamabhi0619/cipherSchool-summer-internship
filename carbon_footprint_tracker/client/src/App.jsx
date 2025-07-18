import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ActivityFormPage from "./pages/ActivityFormPage";
import GoalsPage from "./pages/GoalsPage";
import AchievementsPage from "./pages/AchievementsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";
import Toaster from "./components/ui/Toaster";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/log-activity" element={<ActivityFormPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
