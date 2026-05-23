import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AppLayout from './components/layout/AppLayout';
import Candidates from './pages/Candidates';
import Users from './pages/Users';
import Profile from './pages/Profile';
import VotingPortal from './pages/VotingPortal';
import { AuthProvider } from './utlis/AuthProvider';

const App = () => {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<SignupPage/>} />

          {/* Protected/Layout Routes */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Dashboard/>} />
            <Route path="/candidates" element={<Candidates/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/voting" element={<VotingPortal/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
