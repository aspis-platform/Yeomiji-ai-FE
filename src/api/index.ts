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

export { api } from './config';
export { apiService } from './services';
export { useAvailableBreeds, useBreedRecommendation, useAdoptionSubmit } from './hooks';
