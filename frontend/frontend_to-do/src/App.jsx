import './App.css'
import Login from './pages/Login.jsx'
import MainPage from './pages/MainPage.jsx'
import RegistrationForm from './pages/RegistrationForm.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
        <AppRoutes />
    </Router>
  )
}

function AppRoutes() {
  const navigate = useNavigate(); // useNavigate inside Router context
  const isAuthenticated = localStorage.getItem("authtoken") !== null;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main-page');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main-page" element={isAuthenticated ? <MainPage /> : <Login />} />
      <Route path="/registration" element={<RegistrationForm />} />
    </Routes>
  );
}

export default App
