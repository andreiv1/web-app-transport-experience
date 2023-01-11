import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AddExperiencePage from "./pages/AddExperiencePage.jsx";
import EditExperiencePage from "./pages/EditExperiencePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import Logout from "./components/Logout.jsx";

import Auth from "./components/Auth.jsx";
import UserExperiencesPage from "./pages/UserExperiencesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES, ANYONE CAN ACCESS THEM */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* PRIVATE ROUTES, ONLY IF USER IS AUTH */}
        <Route element={<Auth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addExperience" element={<AddExperiencePage />} />
          <Route path="/experiences/:userId" element={<UserExperiencesPage />} />
          <Route path="/editExperience/:id" element={<EditExperiencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
