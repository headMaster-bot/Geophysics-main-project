import React, { useEffect } from 'react'
import MyProject from './MyProject'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDraftAction, updateSurveyStatusAction } from '../../redux/slice/survey/surveySlice';
import { fetchProjectDraftAction } from '../../redux/slice/project/projectSlice';

export default function MyProjectData({setProjectDetails}) {

  // dispatch
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state?.users)
  // const projectData = profile?.message?.survey || [];
  const surveydata = profile?.message?.survey;
  const projectdata = profile?.message?.projects;
  const navigate = useNavigate()

  // import { useSelector } from "react-redux";


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

  // useEffect(() => {
  //   if (project) {
  //     setProjectDetails({
  //       projectName: project.projectName || "",
  //       description: project.description || "",
  //       startDate: project.startDate?.split("T")[0] || "",
  //       endDate: project.endDate?.split("T")[0] || "",
  //     });
  //   }
  // }, [project]);

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
  // <<<<<<< HEAD
  // const projectData = (profile?.message?.survey || []).map((project) => ({
  //   id: project._id,   // ✅ MUST BE REAL ID
  //   title: project.title,
  //   status: project.status,
  //   action: project.status,
  //   timeStamp: project.createdAt,
  //   objective: project.objective,
  //   Content: project.description,
  //   buttonContent: "Open Project",
  //   // linking: `/dashboard/survey/${project._id}`,
  //   linking: `/dashboard/survey/${project._id}/1`,
  // }));

  // const handlePath = (path) => {
  //   // console.log("working");

  //   navigate("/dashboard/survey/1");
  // }
  // const handleOpenDraft = async (surveyId) => {
  //   console.log("working");

  //   try {
  //     const payload = await dispatch(fetchDraftAction(surveyId)).unwrap();
  //     console.log(payload, "payload");


  //     navigate(`/dashboard/survey/${surveyId}`);
  //   } catch (err) {
  //     console.log("Error fetching draft:", err);
  //   }
  // };

  // get saved draft button
  // const handleOpenPlannerDraft = async (projectId) => {
  //   console.log("working");

  //   try {
  //     const payload = await dispatch(fetchProjectDraftAction(projectId)).unwrap();
  //     console.log(payload, "payload");


  //     navigate(`/dashboard/projects/${projectId}`);
  //   } catch (err) {
  //     console.log("Error fetching draft:", err);
  //   }
  // };
  // =======

  const handleOpenDraft = async (id, type = "survey", status = "draft") => {
    console.log("working", { type, status });

    try {
      let payload;

      if (type === "survey") {
        if (status === "draft") {
          payload = await dispatch(fetchDraftAction(id)).unwrap();
          console.log(payload, "survey draft payload");
        }

        if (status === "complete") {
          payload = await dispatch(fetchDraftAction(id)).unwrap(); // 👈 make sure this exists
          console.log(payload, "survey complete payload");
        }

        navigate(`/dashboard/survey/${id}`);
      }

      if (type === "project") {
        if (status === "draft") {
          payload = await dispatch(fetchProjectDraftAction(id)).unwrap();
          console.log(payload, "project draft payload");
        }

        if (status === "complete") {
          payload = await dispatch(fetchProjectDraftAction(id)).unwrap(); // 👈 make sure this exists
          console.log(payload, "project complete payload");
        }

        navigate(`/dashboard/project/${id}`);
      }

    } catch (err) {
      console.log(`Error fetching ${type} ${status}:`, err);
    }
  };

  // const projectData = (profile?.message?.survey || []).map((project) => ({
  //   id: project._id,   // ✅ MUST BE REAL ID
  //   title: project.title,
  //   status: project.status,
  //   action: project.status,
  //   timeStamp: project.createdAt,
  //   objective: project.objective,
  //   Content: project.description,
  //   buttonContent: "Open Project",
  //   // linking: `/dashboard/survey/${project._id}`,
  //   linking: `/dashboard/survey/${project._id}/1`,
  // }));

  const combinedData = [
    ...(surveydata || []),
    ...(projectdata || [])
  ];

  const projectData = combinedData.map((item) => ({
    id: item._id,

    // Dynamic title based on type
    title: item.type === "survey" ? item.surveyName : item.projectName,

    status: item.status,
    type: item.type,

    timeStamp: item.createdAt,

    // Dynamic fields
    objective:
      item.type === "survey"
        ? item.surveyObjective
        : "Project Planning",

    content: item.description,

    // Button text based on type + status
    buttonContent:
      item.type === "survey"
        ? item.status === "draft"
          ? "Open Survey Draft"
          : "Open Survey"
        : item.status === "draft"
          ? "Open Project Draft"
          : "Open Project",

    // Dynamic routing
    linking:
      item.type === "survey"
        ? `/dashboard/survey/${item._id}/1`
        : `/dashboard/project/${item._id}`,
  }));
  const handlePath = (path) => {
    navigate(path)
  }
  // >>>>>>> 312e976465945fab6535197eff0613843bc951a6

  return (
    <div>
      {/* <MyProject projectData={projectData} handlePath={handlePath} /> */}
      {/* <MyProject
        projectData={projectData}
        handlePath={handlePath}
        handleStatusUpdate={handleStatusUpdate}
      /> */}
      <MyProject
        // projectData={projectData}
        handleOpenDraft={handleOpenDraft}
        handleStatusUpdate={handleStatusUpdate}
      // handleOpenPlannerDraft={handleOpenPlannerDraft}
      />
    </div>
  )
}