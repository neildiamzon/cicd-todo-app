import './App.css'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import RegistrationForm from './pages/RegistrationForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const isAuthenticated = localStorage.getItem("authtoken") !== null

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main-page/*" element={isAuthenticated ? <MainPage /> : <Login/>}/>
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
    </Router>
  )
}

export default App
