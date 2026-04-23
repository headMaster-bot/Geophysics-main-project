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
  const { step } = useParams();
  const surveyStep = Number(step) || 1;
  const navigate = useNavigate();

  const [secondSurveyData, setSecondSurveyData] = useState(null);
  const [selectedMethodFromFourth, setSelectedMethodFromFourth] = useState(null);
  const [surveyForm, setSurveyForm] = useState({});
  const [surveyId, setSurveyId] = useState(null);

  const goToNextSurveyStep = () => {
    if (surveyStep >= 6) {
      navigate('/dashboard/survey/1');
    } else {
      navigate(`/dashboard/survey/${surveyStep + 1}`);
    }
  };

  return (
    <div className='w-[967px] mx-auto'>

      {/* Hide SurveyConnectivity on step 6 */}
      {/* {surveyStep !== 6 && <SurveyConnectivity />} */}
      {surveyStep !== 6 && <SurveyConnectivity
        surveyForm={surveyForm}
        setSurveyForm={setSurveyForm}
        surveyId={surveyId}
        setSurveyId={setSurveyId}
      />}

      <div className='mt-5'>
        {surveyStep === 1 && (
          <SurveyFormValidation onNext={goToNextSurveyStep} />
        )}

        {surveyStep === 2 && (
          <SecondSurveyConnectivity
            onNext={(data) => {
              setSecondSurveyData(data);
              goToNextSurveyStep();
            }}
          />
        )}

        {surveyStep === 3 && (
          <ThirdSurveyValidation
            secondSurveyData={secondSurveyData}
            onNext={goToNextSurveyStep}
          />
        )}

        {surveyStep === 4 && (
          <FourthSurveyConnectivity
            onNext={(selectedMethod) => {
              setSelectedMethodFromFourth(selectedMethod);
              goToNextSurveyStep();
            }}
          />
        )}

        {surveyStep === 5 && (
          <FifthSurveyConnectivity onNext={goToNextSurveyStep} />
        )}

        {surveyStep === 6 && (
          <SixSurveyConnectivity
            selectedMethod={selectedMethodFromFourth}
            onNext={goToNextSurveyStep}
          />
        )}
      </div>
    </div>
  );
}