import { useState, useEffect, useCallback } from 'react';
import { apiService } from './services';
import type { SurveyResult, Breed, RecommendationResult, AdoptionForm, ApiError } from './types';

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
