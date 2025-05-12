import { api } from './config';
import type { 
  SurveyResult, 
  RecommendationResult, 
  AdoptionForm, 
  Breed 
} from './types';

// API 서비스 함수들
export const apiService = {
  // 견종 추천
  async getRecommendation(surveyData: SurveyResult): Promise<RecommendationResult> {
    // 필드명을 백엔드 형식에 맞게 변환
    const formattedData = {
      job: surveyData.job,
      house_type: surveyData.houseType,
      ownership: surveyData.houseOwnership,
      family_type: surveyData.familyForm,
      personality: surveyData.personality,
      activity_preference: surveyData.activityLevel,
      size_preference: surveyData.dogSize
    };
    
    const response = await api.post('/recommend', formattedData);
    return response.data;
  },

  // 가용한 견종 목록 조회
  async getAvailableBreeds(): Promise<Breed[]> {
    const response = await api.get('/available-breeds');
    return response.data;
  },

  // 입양 신청
  async submitAdoption(adoptionForm: AdoptionForm): Promise<void> {
    await api.post('/adoptions', adoptionForm);
  },

  // 관리자 로그인
  adminLogin: async (username: string, password: string) => {
    const response = await api.post('/token', {
      username,
      password,
    });
    return response.data;
  },
};
