import { useState, useEffect, useCallback } from 'react';
import { apiService } from './services';
import type { 
  SurveyResult, 
  Breed, 
  RecommendationResult, 
  AdoptionForm, 
  ApiError, 
  LoginRequest, 
  LoginResponse, 
  UserRegistrationRequest, 
  UserRegistrationResponse,
  AdoptionResponse,
  AdoptionStatusUpdateRequest,
  Animal
} from './types';

// 견종 목록 조회 훅
export const useAvailableBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBreeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAvailableBreeds();
      setBreeds(data);
    } catch (err: any) {
      setError({
        status: err.response?.status,
        message: 'Failed to fetch breeds',
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  return { breeds, loading, error, refetch: fetchBreeds };
};

// 사용자 로그인 훈
 export const useLogin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const login = useCallback(async (loginData: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.login(loginData);
      setToken(data.access_token);
      // 토큰 저장
      localStorage.setItem('token', data.access_token);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '로그인 실패',
        details: err.message,
      };
      setError(errorData);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return { token, loading, error, login, logout };
};

// 사용자 등록 훈
export const useUserRegistration = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const registerUser = useCallback(async (userData: UserRegistrationRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = await apiService.registerUser(userData);
      setSuccess(true);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '사용자 등록 실패',
        details: err.message,
      };
      setError(errorData);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, registerUser };
};

// 입양 신청 목록 조회 훈 (관리자용)
export const useAdoptionsList = () => {
  const [adoptions, setAdoptions] = useState<AdoptionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAdoptions = useCallback(async (skip = 0, limit = 100) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdoptions(skip, limit);
      setAdoptions(data);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '입양 신청 목록 조회 실패',
        details: err.message,
      };
      setError(errorData);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdoptions();
  }, [fetchAdoptions]);

  return { adoptions, loading, error, fetchAdoptions };
};

// 특정 입양 신청 조회 훈 (관리자용)
export const useAdoptionDetail = (id?: number) => {
  const [adoption, setAdoption] = useState<AdoptionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAdoption = useCallback(async (adoptionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAdoptionById(adoptionId);
      setAdoption(data);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '입양 신청 조회 실패',
        details: err.message,
      };
      setError(errorData);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchAdoption(id);
    }
  }, [id, fetchAdoption]);

  return { adoption, loading, error, fetchAdoption };
};

// 입양 신청 상태 업데이트 훈 (관리자용)
export const useAdoptionStatusUpdate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateStatus = useCallback(async (id: number, updateData: AdoptionStatusUpdateRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = await apiService.updateAdoptionStatus(id, updateData);
      setSuccess(true);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '입양 신청 상태 업데이트 실패',
        details: err.message,
      };
      setError(errorData);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, updateStatus };
};

// 입양 신청 삭제 훈 (관리자용)
export const useAdoptionDelete = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteAdoption = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await apiService.deleteAdoption(id);
      setSuccess(true);
      return true;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '입양 신청 삭제 실패',
        details: err.message,
      };
      setError(errorData);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, deleteAdoption };
};

// 동물 정보 조회 훈
export const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAnimals();
      setAnimals(data);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: '동물 정보 조회 실패',
        details: err.message,
      };
      setError(errorData);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  return { animals, loading, error, fetchAnimals };
};

// 견종 추천 훅
export const useBreedRecommendation = () => {
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const getRecommendation = useCallback(async (surveyData: SurveyResult) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getRecommendation(surveyData);
      setRecommendation(data);
      return data;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: 'Failed to get recommendation',
        details: err.message,
      };
      setError(errorData);
      throw errorData;
    } finally {
      setLoading(false);
    }
  }, []);

  return { recommendation, loading, error, getRecommendation };
};

// 입양 신청 훅
export const useAdoptionSubmit = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const submitAdoption = useCallback(async (adoptionData: AdoptionForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await apiService.submitAdoption(adoptionData);
      setSuccess(true);
      return true;
    } catch (err: any) {
      const errorData: ApiError = {
        status: err.response?.status,
        message: 'Failed to submit adoption',
        details: err.message,
      };
      setError(errorData);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { success, loading, error, submitAdoption };
};
