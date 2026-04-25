
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store/store';
import './App.css';
import { Navigate } from "react-router-dom";
import LandingPage from './Fontend Component/Landing page/LandingPage';
import SignUpApp from './Fontend Component/Register page/SignUpApp';
import MainLogin from './Fontend Component/Login page/MainLogin';
import Sidebar from "./Backend Component/Side Navbar/Sidebar";


function App() {
  return (
   
    <>
    {/* <SecondSurveyContaine /> */}
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUpApp />} />
        <Route path="/login" element={<MainLogin />} />

        {/* Dashboard + Sidebar Container */}
        <Route path="/dashboard/*" element={ <Sidebar /> } />
        {/* Redirect old planner URL to new dashboard project route */}
        <Route path="/dashboard/planner/2" element={<Navigate to="/dashboard/project/2" replace />} />
        {/* <Route path="/dashboard/my-projects" element={<Navigate to="/dashboard/my-project" replace />} /> */}

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    {/* <UseStoryModal /> */}
    </>
   
  );
}

export default App;