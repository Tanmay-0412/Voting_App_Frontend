import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<SignupPage/>} />
        <Route path="/home" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
