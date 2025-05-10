import styled from "styled-components";
import img_ex from "../../assets/img_ex.svg";
import { theme } from "../../style/theme";

const DogInfo = () => {
  return (
    <Container>
      <ImgContainer>
        <Overlay>
          <OverlayText>자세히 알아보기</OverlayText>
        </Overlay>
      </ImgContainer>

      <InfoContainer>
        <Name>몽몽이</Name>
        <p>
          활발하고 착한 몽몽이입니다. 어쭤구저쭤구. 활발하고 착한 몽몽이입니다.
          어쭤구저쭤구활발하고 착한 몽몽이입니다. 어쭤구저쭤구활발하고 착한
          몽몽이입니다. 어쭤구저쭤구
        </p>
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
  background-image: url(${img_ex});
  background-size: cover;
  background-position: center;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;
const Container = styled.div`
  width: 80%;
  height: 512px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
`;

export default DogInfo;
