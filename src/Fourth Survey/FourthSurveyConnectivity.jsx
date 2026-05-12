import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FourthSurveyContent from './FourthSurveyContent';
import Swal from "sweetalert2";
import { getUserProfileAction } from '../redux/slice/user/usersSlice';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

export default function FourthSurveyConnectivity({ onNext }) {
  const dispatch = useDispatch();

  // const { recommendedMethods = [] } = useSelector((state) => state.surveys);

  const [selectedRow, setSelectedRow] = useState(null);

  const { survey, recommendedMethods } = useSelector(
    (state) => state.surveys
  );

  useEffect(() => {
    console.log("🔥 LIVE REDUX SURVEY:", survey);
    console.log("🔥 LIVE RECOMMENDATIONS:", recommendedMethods);
  }, [survey, recommendedMethods]);

  // const methods = recommendedMethods.map((method, index) => ({
  //   id: `method-${index}`,
  //   name: typeof method === "string" ? method : method?.name,
  //   details: method?.details || "Recommended based on survey input"
  // }));
  const methods = React.useMemo(() => {
    return (recommendedMethods || []).map((method, index) => ({
        id: `method-${index}`,
        name: typeof method === "string" ? method : method?.name,
        details: method?.details || "Recommended based on survey input"
    }));
}, [recommendedMethods]);

  // if (!methods.length) {
  //   return <p className="text-center py-10">Generating recommendations...</p>;
  // }
  if (!recommendedMethods?.length) {
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