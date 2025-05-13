import styled from "styled-components";
import img_ex from "../../assets/img_ex.svg";
import { theme } from "../../style/theme";

export interface DogInfoProps {
  name: string;
  description: string;
  imageUrl: string;
  onAdoptClick: () => void;
  onClick: () => void;
}

const DogInfo = ({ name, description, imageUrl, onAdoptClick, onClick }: DogInfoProps) => {
  return (
    <Container onClick={onClick}>
      <ImgContainer style={{ backgroundImage: `url(${imageUrl || img_ex})` }}>
        <Overlay>
          <OverlayText>자세히 알아보기</OverlayText>
        </Overlay>
      </ImgContainer>

      <InfoContainer>
        <Name>{name}</Name>
        <p>{description}</p>
        <AdoptButton onClick={(e) => {
          e.stopPropagation();
          onAdoptClick();
        }}>
          입양 신청하기
        </AdoptButton>
      </InfoContainer>
    </Container>
  );
};

const OverlayText = styled.p`
  color: white;
  font-size: 28px;
  font-weight: 700;
`;

const Overlay = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  font-size: 36px;
  font-weight: 700;
  color: white;
`;

const Name = styled.h4`
  font-size: 36px;
  font-weight: 700;
  color: black;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 28px 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 22px;
  font-weight: 400;
  color: ${theme.color.gray1};
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 55%;
  background-size: cover;
  background-position: center;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  height: 512px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdoptButton = styled.button`
  align-self: flex-start;
  padding: 10px 20px;
  background: ${theme.color.main};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.color.mainDark};
  }
`;

export default DogInfo;
