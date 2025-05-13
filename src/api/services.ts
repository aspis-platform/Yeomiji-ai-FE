import axios from 'axios';
import type { 
  SurveyResult, 
  RecommendationResult, 
  AdoptionForm, 
  AdoptionResponse,
  Breed,
  Animal,
  LoginRequest,
  LoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
  AdoptionStatusUpdateRequest
} from './types';
import { api } from './config';

// API 기본 URL 설정
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

    const response = await api.post(`/recommend/`, transformedData);
    return response.data;
  },

  // 가용한 견종 목록 조회
  async getAvailableBreeds(): Promise<Breed[]> {
    const response = await api.get(`/available-breeds`);
    return response.data;
  },

  // 입양 신청
  async submitAdoption(formData: AdoptionForm): Promise<AdoptionResponse> {
    const response = await api.post(`/adoptions/`, formData);
    return response.data;
  },

  // 관리자 로그인
  // 사용자 인증 (JWT 토큰 발급)
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const response = await api.post(`/token/`, loginData);
    return response.data;
  },
  
  // 사용자 등록
  async registerUser(userData: UserRegistrationRequest): Promise<UserRegistrationResponse> {
    const response = await api.post(`/users/`, userData);
    return response.data;
  },

  // 입양 신청 목록 조회 (관리자용)
  async getAdoptions(skip = 0, limit = 100): Promise<AdoptionResponse[]> {
    const response = await api.get(`/adoptions/`, {
      params: { skip, limit }
    });
    return response.data;
  },
  
  // 특정 입양 신청 조회 (관리자용)
  async getAdoptionById(id: number): Promise<AdoptionResponse> {
    const response = await api.get(`/adoptions/${id}`);
    return response.data;
  },
  
  // 입양 신청 상태 업데이트 (관리자용)
  async updateAdoptionStatus(id: number, updateData: AdoptionStatusUpdateRequest): Promise<AdoptionResponse> {
    const response = await api.put(`/adoptions/${id}`, updateData);
    return response.data;
  },
  
  // 입양 신청 삭제 (관리자용)
  async deleteAdoption(id: number): Promise<void> {
    await api.delete(`/adoptions/${id}`);
  },
  
  // 동물 정보 조회
  async getAnimals(): Promise<Animal[]> {
    const response = await axios.get(`${BASE_URL}/animals/get-all`);
    
    // API 응답 구조에 맞게 데이터 변환
    const transformedData = response.data.map((animal: any) => ({
      id: animal.id,
      name: animal.name,
      breed: animal.breedInfo?.breedName || '',
      breedId: animal.breedId,
      size: animal.breedInfo?.breedSize || '',
      sex: animal.sex,
      birthYear: animal.birthYear,
      profileUrl: animal.profileUrl,
      isNeutered: animal.isNeutered
    }));
    
    return transformedData;
  }
};
