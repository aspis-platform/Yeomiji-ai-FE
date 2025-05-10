import { theme } from "../../style/theme";
import dog_3D from "../../assets/dog_3D.svg";
import styled from "styled-components";

const Rank = () => {
  return (
    <RankSection>
      <RankWrap>
        <Second>2</Second>
        <SmallDog>
          <img src={dog_3D} />
        </SmallDog>
        <BreedNameSmall>포메라니안</BreedNameSmall>
      </RankWrap>

      <RankWrap>
        <First>1</First>
        <BigDog>
          <img src={dog_3D} />
        </BigDog>
        <BreedNameBig>포메라니안</BreedNameBig>
      </RankWrap>

      <RankWrap>
        <Third>3</Third>
        <SmallDog>
          <img src={dog_3D} />
        </SmallDog>
        <BreedNameSmall>포메라니안</BreedNameSmall>
      </RankWrap>
    </RankSection>
  );
};

const First = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100px;
  background: linear-gradient(145deg, #fac238, #d68400);
  color: white;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 8px;
  top: 8px;
`;
const Second = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100px;
  background: linear-gradient(145deg, #ededed, #8f8f8f);
  color: white;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 8px;
  top: 8px;
`;
const Third = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100px;
  background: linear-gradient(145deg, #f09732, #995508);
  color: white;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 8px;
  top: 8px;
`;
const BreedNameBig = styled.h3`
  font-size: 24px;
`;
const BreedNameSmall = styled.h3`
  font-size: 20px;
`;
const RankWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  color: black;
  position: relative;
`;
const SmallDog = styled.div`
  width: 152px;
  height: 152px;
  border: none;
  border-radius: 180px;
  background-color: ${theme.color.main};
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
  }
`;
const BigDog = styled.div`
  width: 180px;
  height: 180px;
  border: none;
  border-radius: 200px;
  background-color: ${theme.color.main};
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 152px;
    height: 152px;
  }
`;
const RankSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

export default Rank;
