import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FourthSurveyContent from './FourthSurveyContent';
import Swal from "sweetalert2";
import { getUserProfileAction } from '../redux/slice/user/usersSlice';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

// export default function FourthSurveyConnectivity({ onNext }) {
//   const dispatch = useDispatch();
//   const { profile } = useSelector((state) => state.users);
//   const { recommendedMethods: reduxRecommendedMethods } = useSelector((state) => state.surveys);
//   const { userAuth } = useSelector((state) => state.users);

//   // CRITICAL FIX: Get LATEST survey (last in array), not first!
//   const currentSurvey = profile?.message?.survey && profile.message.survey.length > 0
//     ? profile.message.survey[profile.message.survey.length - 1]
//     : null;

//   const [selectedRow, setSelectedRow] = useState(null);
//   const [methodsFromApi, setMethodsFromApi] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     dispatch(getUserProfileAction());
//   }, [dispatch]);

//   // FORCE REFETCH: When component mounts or changes, always get fresh profile
//   useEffect(() => {
//     console.log('=== FourthSurveyConnectivity Mounted ===');
//     dispatch(getUserProfileAction()).then(() => {
//       console.log('Fresh profile loaded on component mount');
//     });
//   }, []);

//   // FIXED: Fetch survey directly from API to get recommendedMethods
//   useEffect(() => {
//     const fetchSurveyRecommendations = async () => {
//       try {
//         const surveyId = currentSurvey?._id;
//         const surveyObjective = currentSurvey?.surveyObjective;

//         console.log('=== FourthSurveyConnectivity: Fetching Survey ===');
//         console.log('Using LATEST survey from profile');
//         console.log('Survey ID from profile:', surveyId);
//         console.log('Survey Objective from profile:', surveyObjective);

//         if (!surveyId) {
//           console.log('No survey ID found in profile');
//           setIsLoading(false);
//           return;
//         }

//         // Get token from Redux auth
//         const token = userAuth?.userInfo?.message?.token;
//         if (!token) {
//           console.log('No token found');
//           setIsLoading(false);
//           return;
//         }

//         // Fetch survey from API directly
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get(`${baseUrl}/surveys/${surveyId}`, config);
//         console.log('API Response for survey:', response.data);

//         const survey = response.data.message;
//         console.log('Survey Objective from API:', survey?.surveyObjective);
//         console.log('Geological Setting from API:', survey?.geologicalSetting);
//         console.log('Min Depth:', survey?.minDepth);
//         console.log('Max Depth:', survey?.maxDepth);

//         const apiRecommendedMethods = survey?.recommendedMethods || [];

//         console.log('Recommended Methods from API:', apiRecommendedMethods);
//         console.log('Type:', typeof apiRecommendedMethods);
//         console.log('Is array?', Array.isArray(apiRecommendedMethods));
//         console.log('Length:', apiRecommendedMethods?.length);

//         setMethodsFromApi(apiRecommendedMethods);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching survey:', error.message);
//         setIsLoading(false);
//       }
//     };

//     if (currentSurvey?._id) {
//       fetchSurveyRecommendations();
//     }
//   }, [currentSurvey, userAuth]);

//   // Use API data first, then Redux, then fallback
//   // const finalRecommendedMethods = methodsFromApi.length > 0 ? methodsFromApi : reduxRecommendedMethods;
//   // dispatch(clearRecommendedMethods()); // create this action

//   // For debugging, log all sources of methods
//   // const finalRecommendedMethods = methodsFromApi;
//   const finalRecommendedMethods = recommendedMethods;

//   console.log('=== FourthSurveyConnectivity Final Debug ===');
//   console.log('Methods from API:', methodsFromApi);
//   console.log('Methods from Redux:', reduxRecommendedMethods);
//   console.log('Final Methods:', finalRecommendedMethods);
//   console.log('Is Loading:', isLoading);

//   // If no recommended methods, provide fallback
//   const methods = finalRecommendedMethods && finalRecommendedMethods.length > 0
//     ? finalRecommendedMethods.map((method, index) => {
//       // Handle different data structures (string or object)
//       const methodName = typeof method === 'string'
//         ? method
//         : method?.name || method?.method || 'Unknown Method';

//       console.log(`  Method ${index}: "${methodName}" (type: ${typeof method})`);

//       return {
//         id: `method-${index}`,
//         name: methodName,
//         details: method?.depthRange || 'Method recommended based on survey parameters'
//       };
//     })
//     : [
//       { id: 'magnetic', name: 'Magnetic Survey', details: 'Magnetic survey extra details here' },
//       { id: 'gravity', name: 'Gravity Survey', details: 'Gravity survey extra details here' },
//     ];

//   console.log('Final methods array for display:', methods);

//   const handleIcon = (row) => {
//     setSelectedRow(prev => (prev === row ? null : row));
//   }

//   const handleSelect = (e) => {
//     e.preventDefault();
//     // if (!selectedRow) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Oops...",
//     //     text: "Please select a method before continuing",
//     //   });
//     //   return;
//     // }

//     const selectedMethod = methods.find((m) => m.id === selectedRow);

//     const methodName =
//       selectedMethod?.name ||
//       methods?.[0]?.name ||
//       "No method";

//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "Survey setup completed",
//     }).then(() => {
//       if (onNext) onNext(methodName);
//     });
//   };

//   return (
//     <div className='w-[967px] mx-auto'>
//       <FourthSurveyContent
//         handleSelect={handleSelect}
//         selectedRow={selectedRow}
//         handleIcon={handleIcon}
//         methods={methods}
//         primaryMethod={methods[0]}
//       />
//     </div>
//   );
// }

export default function FourthSurveyConnectivity({ onNext }) {
  const dispatch = useDispatch();

  const { recommendedMethods = [] } = useSelector((state) => state.surveys);

  const [selectedRow, setSelectedRow] = useState(null);

  const methods = recommendedMethods.map((method, index) => ({
    id: `method-${index}`,
    name: typeof method === "string" ? method : method?.name,
    details: method?.details || "Recommended based on survey input"
  }));

  if (!methods.length) {
    return <p className="text-center py-10">Generating recommendations...</p>;
  }

  const handleSelect = (e) => {
    e.preventDefault();

    const selectedMethod = methods.find((m) => m.id === selectedRow);

    const methodName =
      selectedMethod?.name ||
      methods?.[0]?.name;

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Survey setup completed",
    }).then(() => {
      if (onNext) onNext(methodName);
    });
  };

  return (
    <div className='w-[967px] mx-auto'>
      <FourthSurveyContent
        handleSelect={handleSelect}
        selectedRow={selectedRow}
        handleIcon={(row) => setSelectedRow(row)}
        methods={methods}
        primaryMethod={methods[0]}
      />
    </div>
  );
}