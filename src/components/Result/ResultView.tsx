import styled from "styled-components";
import { theme } from "../../style/theme";
import Rank from "./Rank";
import blue_arrow from "../../assets/blue_arrow.svg";
import DogInfo from "./DogInfo";
import { useSurvey } from "../../context/SurveyContext";
import { useAdoptionSubmit } from "../../api";
import { useState } from "react";
import type { Recommendation } from "../../api/types";

const ResultView = () => {
  const { recommendation, loading, error, clearSurvey, getSurveyData } = useSurvey();
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [selectedBreedId, setSelectedBreedId] = useState<number | null>(null);
  const [adoptionFormData, setAdoptionFormData] = useState({
    name: "",
    contact: "",
    address: "",
    reason: "",
  });
  const { submitAdoption, loading: submitLoading } = useAdoptionSubmit();

  const handleShowShelterDogs = () => {
    console.log("보호소 견종 보기");
  };

  const handleShowAdoptionForm = (breedId: number) => {
    setSelectedBreedId(breedId);
    setShowAdoptionForm(true);
  };

  const handleSubmitAdoption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBreedId) return;

    try {
      await submitAdoption({
        ...adoptionFormData,
        breedId: selectedBreedId,
        userSurvey: getSurveyData(),
      });
      setShowAdoptionForm(false);
      setAdoptionFormData({
        name: "",
        contact: "",
        address: "",
        reason: "",
      });
    } catch (error) {
      console.error("입양 신청 실패:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdoptionFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      {recommendation.recommendations.map((rec: Recommendation, index: number) => (
        <DogInfo 
          key={index}
          name={rec.breed}
          description={rec.reason}
          imageUrl={`/images/${rec.breed.toLowerCase()}.jpg`}
          onAdoptClick={() => handleShowAdoptionForm(index + 1)}
        />
      ))}

      {showAdoptionForm && (
        <AdoptionFormModal>
          <FormContainer>
            <h2>입양 신청서</h2>
            <form onSubmit={handleSubmitAdoption}>
              <FormGroup>
                <label htmlFor="name">이름</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={adoptionFormData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="contact">연락처</label>
                <input 
                  type="tel" 
                  id="contact" 
                  name="contact" 
                  value={adoptionFormData.contact} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="address">주소</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={adoptionFormData.address} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="reason">입양 이유</label>
                <textarea 
                  id="reason" 
                  name="reason" 
                  value={adoptionFormData.reason} 
                  onChange={handleInputChange} 
                  required 
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setShowAdoptionForm(false)}>
                  취소
                </CancelButton>
                <SubmitButton type="submit" disabled={submitLoading}>
                  {submitLoading ? '제출 중...' : '입양 신청'}
                </SubmitButton>
              </ButtonGroup>
            </form>
          </FormContainer>
          <ModalOverlay onClick={() => setShowAdoptionForm(false)} />
        </AdoptionFormModal>
      )}
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
  width: 90%;
  max-width: 800px;
  line-height: 1.6;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(87, 143, 202, 0.15);
  border-left: 4px solid ${theme.color.main};
`;

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

const AdoptionFormModal = styled.div`
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

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const FormContainer = styled.div`
  background: ${theme.color.main};
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  
  h2 {
    margin-bottom: 20px;
    text-align: center;
    color: white;
    font-size: 24px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    color: white;
  }

  input, textarea {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    
    &:focus {
      border-color: white;
      background: white;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-weight: 500;
    color: #333;
  }
  
  input, textarea {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: ${theme.color.main};
      outline: none;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 2px solid white;
  border-radius: 8px;
  background: transparent;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  flex: 2;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: white;
  color: ${theme.color.main};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;

export default ResultView;
