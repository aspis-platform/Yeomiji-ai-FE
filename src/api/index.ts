export type { 
  SurveyResult,
  Breed,
  RecommendationResult,
  AdoptionForm,
  AdoptionResponse,
  ApiError,
  JobType,
  HouseType,
  HouseOwnershipType,
  FamilyFormType,
  PersonalityType,
  DogSizeType,
  ActivityLevelType,
  LoginRequest,
  LoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
  AdoptionStatusUpdateRequest,
  Animal
} from './types';

export { api } from './config';
export { apiService } from './services';
export { 
  useAvailableBreeds, 
  useBreedRecommendation, 
  useAdoptionSubmit,
  useLogin,
  useUserRegistration,
  useAdoptionsList,
  useAdoptionDetail,
  useAdoptionStatusUpdate,
  useAdoptionDelete,
  useAnimals
} from './hooks';
