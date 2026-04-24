import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import SidebarConnectivity from "./SidebarConnectivity";
import DashboardContainer from "../asset/DashboardContainer";
import Setting from "../../Setting/Setting";

// Survey Components
import SurveyContainer from "../survey recommendation/SurveyContainer";

// Project Components
import MyProjectData from "../../Fontend Component/MyProject/MyProjectData";

// Planner Components
import ProjectPlannerValidation from "../../Project-Planner/ProjectPlannerValidation";
import SecondProjectPlannerValidation from "../../Project-Planner/SecondProjectPlannerValidation";
import FifthProjectPlannerValidation from "../../Project-Planner/fifth project planner/FifthProjectPlannerValidation";
import ProjectFinalPlanner from "../../Project-Planner/fifth project planner/ProjectFinalPlanner";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SidebarContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/dashboard/survey")) setActiveMenu("survey recommendation");
    else if (path.startsWith("/dashboard/my-project")) setActiveMenu("my project");
    else if (path.startsWith("/dashboard/project")) setActiveMenu("project planner");
    else if (path.startsWith("/dashboard/setting")) setActiveMenu("setting");
    else if (path === "/dashboard") setActiveMenu("dashboard");
  }, [location.pathname]);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setIsSidebarOpen(false);

    if (menuName === "dashboard") navigate("/dashboard");
    if (menuName === "my project") navigate("/dashboard/my-project");

    // 🔴 FIXED: must include ID + step
    if (menuName === "survey recommendation")
      navigate("/dashboard/survey/1");

    if (menuName === "project planner")
      navigate("/dashboard/project/1");

    if (menuName === "setting") navigate("/dashboard/setting");
    if (menuName === "logout") navigate("/", { replace: true });
  };

  /*** PROJECT PLANNER FLOW ***/
  const ProjectPlannerFlow = () => {
    const { step } = useParams();
    const plannerStep = parseInt(step, 5) || 1;

    const goToNextProjectStep = (step = null) => {
      const nextStep = step !== null ? step : plannerStep + 1;
      navigate(`/dashboard/project/${nextStep}`);
    };

    return (
      <>
        {plannerStep === 1 && <ProjectPlannerValidation onNext={goToNextProjectStep} />}
        {plannerStep === 2 && <SecondProjectPlannerValidation onNext={goToNextProjectStep} />}
        {plannerStep === 3 && <FifthProjectPlannerValidation onNext={goToNextProjectStep} />}
        {plannerStep === 4 && <ProjectFinalPlanner onNext={goToNextProjectStep} />}
      </>
    );
  };

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen bg-[#EBEBEB] pt-[32px] md:pl-[13px] pr-[1px] border">
        <SidebarConnectivity onMenuClick={handleMenuClick} activeMenu={activeMenu} />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Mobile icon */}
        <div className="md:hidden pl-4 border-b">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSidebar}
            className="text-[24px] cursor-pointer"
          />
        </div>

        <Routes>
          <Route path="" element={<DashboardContainer />} />
          <Route path="my-project" element={<MyProjectData />} />
          <Route path="setting" element={<Setting />} />

          {/* 🔴 FIXED ROUTES */}
          <Route path="survey/:step" element={<SurveyContainer />} />

          <Route path="project" element={<ProjectPlannerFlow />} />
          <Route path="project/:step" element={<ProjectPlannerFlow />} />

          <Route path="*" element={<DashboardContainer />} />
        </Routes>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <>
            <div onClick={toggleSidebar} className="fixed inset-0 bg-black/40 z-40" />
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#EBEBEB] z-50">
              <FontAwesomeIcon icon={faXmark} onClick={toggleSidebar} />
              <SidebarConnectivity
                onMenuClick={handleMenuClick}
                activeMenu={activeMenu}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}