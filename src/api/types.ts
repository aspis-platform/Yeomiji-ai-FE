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

export interface Recommendation {
  breed: string;
  reason: string;
}

export interface RecommendationResult {
  recommendations: Recommendation[];
}

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
  dog_breed: string;
  userSurvey?: {
    job: string;
    house_type: string;
    house_ownership: string;
    family_form: string;
    personality: string;
    activity_level: string;
    dog_size: string;
  };
}

export interface AdoptionResponse {
  id: string;
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
  status: string;
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
  breedInfo: {
    breedName: string;
  };
  sex: 'MALE' | 'FEMALE';
  isNeutered: boolean;
  profileUrl: string;
  breedId: string;
}
