import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { useSurvey } from "../../context/SurveyContext";
import type { PersonalityType } from "../../api/types";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const PersonalityView = ({ goBack, goToNext }: Prop) => {
  const { personality, setPersonality } = useSurvey();

  const handleSelection = (personalityValue: PersonalityType) => {
    setPersonality(personalityValue);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = personality !== null;

  return (
    <Section>
      <SelectionContainer>
        <SelectionButton 
          text="내향형" 
          selected={personality === "내향형"}
          onClick={() => handleSelection("내향형")}
        />
        <SelectionButton 
          text="외향형" 
          selected={personality === "외향형"}
          onClick={() => handleSelection("외향형")}
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

export default PersonalityView;
