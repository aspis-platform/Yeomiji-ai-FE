import styled from "styled-components";
import Input from "../input/Input";
import GoBackButton from "../buttons/GoBackButton";
import GoNextButton from "../buttons/GoNextButton";
import { useSurvey } from "../../context/SurveyContext";

interface Prop {
  goToNext: () => void;
  goBack: () => void;
}

const JobView = ({ goToNext, goBack }: Prop) => {
  const { job } = useSurvey();

  // 다음 버튼 활성화 여부
  const isNextEnabled = job.trim() !== '';

  return (
    <Section>
      <InputContainer>
        <Input />
      </InputContainer>
      <ButtonContainer>
        <GoBackButton goBack={goBack} />
        <GoNextButton goToNext={goToNext} disabled={!isNextEnabled} />
      </ButtonContainer>
    </Section>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InputContainer = styled.div`
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

export default JobView;
