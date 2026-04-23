import React from 'react'
import MyProject from './MyProject'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateSurveyStatusAction } from '../../redux/slice/survey/surveySlice';

export default function MyProjectData() {

  // dispatch
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state?.users)
  // const projectData = profile?.message?.survey || [];
  const surveydata = profile?.message?.survey;
  const navigate = useNavigate()

  // dispatch(updateSurveyStatusAction({
  //   surveyId,
  //   status: "draft"
  // }));
  // dispatch(updateSurveyStatusAction({
  //   surveyId,
  //   status: "completed"
  // }));
  // dispatch(updateSurveyStatusAction({
  //   surveyId,
  //   status: "in_progress"
  // }));
  const handleStatusUpdate = (id, status) => {
    dispatch(updateSurveyStatusAction({
      surveyId: id,
      status
    }));
  };

  // const projectData = [
  //   {
  //     // id: 1,
  //     title: 'abuja mining sites analysis',
  //     status: 'survey',
  //     action: 'draft',
  //     timeStamp: '2026-02-25',
  //     objective: 'Resource Exploration',
  //     Content: 'Mineral exploration in FCT region',
  //     buttonContent: 'Open Project',
  //     // linking: '/dashboard/survey/1'
  //     linking: `/dashboard/survey/${surveyId}`
  //   },
  //   {
  //     // id: 2,
  //     title: 'Lagos Coastal Survey',
  //     status: 'survey',
  //     action: 'active',
  //     timeStamp: '2026-02-28',
  //     objective: 'Environmental Assessment',
  //     Content: 'Geophysical survey of coastal erosion',
  //     buttonContent: 'Open Project',
  //     linking: '/dashboard/survey/1'
  //   },
  //   {
  //     // id: 3,
  //     title: 'Lagos Coastal execution',
  //     status: 'project plan',
  //     action: 'active',
  //     timeStamp: '2026-02-28',
  //     objective: 'Environmental Assessment',
  //     Content: 'Geophysical survey of coastal erosion',
  //     buttonContent: 'Open Project',
  //     linking: '/dashboard/project/3'
  //   },
  //   {
  //     // id: 4,
  //     title: 'Port Harcourt Foundation Study',
  //     status: 'project plan',
  //     action: 'complete',
  //     timeStamp: '2026-02-28',
  //     objective: 'Engineering Investigation',
  //     Content: 'Subsurface investigation for construction',
  //     buttonContent: 'Open Project',
  //     linking: '/dashboard/project/3'
  //   }
  // ]
  const projectData = (profile?.message?.survey || []).map((project) => ({
    id: project._id,   // ✅ MUST BE REAL ID
    title: project.title,
    status: project.status,
    action: project.status,
    timeStamp: project.createdAt,
    objective: project.objective,
    Content: project.description,
    buttonContent: "Open Project",
    // linking: `/dashboard/survey/${project._id}`,
    linking: `/dashboard/survey/${project._id}/1`,
  }));

  const handlePath = (path) => {
    // console.log("working");
    
    navigate("/dashboard/survey/1");
  }

  return (
    <div>
      {/* <MyProject projectData={projectData} handlePath={handlePath} /> */}
      {/* <MyProject
        projectData={projectData}
        handlePath={handlePath}
        handleStatusUpdate={handleStatusUpdate}
      /> */}
      <MyProject
        projectData={projectData}
        handlePath={handlePath}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}