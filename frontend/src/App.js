import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AddExperiencePage from "./pages/AddExperiencePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";

import Logout from "./components/Logout.jsx";

import Auth from "./components/Auth.jsx";
import MyExperiencesPage from "./pages/MyExperiencePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditExperiencePage from "./pages/EditExperiencePage.jsx";

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
          <Route path="/myExperiences" element={<MyExperiencesPage />} />
          <Route path="/editExperience/:id" element={<EditExperiencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
