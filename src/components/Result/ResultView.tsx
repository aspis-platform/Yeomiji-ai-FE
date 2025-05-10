import styled from "styled-components";
import { theme } from "../../style/theme";
import Rank from "./Rank";
import blue_arrow from "../../assets/blue_arrow.svg";
import DogInfo from "./DogInfo";

const ResultView = () => {
  return (
    <Section>
      <Rank />
      <Desc>
        검사자님과 잘 맞는 반려견은 순서대로 포메라니안, 리트리버,
        도베르만입니다. 이 견종들은 대체로 외향적이고 어쩌구 저쩌구 이런 가족
        형태에 잘 맞고 그렇고 음 대충 검사 내용과 견종 특성 관련지어서
        설명설명....
      </Desc>
      <More>
        <img src={blue_arrow} />
        <p>매칭된 보호견들 보러가기...</p>
      </More>
      <DogInfo />
      <DogInfo />
    </Section>
  );
};

const More = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  color: ${theme.color.main};
  animation: upDown 1.5s ease-in-out infinite;

  @keyframes upDown {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
const Desc = styled.div`
  width: 100%;
`;
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-size: 20px;
  font-weight: 500;
  padding: 80px 0;
`;

export default ResultView;
