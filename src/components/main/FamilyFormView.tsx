import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import { theme } from "../../style/theme";
import dropdown from "../../assets/dropdown.svg";

interface Prop {
  goToNext: () => void;
  goBack: () => void;
}

const FamilyFormView = ({ goToNext, goBack }: Prop) => {
  const familyForm = [
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
  return (
    <Section>
      <DropdownContainer>
        <Select>
          <select defaultValue={"가족 형태를 선택하세요"}>
            <option disabled hidden value="가족 형태를 선택하세요">
              가족 형태를 선택하세요
            </option>
            {familyForm.map((form) => (
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
        <GoNextButton goToNext={goToNext} />
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
