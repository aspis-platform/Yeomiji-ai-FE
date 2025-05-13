import { theme } from "../../style/theme";
import dog_3D from "../../assets/dog_3D.svg";
import styled from "styled-components";

interface Recommendation {
  rank: number;
  breed: string;
  reason: string;
}

interface RankProps {
  recommendations: Recommendation[];
}

const Rank = ({ recommendations }: RankProps) => {
  return (
    <RankSection>
      {recommendations.length >= 2 && (
        <RankWrap>
          <Second>2</Second>
          <SmallDog>
            <img src={dog_3D} alt={recommendations[1].breed} />
          </SmallDog>
          <BreedNameSmall>{recommendations[1].breed}</BreedNameSmall>
        </RankWrap>
      )}

      {recommendations.length >= 1 && (
        <RankWrap>
          <First>1</First>
          <BigDog>
            <img src={dog_3D} alt={recommendations[0].breed} />
          </BigDog>
          <BreedNameBig>{recommendations[0].breed}</BreedNameBig>
        </RankWrap>
      )}

      {recommendations.length >= 3 && (
        <RankWrap>
          <Third>3</Third>
          <SmallDog>
            <img src={dog_3D} alt={recommendations[2].breed} />
          </SmallDog>
          <BreedNameSmall>{recommendations[2].breed}</BreedNameSmall>
        </RankWrap>
      )}
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
  font-size: 20px;
  text-align: center;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BreedNameSmall = styled.h3`
  font-size: 16px;
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  width: 120px;
  height: 120px;
  border: none;
  border-radius: 180px;
  background-color: ${theme.color.main};
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90px;
    height: 90px;
  }
`;

const BigDog = styled.div`
  width: 140px;
  height: 140px;
  border: none;
  border-radius: 200px;
  background-color: ${theme.color.main};
  box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 110px;
    height: 110px;
  }
`;

const RankSection = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 10px;
`;

export default Rank;
