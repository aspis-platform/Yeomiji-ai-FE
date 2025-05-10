import styled from "styled-components";
import dog_3D from "../../assets/dog_3D.svg";
import GoNextButton from "../buttons/GoNextButton";

interface Prop {
  goToNext: () => void;
}

const StartView = ({ goToNext }: Prop) => {
  return (
    <Section>
      <Container>
        <img src={dog_3D} alt="dog image" />
      </Container>
      <ButtonContainer>
        <GoNextButton goToNext={goToNext} />
      </ButtonContainer>
    </Section>
  );
};

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const Container = styled.div`
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
  justify-content: space-between;
`;

export default StartView;
