import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyConnectivity from './SurveyConnectivity';
import SurveyFormValidation from './SurveyFormValidation';
import SecondSurveyConnectivity from '../../second survey step/SecondSurveyConnectivity';
import ThirdSurveyValidation from '../Third Survey/ThirdSurveyValidation';
import FourthSurveyConnectivity from '../../Fourth Survey/FourthSurveyConnectivity';
import FifthSurveyConnectivity from '../Fifth recommendation/FifthSurveyConnectivity';
import SixSurveyConnectivity from '../Six survey recommendation/SixSurveyConnectivity';

export default function SurveyContainer() {
  const { id, step } = useParams();
  const surveyStep = Number(step) || 1;
  const navigate = useNavigate();

  const [secondSurveyData, setSecondSurveyData] = useState(null);
  const [selectedMethodFromFourth, setSelectedMethodFromFourth] = useState(null);

  const [surveyId, setSurveyId] = useState(id || null);

  // ✅ SIMPLE NAV FUNCTION (NO CONFUSION)
  const goToStep = (stepNumber, customId = null) => {
    const activeId = customId || surveyId || id;

    if (!activeId) return;

    navigate(`/dashboard/survey/${activeId}/${stepNumber}`);
  };

  return (
    <div className="w-[967px] mx-auto">

      {surveyStep !== 1 && surveyStep !== 6 && (
        <SurveyConnectivity
          surveyId={surveyId}
          setSurveyId={setSurveyId}
        />
      )}

      <div className="mt-5">

        {surveyStep === 1 && (
          <SurveyFormValidation
            onNext={(newId) => {
              setSurveyId(newId);
              goToStep(2, newId);
            }}
            surveyId={surveyId}
            setSurveyId={setSurveyId}
          />
        )}

        {surveyStep === 2 && (
          <SecondSurveyConnectivity
            onNext={(data) => {
              setSecondSurveyData(data);
              goToStep(3);
            }}
          />
        )}

        {surveyStep === 3 && (
          <ThirdSurveyValidation
            secondSurveyData={secondSurveyData}
            onNext={() => goToStep(4)}
          />
        )}

        {surveyStep === 4 && (
          <FourthSurveyConnectivity
            onNext={(method) => {
              setSelectedMethodFromFourth(method);
              goToStep(5);
            }}
          />
        )}

        {surveyStep === 5 && (
          <FifthSurveyConnectivity onNext={() => goToStep(6)} />
        )}

        {surveyStep === 6 && (
          <SixSurveyConnectivity
            selectedMethod={selectedMethodFromFourth}
            onNext={() => goToStep(1)}
          />
        )}

      </div>
    </div>
  );
}