// types.ts에서 모든 타입 정의 가져오기
export type { 
  SurveyResult,
  Breed,
  RecommendationResult,
  AdoptionForm,
  ApiError,
  JobType,
  HouseType,
  HouseOwnershipType,
  FamilyFormType,
  PersonalityType,
  DogSizeType,
  ActivityLevelType
} from './types';

// API 구성 내보내기
export { api } from './config';
export { apiService } from './services';
export { useAvailableBreeds, useBreedRecommendation, useAdoptionSubmit } from './hooks';
