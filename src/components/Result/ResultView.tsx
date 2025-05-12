import styled from "styled-components";
import { theme } from "../../style/theme";
import Rank from "./Rank";
import blue_arrow from "../../assets/blue_arrow.svg";
import DogInfo from "./DogInfo";
import { useSurvey } from "../../context/SurveyContext";
import { useState, useEffect } from "react";
import type { Recommendation, Animal } from "../../api/types";
import { apiService } from "../../api/services";
import { useNavigate } from "react-router-dom";

const ResultView = () => {
  const { recommendation, loading, error, clearSurvey, getSurveyData } = useSurvey();
  const [shelterAnimals, setShelterAnimals] = useState<Animal[]>([]);
  const [loadingAnimals, setLoadingAnimals] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShelterAnimals = async () => {
      if (recommendation?.recommendations) {
        setLoadingAnimals(true);
        try {
          const animals = await apiService.getShelterAnimals();
          // 추천된 견종과 일치하는 동물만 필터링
          const recommendedBreeds = recommendation.recommendations.map(rec => rec.breed);
          const filteredAnimals = animals.filter(animal => 
            recommendedBreeds.includes(animal.breedInfo.breedName)
          );
          setShelterAnimals(filteredAnimals);
        } catch (error) {
          console.error('보호소 동물 데이터 조회 실패:', error);
        } finally {
          setLoadingAnimals(false);
        }
      }
    };

    fetchShelterAnimals();
  }, [recommendation]);

  const handleShowAdoptionForm = (breedId: string) => {
    navigate('/adoption-form', {
      state: {
        breedId,
        surveyData: getSurveyData()
      }
    });
  };

  const handleRetakeSurvey = () => {
    clearSurvey();
  };

  if (loading) {
    return (
      <Section>
        <LoadingMessage>견종 추천을 생성하고 있습니다...</LoadingMessage>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <ErrorMessage>
          <p>견종 추천을 가져오는데 실패했습니다.</p>
          <p>{error.message}</p>
          <RetryButton onClick={handleRetakeSurvey}>
            다시 시도하기
          </RetryButton>
        </ErrorMessage>
      </Section>
    );
  }

  if (!recommendation || !recommendation.recommendations || recommendation.recommendations.length === 0) {
    return (
      <Section>
        <ErrorMessage>
          <p>추천된 견종이 없습니다.</p>
          <RetryButton onClick={handleRetakeSurvey}>
            다시 시도하기
          </RetryButton>
        </ErrorMessage>
      </Section>
    );
  }

  return (
    <Section>
      <Rank recommendations={recommendation.recommendations} />
      <Desc>
        {recommendation.recommendations[0].reason}
      </Desc>
      <More>
        <img src={blue_arrow} alt="화살표" />
        <p>매칭된 보호견들 보러가기...</p>
      </More>
      {loadingAnimals ? (
        <LoadingMessage>보호견 정보를 불러오는 중...</LoadingMessage>
      ) : (
        shelterAnimals.map((animal) => (
          <DogInfo 
            key={animal.id}
            name={animal.name}
            description={`${animal.breedInfo.breedName} | ${animal.sex === 'MALE' ? '수컷' : '암컷'} | ${animal.isNeutered ? '중성화 완료' : '중성화 미완료'}`}
            imageUrl={animal.profileUrl}
            onAdoptClick={() => handleShowAdoptionForm(animal.breedId)}
            onClick={() => setSelectedAnimal(animal)}
          />
        ))
      )}

      {selectedAnimal && (
        <AnimalModal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedAnimal(null)}>×</CloseButton>
            <AnimalImage src={selectedAnimal.profileUrl} alt={selectedAnimal.name} />
            <AnimalInfo>
              <h2>{selectedAnimal.name}</h2>
              <p>견종: {selectedAnimal.breedInfo.breedName}</p>
              <p>성별: {selectedAnimal.sex === 'MALE' ? '수컷' : '암컷'}</p>
              <p>중성화: {selectedAnimal.isNeutered ? '완료' : '미완료'}</p>
            </AnimalInfo>
            <AdoptButton onClick={() => handleShowAdoptionForm(selectedAnimal.breedId)}>
              입양 신청하기
            </AdoptButton>
          </ModalContent>
          <ModalOverlay onClick={() => setSelectedAnimal(null)} />
        </AnimalModal>
      )}
    </Section>
  );
};

const Section = styled.section`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-size: 20px;
  font-weight: 500;
  padding: 80px 0;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  font-size: 24px;
  color: ${theme.color.main};
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  border-left: 4px solid #ff4d4f;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  color: #555;
  font-size: 18px;
`;

const RetryButton = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff7875;
    transform: translateY(-2px);
  }
`;

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
  width: 90%;
  max-width: 800px;
  line-height: 1.6;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(87, 143, 202, 0.15);
  border-left: 4px solid ${theme.color.main};
`;

const AnimalModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
  z-index: 1001;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const AnimalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const AnimalInfo = styled.div`
  margin-bottom: 20px;
  
  h2 {
    font-size: 24px;
    color: ${theme.color.main};
    margin-bottom: 15px;
  }
  
  p {
    margin: 8px 0;
    color: #666;
  }
`;

const AdoptButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${theme.color.main};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.color.mainDark};
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default ResultView;
