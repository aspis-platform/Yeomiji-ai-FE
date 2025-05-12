import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { useSurvey } from "../../context/SurveyContext";
import type { HouseOwnershipType } from "../../api/types";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const HouseOwnership = ({ goBack, goToNext }: Prop) => {
  const { houseOwnership, setHouseOwnership } = useSurvey();

  const handleSelection = (ownership: HouseOwnershipType) => {
    setHouseOwnership(ownership);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = houseOwnership !== null;

  return (
    <Section>
      <SelectionContainer>
        <SelectionButton 
          text="자가 주택" 
          selected={houseOwnership === "자가 주택"}
          onClick={() => handleSelection("자가 주택")}
        />
        <SelectionButton 
          text="월세 주택" 
          selected={houseOwnership === "월세 주택"}
          onClick={() => handleSelection("월세 주택")}
        />
        <SelectionButton 
          text="전세 주택" 
          selected={houseOwnership === "전세 주택"}
          onClick={() => handleSelection("전세 주택")}
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

export default HouseOwnership;
