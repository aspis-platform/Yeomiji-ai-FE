import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { apiService } from '../api/services';
import type { 
  SurveyResult, 
  RecommendationResult, 
  Breed 
} from '../api/types';

// 타입 직접 정의
type JobType = string;
type HouseType = '아파트' | '빌라' | '단독주택';
type HouseOwnershipType = '자가 주택' | '월세 주택' | '전세 주택';
type FamilyFormType = 
  | '혼자 사는 1인 가구'
  | '부부만 있는 가구(아이 없음)'
  | '어린이가 있는 가구'
  | '청소년 또는 성인 자녀가 있는 가구'
  | '노인이 있는 가구'
  | '다자녀 가구'
  | '반려 동물이 이미 있는 가구'
  | '대가족(3세대 이상 함께 거주)';
type PersonalityType = '내향형' | '외향형';
type ActivityLevelType = '조금 활발' | '보통' | '매우 활발';
type DogSizeType = '소형견' | '중형견' | '대형견';

// 전체 설문 결과 타입
interface SurveyResult {
  job: JobType;
  houseType: HouseType;
  houseOwnership: HouseOwnershipType;
  familyForm: FamilyFormType;
  personality: PersonalityType;
  activityLevel: ActivityLevelType;
  dogSize: DogSizeType;
}

// 견종 정보 타입
interface Breed {
  id: number;
  name: string;
  size: string;
  description: string;
  imageUrl?: string;
  compatibilityScore?: number;
}

// 견종 추천 결과 타입
interface RecommendationResult {
  breeds: Breed[];
  reasonings: string[];
}

// 로컬 추천 훅 구현
const useBreedRecommendation = () => {
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const getRecommendation = useCallback(async (surveyData: SurveyResult) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.getRecommendation(surveyData);
      setRecommendation(result);
      return result;
    } catch (err: any) {
      setError({
        message: '추천을 가져오는데 실패했습니다.',
        details: err.message
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { recommendation, loading, error, getRecommendation };
};

interface SurveyContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  job: JobType;
  setJob: (job: JobType) => void;
  houseType: HouseType | null;
  setHouseType: (houseType: HouseType) => void;
  houseOwnership: HouseOwnershipType | null;
  setHouseOwnership: (ownership: HouseOwnershipType) => void;
  familyForm: FamilyFormType | null;
  setFamilyForm: (familyForm: FamilyFormType) => void;
  personality: PersonalityType | null;
  setPersonality: (personality: PersonalityType) => void;
  activityLevel: ActivityLevelType | null;
  setActivityLevel: (level: ActivityLevelType) => void;
  dogSize: DogSizeType | null;
  setDogSize: (size: DogSizeType) => void;
  surveyCompleted: boolean;
  getSurveyData: () => SurveyResult;
  recommendation: RecommendationResult | null;
  loading: boolean;
  error: any;
  submitSurvey: () => Promise<void>;
  clearSurvey: () => void;
  progressPercentage: number;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  // 현재 단계
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // 설문 응답 상태
  const [job, setJob] = useState<JobType>('');
  const [houseType, setHouseType] = useState<HouseType | null>(null);
  const [houseOwnership, setHouseOwnership] = useState<HouseOwnershipType | null>(null);
  const [familyForm, setFamilyForm] = useState<FamilyFormType | null>(null);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType | null>(null);
  const [dogSize, setDogSize] = useState<DogSizeType | null>(null);

  // 추천 API 훅
  const { recommendation, loading, error, getRecommendation } = useBreedRecommendation();

  // 설문 완료 여부
  const surveyCompleted = Boolean(
    job && houseType && houseOwnership && 
    familyForm && personality && activityLevel && dogSize
  );

  // 진행률 계산
  const progressPercentage = (currentStep / 8) * 100;

  // 설문 데이터 수집
  const getSurveyData = (): any => {
    if (!surveyCompleted) {
      throw new Error('Survey not completed');
    }
    
    return {
      job,
      houseType: houseType!,
      houseOwnership: houseOwnership!,
      familyForm: familyForm!,
      personality: personality!,
      activityLevel: activityLevel!,
      dogSize: dogSize!,
    };
  };

  // 설문 제출 및 결과 요청
  const submitSurvey = async () => {
    if (!surveyCompleted) return;
    
    try {
      const surveyData = getSurveyData();
      await getRecommendation(surveyData);
      setCurrentStep(8); // 결과 화면으로 이동
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  };

  // 설문 초기화
  const clearSurvey = () => {
    setJob('');
    setHouseType(null);
    setHouseOwnership(null);
    setFamilyForm(null);
    setPersonality(null);
    setActivityLevel(null);
    setDogSize(null);
    setCurrentStep(0);
  };

  return (
    <SurveyContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        job,
        setJob,
        houseType,
        setHouseType,
        houseOwnership,
        setHouseOwnership,
        familyForm,
        setFamilyForm,
        personality,
        setPersonality,
        activityLevel,
        setActivityLevel,
        dogSize,
        setDogSize,
        surveyCompleted,
        getSurveyData,
        recommendation,
        loading,
        error,
        submitSurvey,
        clearSurvey,
        progressPercentage
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
