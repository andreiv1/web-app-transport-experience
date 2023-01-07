import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AddExperiencePage from './pages/AddExperiencePage.jsx'
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage.jsx'
import SignupPage from './pages/SignupPage/SignupPage.jsx';

import Logout from './components/Logout.jsx';

import Auth from './components/Auth.jsx';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate replace to='/home' />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<Auth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/addExperience" element={<AddExperiencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
