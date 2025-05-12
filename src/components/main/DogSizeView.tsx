import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { useSurvey } from "../../context/SurveyContext";
import type { DogSizeType } from "../../api/types";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const DogSizeView = ({ goBack, goToNext }: Prop) => {
  const { dogSize, setDogSize } = useSurvey();

  const handleSelection = (size: DogSizeType) => {
    setDogSize(size);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = dogSize !== null;

  return (
    <Section>
      <SelectionContainer>
        <SelectionButton 
          text="소형견" 
          selected={dogSize === "소형견"}
          onClick={() => handleSelection("소형견")}
        />
        <SelectionButton 
          text="중형견" 
          selected={dogSize === "중형견"}
          onClick={() => handleSelection("중형견")}
        />
        <SelectionButton 
          text="대형견" 
          selected={dogSize === "대형견"}
          onClick={() => handleSelection("대형견")}
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

export default DogSizeView;
