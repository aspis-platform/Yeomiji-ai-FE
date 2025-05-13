// 선택 타입
export type JobType = string;
export type HouseType = '아파트' | '빌라' | '단독주택';
export type HouseOwnershipType = '자가 주택' | '월세 주택' | '전세 주택';
export type FamilyFormType = 
  | '혼자 사는 1인 가구'
  | '부부만 있는 가구(아이 없음)'
  | '어린이가 있는 가구'
  | '청소년 또는 성인 자녀가 있는 가구'
  | '노인이 있는 가구'
  | '다자녀 가구'
  | '반려 동물이 이미 있는 가구'
  | '대가족(3세대 이상 함께 거주)';
export type PersonalityType = '내향형' | '외향형';
export type ActivityLevelType = '조금 활발' | '보통' | '매우 활발';
export type DogSizeType = '소형견' | '중형견' | '대형견';

export interface SurveyResult {
  job: JobType;
  houseType: HouseType;
  houseOwnership: HouseOwnershipType;
  familyForm: FamilyFormType;
  personality: PersonalityType;
  activityLevel: ActivityLevelType;
  dogSize: DogSizeType;
}

export interface Breed {
  id: number;
  name: string;
  size: string;
  description: string;
  imageUrl?: string;
  compatibilityScore?: number;
}

// 사용자 인증 DTO
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// 사용자 등록 DTO
export interface UserRegistrationRequest {
  username: string;
  password: string;
  is_admin: boolean;
}

export interface UserRegistrationResponse {
  id: number;
  username: string;
  is_admin: boolean;
}

// 입양 신청 상태 업데이트 DTO
export interface AdoptionStatusUpdateRequest {
  status: "pending" | "approved" | "rejected";
  dog_breed?: string;
}

// 동물 정보 DTO - 동가


export interface RecommendationResult {
  recommendations: {
    rank: number;
    breed: string;
    reason: string;
  }[];
}

// 입양 신청 요청 DTO
export interface AdoptionForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  house_type: string;
  ownership: string;
  family_type: string;
  personality: string;
  activity_preference: string;
  size_preference: string;
  dog_breed?: string; // 선택 사항
}

// 입양 신청 응답 DTO
export interface AdoptionResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  house_type: string;
  ownership: string;
  family_type: string;
  personality: string;
  activity_preference: string;
  size_preference: string;
  dog_breed: string;
  status: string; // "pending", "approved", "rejected" 중 하나
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  status?: number;
  message: string;
  details?: string;
}

export interface AnimalWeight {
  id: string;
  animalId: string;
  weight: number;
  date: string;
}

export interface BreedInfo {
  breedName: string;
  breedSize: 'SMALL' | 'MEDIUM' | 'LARGE';
}

export interface Animal {
  id: string;
  name: string;
  breed: string;
  breedId: string;
  size: string;
  sex: string;
  birthYear: number;
  profileUrl: string;
  isNeutered?: boolean;
}
