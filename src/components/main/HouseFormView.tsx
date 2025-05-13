import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { useSurvey } from "../../context/SurveyContext";
import type { HouseType } from "../../api/types";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const HouseForm = ({ goBack, goToNext }: Prop) => {
  const { houseType, setHouseType } = useSurvey();

  const handleSelection = (house: HouseType) => {
    setHouseType(house);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = houseType !== null;

  return (
    <Section>
      <SelectionContainer>
        <SelectionButton 
          text="아파트" 
          selected={houseType === "아파트"}
          onClick={() => handleSelection("아파트")}
        />
        <SelectionButton 
          text="빌라" 
          selected={houseType === "빌라"}
          onClick={() => handleSelection("빌라")}
        />
        <SelectionButton 
          text="단독주택" 
          selected={houseType === "단독주택"}
          onClick={() => handleSelection("단독주택")}
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

export default HouseForm;
