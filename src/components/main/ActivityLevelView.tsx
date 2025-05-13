import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { useSurvey } from "../../context/SurveyContext";
import type { ActivityLevelType } from "../../api/types";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const ActivityLevelView = ({ goBack, goToNext }: Prop) => {
  const { activityLevel, setActivityLevel } = useSurvey();

  const handleSelection = (activity: ActivityLevelType) => {
    setActivityLevel(activity);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = activityLevel !== null;

  return (
    <Section>
      <SelectionContainer>
        <SelectionButton 
          text="조금 활발" 
          selected={activityLevel === "조금 활발"}
          onClick={() => handleSelection("조금 활발")}
        />
        <SelectionButton 
          text="보통" 
          selected={activityLevel === "보통"}
          onClick={() => handleSelection("보통")}
        />
        <SelectionButton 
          text="매우 활발" 
          selected={activityLevel === "매우 활발"}
          onClick={() => handleSelection("매우 활발")}
        />
      </SelectionContainer>
      <ButtonContainer>
        <GoBackButton goBack={goBack} />
        <GoNextButton goToNext={goToNext} disabled={!isNextEnabled} />
      </ButtonContainer>
    </Section>
  );
};

const SelectionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ActivityLevelView;
