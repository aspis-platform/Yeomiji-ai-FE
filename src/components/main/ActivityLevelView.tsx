import styled from "styled-components";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import SelectionButton from "../buttons/SelectionButton";

interface Prop {
  goBack: () => void;
  goToNext: () => void;
}

const ActivityLevelView = ({ goBack, goToNext }: Prop) => {
  return (
    <Section>
      <SelectionContainer>
        <SelectionButton text="조금 활발" />
        <SelectionButton text="보통" />
        <SelectionButton text="매우 활발" />
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

export default ActivityLevelView;
