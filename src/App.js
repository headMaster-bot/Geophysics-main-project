
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import store from './redux/store/store';
// import './App.css';
// import { Navigate } from "react-router-dom";
// import LandingPage from './Fontend Component/Landing page/LandingPage';
// import SignUpApp from './Fontend Component/Register page/SignUpApp';
// import MainLogin from './Fontend Component/Login page/MainLogin';
// import Sidebar from "./Backend Component/Side Navbar/Sidebar";


// function App() {
//   return (
   
//     <>
//     {/* <SecondSurveyContaine /> */}
//     <Router>
//       <Routes>
//         {/* Public Pages */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register" element={<SignUpApp />} />
//         <Route path="/login" element={<MainLogin />} />

//         {/* Dashboard + Sidebar Container */}
//         <Route path="/dashboard/*" element={ <Sidebar /> } />
//         {/* Redirect old planner URL to new dashboard project route */}
//         <Route path="/dashboard/planner/1" element={<Navigate to="/dashboard/project/1" replace />} />
//         {/* <Route path="/dashboard/my-projects" element={<Navigate to="/dashboard/my-project" replace />} /> */}

//         {/* Redirect unknown paths */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//     {/* <UseStoryModal /> */}
//     </>
   
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import LandingPage from './Fontend Component/Landing page/LandingPage';
import SignUpApp from './Fontend Component/Register page/SignUpApp';
import MainLogin from './Fontend Component/Login page/MainLogin';
import Sidebar from "./Backend Component/Side Navbar/Sidebar";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUpApp />} />
        <Route path="/login" element={<MainLogin />} />

        {/* DASHBOARD */}
        <Route path="/dashboard/*" element={<Sidebar />} />

        {/* 🔥 FIXED REDIRECT (OLD → NEW STRUCTURE) */}
        <Route
          path="/dashboard/planner/1"
          element={
            <Navigate
              to="/dashboard/project/defaultId/1"
              replace
            />
          }
        />

        {/* OPTIONAL: HANDLE OLD PROJECT ROUTE */}
        <Route
          path="/dashboard/project/1"
          element={
            <Navigate
              to="/dashboard/project/defaultId/1"
              replace
            />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;