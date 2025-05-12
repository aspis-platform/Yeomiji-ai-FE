import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../style/theme';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import type { SurveyResult } from '../api/types';

const Survey = () => {
  const navigate = useNavigate();
  const { submitSurvey } = useSurvey();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyResult>({
    job: '',
    houseType: '아파트',
    houseOwnership: '자가 주택',
    familyForm: '혼자 사는 1인 가구',
    personality: '내향형',
    activityLevel: '보통',
    dogSize: '중형견'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSurveyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitSurvey(surveyData);
      navigate('/result');
    } catch (error) {
      console.error('설문 제출 실패:', error);
    }
  };

  return (
    <Container>
      <SurveyWrapper>
        <h1>반려견 입양 설문</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="job">직업</label>
            <input
              type="text"
              id="job"
              name="job"
              value={surveyData.job}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="houseType">주거 형태</label>
            <select
              id="houseType"
              name="houseType"
              value={surveyData.houseType}
              onChange={handleInputChange}
              required
            >
              <option value="아파트">아파트</option>
              <option value="빌라">빌라</option>
              <option value="단독주택">단독주택</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="houseOwnership">주거 소유 여부</label>
            <select
              id="houseOwnership"
              name="houseOwnership"
              value={surveyData.houseOwnership}
              onChange={handleInputChange}
              required
            >
              <option value="자가 주택">자가 주택</option>
              <option value="월세 주택">월세 주택</option>
              <option value="전세 주택">전세 주택</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="familyForm">가족 구성</label>
            <select
              id="familyForm"
              name="familyForm"
              value={surveyData.familyForm}
              onChange={handleInputChange}
              required
            >
              <option value="혼자 사는 1인 가구">혼자 사는 1인 가구</option>
              <option value="부부만 있는 가구(아이 없음)">부부만 있는 가구(아이 없음)</option>
              <option value="어린이가 있는 가구">어린이가 있는 가구</option>
              <option value="청소년 또는 성인 자녀가 있는 가구">청소년 또는 성인 자녀가 있는 가구</option>
              <option value="노인이 있는 가구">노인이 있는 가구</option>
              <option value="다자녀 가구">다자녀 가구</option>
              <option value="반려 동물이 이미 있는 가구">반려 동물이 이미 있는 가구</option>
              <option value="대가족(3세대 이상 함께 거주)">대가족(3세대 이상 함께 거주)</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="personality">성격</label>
            <select
              id="personality"
              name="personality"
              value={surveyData.personality}
              onChange={handleInputChange}
              required
            >
              <option value="내향형">내향형</option>
              <option value="외향형">외향형</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="activityLevel">활동성</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={surveyData.activityLevel}
              onChange={handleInputChange}
              required
            >
              <option value="조금 활발">조금 활발</option>
              <option value="보통">보통</option>
              <option value="매우 활발">매우 활발</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="dogSize">선호하는 견종 크기</label>
            <select
              id="dogSize"
              name="dogSize"
              value={surveyData.dogSize}
              onChange={handleInputChange}
              required
            >
              <option value="소형견">소형견</option>
              <option value="중형견">중형견</option>
              <option value="대형견">대형견</option>
            </select>
          </FormGroup>

          <SubmitButton type="submit">
            설문 제출하기
          </SubmitButton>
        </form>
      </SurveyWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

const SurveyWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h1 {
    text-align: center;
    color: ${theme.color.main};
    margin-bottom: 30px;
    font-size: 28px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
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
`;

const SubmitButton = styled.button`
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

export default Survey; 