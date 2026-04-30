import { useState } from "react";
import Dash_Survey from "../image/activeSurvey.png";
import Plan_Project from "../image/projectPlanner.png";
import plus from "../image/Plus.png";
import DashboardSurveycard from "./DashboardSurveycard";
import { useNavigate } from "react-router-dom";

const DashboardSurveyPlan = () => {
  const navigate = useNavigate();

  const [surveyPlan] = useState([
    {
      id: 1,
      titles: "new survey recommendation",
      description:
        "define survey areas, analyze terrain and get AI powered method recommendation",
      photo: Dash_Survey,
      icon: plus,
      content: "start survey",
      linking: "/dashboard/survey", // ✅ route path
    },
    {
      id: 2,
      titles: "new project planner",
      description:
        "manage survey execution using agile scrum methodology with sprint planning",
      photo: Plan_Project,
      icon: plus,
      content: "create project planner",
      linking: "/dashboard/project/1", // ✅ route path
    },
  ]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="md:flex flex-shrink space-4 py-4 items-center">
      <DashboardSurveycard
        surveyDetails={surveyPlan}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default DashboardSurveyPlan;