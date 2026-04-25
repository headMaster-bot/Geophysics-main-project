import React from 'react'
import MyProject from './MyProject'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateSurveyStatusAction,
  fetchDraftAction
} from '../../redux/slice/survey/surveySlice'
import {
  fetchProjectDraftAction
} from '../../redux/slice/project/projectSlice'

export default function MyProjectData() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector(state => state?.users);

  const surveydata = profile?.message?.survey || [];
  const projectdata = profile?.message?.projects || [];

  /** ✅ Update status */
  const handleStatusUpdate = (id, status) => {
    dispatch(updateSurveyStatusAction({
      surveyId: id,
      status
    }));
  };

  /** ✅ Open draft (FIXED ROUTES) */
  const handleOpenDraft = async (id, type = "survey", status = "draft") => {
    try {
      if (type === "survey") {
        await dispatch(fetchDraftAction(id)).unwrap();
        navigate(`/dashboard/survey/${id}/1`); // ✅ FIX
      }

      if (type === "project") {
        await dispatch(fetchProjectDraftAction(id)).unwrap();
        navigate(`/dashboard/project/${id}/1`); // ✅ FIX
      }

    } catch (err) {
      console.log(`Error fetching ${type}:`, err);
    }
  };

  /** ✅ Combine survey + project */
  const combinedData = [...surveydata, ...projectdata];

  /** ✅ Normalize data */
  const projectData = combinedData.map((item) => ({
    id: item._id,

    title:
      item.type === "survey"
        ? item.surveyName  
        : item.projectName,

    status: item.status,
    type: item.type,
    timeStamp: item.createdAt,

    objective:
      item.type === "survey"
        ? item.surveyObjective
        : "Project Planning",

    content: item.description,

    buttonContent:
      item.type === "survey"
        ? item.status === "draft"
          ? "Open Survey Draft"
          : "Open Survey"
        : item.status === "draft"
          ? "Open Project Draft"
          : "Open Project",

    /** ✅ FIXED ROUTES */
    linking:
      item.type === "survey"
        ? `/dashboard/survey/${item._id}/1`
        : `/dashboard/project/${item._id}/1`,
  }));

  /** ✅ Simple navigation */
  const handlePath = (path) => {
    navigate(path);
  };

  return (
    <div>
      <MyProject
        projectData={projectData}
        handlePath={handlePath}
        handleStatusUpdate={handleStatusUpdate}
        handleOpenDraft={handleOpenDraft} // ✅ pass it if needed
      />
    </div>
  );
}