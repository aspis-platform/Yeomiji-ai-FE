import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const HouseForm = ({ goBack, goToNext }: Prop) => {
  return (
    <Section>
      <SelectionContainer>
        <SelectionButton text="아파트" />
        <SelectionButton text="빌라" />
        <SelectionButton text="단독주택" />
      </SelectionContainer>
      <ButtonContainer>
        <GoBackButton goBack={goBack} />
        <GoNextButton goToNext={goToNext} />
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
