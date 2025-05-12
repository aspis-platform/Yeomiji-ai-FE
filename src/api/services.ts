import axios from 'axios';
import type { 
  SurveyResult, 
  RecommendationResult, 
  AdoptionForm, 
  AdoptionResponse,
  Breed,
  Animal
} from './types';

const BASE_URL = 'https://aspis-core-api.ncloud.sbs/v1';

// API 서비스 함수들
export const apiService = {
  // 견종 추천
  async getRecommendation(surveyData: SurveyResult): Promise<RecommendationResult> {
    // 프론트엔드 필드명을 백엔드 필드명으로 변환
    const transformedData = {
      job: surveyData.job,
      house_type: surveyData.houseType,
      ownership: surveyData.houseOwnership,
      family_type: surveyData.familyForm,
      personality: surveyData.personality,
      activity_preference: surveyData.activityLevel,
      size_preference: surveyData.dogSize
    };

    const response = await axios.post(`${BASE_URL}/recommend/`, transformedData);
    return response.data;
  },

  // 가용한 견종 목록 조회
  async getAvailableBreeds(): Promise<Breed[]> {
    const response = await axios.get(`${BASE_URL}/available-breeds`);
    return response.data;
  },

  // 입양 신청
  async submitAdoption(formData: AdoptionForm): Promise<AdoptionResponse> {
    const response = await axios.post(`${BASE_URL}/adoption/`, formData);
    return response.data;
  },

  // 관리자 로그인
  adminLogin: async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/token/`, {
      username,
      password,
    });
    return response.data;
  },

  async getShelterAnimals(): Promise<Animal[]> {
    const response = await axios.get(`${BASE_URL}/animals/get-all`);
    return response.data;
  }
};
