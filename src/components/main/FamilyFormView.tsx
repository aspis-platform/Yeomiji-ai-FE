import { useState } from "react";
import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";
import { theme } from "../../style/theme";
import dropdown from "../../assets/dropdown.svg";
import { useSurvey } from "../../context/SurveyContext";
import type { FamilyFormType } from "../../api/types";

interface Prop {
  goToNext: () => void;
  goBack: () => void;
}

const FamilyFormView = ({ goToNext, goBack }: Prop) => {
  const { familyForm, setFamilyForm } = useSurvey();

  const familyFormOptions = [
    {
      id: 1,
      name: "혼자 사는 1인 가구",
    },
    {
      id: 2,
      name: "부부만 있는 가구(아이 없음)",
    },
    {
      id: 3,
      name: "어린이가 있는 가구",
    },
    {
      id: 4,
      name: "청소년 또는 성인 자녀가 있는 가구",
    },
    {
      id: 5,
      name: "노인이 있는 가구",
    },
    {
      id: 6,
      name: "다자녀 가구",
    },
    {
      id: 7,
      name: "반려 동물이 이미 있는 가구",
    },
    {
      id: 8,
      name: "대가족(3세대 이상 함께 거주)",
    },
  ];

  // 선택 핸들러
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFamilyForm(e.target.value as FamilyFormType);
  };

  // 다음 버튼 활성화 여부
  const isNextEnabled = familyForm !== null;

  return (
    <Section>
      <DropdownContainer>
        <Select>
          <select 
            value={familyForm || "가족 형태를 선택하세요"} 
            onChange={handleSelectChange}
          >
            <option disabled hidden value="가족 형태를 선택하세요">
              가족 형태를 선택하세요
            </option>
            {familyFormOptions.map((form) => (
              <option value={form.name} key={form.id}>
                {form.name}
              </option>
            ))}
          </select>
          <img src={dropdown} />
        </Select>
      </DropdownContainer>
      <ButtonContainer>
        <GoBackButton goBack={goBack} />
        <GoNextButton goToNext={goToNext} disabled={!isNextEnabled} />
      </ButtonContainer>
    </Section>
  );
};

const Select = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  select {
    width: 100%;
    padding: 18px;
    border: 2px solid ${theme.color.gray2};
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    appearance: none;
    color: ${theme.color.gray1};
  }
  img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    pointer-events: none;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DropdownContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default FamilyFormView;
