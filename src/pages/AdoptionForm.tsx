import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate, useLocation } from "react-router-dom";
import { apiService } from "../api/services";
import type { AdoptionForm } from "../api/types";

const AdoptionFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breedId, surveyData } = location.state || {};

  const [formData, setFormData] = useState<AdoptionForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    house_type: surveyData?.houseType || "",
    ownership: surveyData?.houseOwnership || "",
    family_type: surveyData?.familyForm || "",
    personality: surveyData?.personality || "",
    activity_preference: surveyData?.activityLevel || "",
    size_preference: surveyData?.dogSize || "",
    dog_breed: breedId || ""
  });
  
  // 추가 데이터 (API에는 전달되지 않음)
  const surveyDataForContext = surveyData ? {
    job: surveyData.job,
    house_type: surveyData.houseType,
    house_ownership: surveyData.houseOwnership,
    family_form: surveyData.familyForm,
    personality: surveyData.personality,
    activity_level: surveyData.activityLevel,
    dog_size: surveyData.dogSize
  } : undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.submitAdoption(formData);
      navigate("/adoption-success");
    } catch (error) {
      console.error("입양 신청 실패:", error);
      alert("입양 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>입양 신청서</Title>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>기본 정보</SectionTitle>
            <InputGroup>
              <Label>이름</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="이름을 입력해주세요"
              />
            </InputGroup>
            <InputGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="이메일을 입력해주세요"
              />
            </InputGroup>
            <InputGroup>
              <Label>전화번호</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="전화번호를 입력해주세요"
              />
            </InputGroup>
            <InputGroup>
              <Label>주소</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="주소를 입력해주세요"
              />
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>거주 환경</SectionTitle>
            <InputGroup>
              <Label>주거 형태</Label>
              <Select
                name="house_type"
                value={formData.house_type}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="아파트">아파트</option>
                <option value="빌라">빌라</option>
                <option value="단독주택">단독주택</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>주거 형태</Label>
              <Select
                name="ownership"
                value={formData.ownership}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="자가 주택">자가 주택</option>
                <option value="월세 주택">월세 주택</option>
                <option value="전세 주택">전세 주택</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>가족 구성</Label>
              <Select
                name="family_type"
                value={formData.family_type}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="혼자 사는 1인 가구">혼자 사는 1인 가구</option>
                <option value="부부만 있는 가구(아이 없음)">부부만 있는 가구(아이 없음)</option>
                <option value="어린이가 있는 가구">어린이가 있는 가구</option>
                <option value="청소년 또는 성인 자녀가 있는 가구">청소년 또는 성인 자녀가 있는 가구</option>
                <option value="노인이 있는 가구">노인이 있는 가구</option>
                <option value="다자녀 가구">다자녀 가구</option>
                <option value="반려 동물이 이미 있는 가구">반려 동물이 이미 있는 가구</option>
                <option value="대가족(3세대 이상 함께 거주)">대가족(3세대 이상 함께 거주)</option>
              </Select>
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>성향 정보</SectionTitle>
            <InputGroup>
              <Label>성격</Label>
              <Select
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="내향형">내향형</option>
                <option value="외향형">외향형</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>활동성</Label>
              <Select
                name="activity_preference"
                value={formData.activity_preference}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="조금 활발">조금 활발</option>
                <option value="보통">보통</option>
                <option value="매우 활발">매우 활발</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>선호 견종 크기</Label>
              <Select
                name="size_preference"
                value={formData.size_preference}
                onChange={handleInputChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="소형견">소형견</option>
                <option value="중형견">중형견</option>
                <option value="대형견">대형견</option>
              </Select>
            </InputGroup>
          </FormSection>

          <SubmitButton type="submit">입양 신청하기</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f5f7fa;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${theme.color.main};
  text-align: center;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
`;

const SectionTitle = styled.h2`
  grid-column: 1 / -1;
  font-size: 24px;
  color: ${theme.color.main};
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${theme.color.main};
    outline: none;
    box-shadow: 0 0 0 3px rgba(87, 143, 202, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${theme.color.main};
    outline: none;
    box-shadow: 0 0 0 3px rgba(87, 143, 202, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 16px 32px;
  background: ${theme.color.main};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: ${theme.color.mainDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default AdoptionFormPage; 