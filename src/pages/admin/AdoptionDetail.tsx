import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme';
import { useAdoptionDetail, useAdoptionStatusUpdate, useAdoptionDelete, useAnimals } from '../../api';
import type { AdoptionStatusUpdateRequest } from '../../api/types';

const AdoptionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { adoption, loading, error, fetchAdoption } = useAdoptionDetail(id ? parseInt(id) : undefined);
  const { updateStatus, loading: updateLoading } = useAdoptionStatusUpdate();
  const { deleteAdoption, loading: deleteLoading } = useAdoptionDelete();
  const { animals, loading: animalsLoading } = useAnimals();
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // 견종 ID를 견종 이름으로 변환하는 함수
  const getBreedNameById = (breedId: string | undefined) => {
    if (!breedId) return '미지정';
    const animal = animals.find(animal => animal.breedId === breedId);
    return animal ? animal.breed : '알 수 없는 견종';
  };
  
  // 초기 데이터 로드
  useEffect(() => {
    // 토큰 확인 - 로그인 여부 체크
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // 동물 정보 불러오기
    if (id) {
      fetchAdoption(parseInt(id));
    }
  }, [id, fetchAdoption, navigate]);
  
  // 자동 새로고침 설정 (주석 처리 됨)
  useEffect(() => {
    // 5초마다 데이터 새로고침 - 상세 페이지는 자동 새로고침이 필요하지 않음
    // 필요하면 아래 코드를 사용할 수 있음
    /*
    const refreshIntervalRef = setInterval(() => {
      console.log('Auto refresh detail data...');
      if (id) {
        fetchAdoption(parseInt(id));
        fetchAnimals();
      }
    }, 5000);

    return () => {
      clearInterval(refreshIntervalRef);
    };
    */
  }, []);
  
  const handleStatusChange = async (status: "pending" | "approved" | "rejected") => {
    if (!id) return;
    
    const updateData: AdoptionStatusUpdateRequest = { status };
    
    try {
      await updateStatus(parseInt(id), updateData);
      fetchAdoption(parseInt(id)); // 데이터 리로드
    } catch (error) {
      console.error('상태 업데이트 실패:', error);
    }
  };
  
  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await deleteAdoption(parseInt(id));
      navigate('/admin/dashboard'); // 삭제 후 대시보드로 이동
    } catch (error) {
      console.error('입양 신청 삭제 실패:', error);
    }
  };
  
  const handleBack = () => {
    navigate('/admin/dashboard');
  };
  
  if (loading || animalsLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>돌아가기</BackButton>
          <Title>
            <Skeleton width="300px" height="32px" />
          </Title>
          <Skeleton width="80px" height="30px" borderRadius="16px" />
        </Header>
        
        <ContentSection>
          <SectionTitle>신청자 정보</SectionTitle>
          <InfoGrid>
            {[1, 2, 3, 4].map((_, index) => (
              <InfoItem key={`skeleton-info-${index}`}>
                <InfoLabel>
                  <Skeleton width="100px" height="14px" />
                </InfoLabel>
                <InfoValue>
                  <Skeleton width="200px" height="16px" />
                </InfoValue>
              </InfoItem>
            ))}
          </InfoGrid>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>환경 정보</SectionTitle>
          <InfoGrid>
            {[1, 2, 3].map((_, index) => (
              <InfoItem key={`skeleton-env-${index}`}>
                <InfoLabel>
                  <Skeleton width="100px" height="14px" />
                </InfoLabel>
                <InfoValue>
                  <Skeleton width="200px" height="16px" />
                </InfoValue>
              </InfoItem>
            ))}
          </InfoGrid>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>성향 정보</SectionTitle>
          <InfoGrid>
            {[1, 2, 3, 4].map((_, index) => (
              <InfoItem key={`skeleton-pref-${index}`}>
                <InfoLabel>
                  <Skeleton width="120px" height="14px" />
                </InfoLabel>
                <InfoValue>
                  <Skeleton width="180px" height="16px" />
                </InfoValue>
              </InfoItem>
            ))}
          </InfoGrid>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>신청 관리</SectionTitle>
          <StatusButtonsSkeleton>
            <Skeleton width="33%" height="40px" borderRadius="8px" />
            <Skeleton width="33%" height="40px" borderRadius="8px" />
            <Skeleton width="33%" height="40px" borderRadius="8px" />
          </StatusButtonsSkeleton>
        </ContentSection>
      </Container>
    );
  }
  
  if (error || !adoption) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          <p>입양 신청 정보를 불러오는데 실패했습니다.</p>
          <p>{error?.message || '해당 ID의 입양 신청을 찾을 수 없습니다.'}</p>
        </ErrorMessage>
        <BackButton onClick={handleBack}>돌아가기</BackButton>
      </ErrorContainer>
    );
  }
  
  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>돌아가기</BackButton>
        <Title>입양 신청 상세 정보</Title>
        <StatusBadge status={adoption.status}>
          {adoption.status === 'pending' && '대기중'}
          {adoption.status === 'approved' && '승인됨'}
          {adoption.status === 'rejected' && '거절됨'}
        </StatusBadge>
      </Header>
      
      <ContentSection>
        <SectionTitle>신청자 정보</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>이름</InfoLabel>
            <InfoValue>{adoption.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>이메일</InfoLabel>
            <InfoValue>{adoption.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>전화번호</InfoLabel>
            <InfoValue>{adoption.phone}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>주소</InfoLabel>
            <InfoValue>{adoption.address}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </ContentSection>
      
      <ContentSection>
        <SectionTitle>환경 정보</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>주거 형태</InfoLabel>
            <InfoValue>{adoption.house_type}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>주택 소유 형태</InfoLabel>
            <InfoValue>{adoption.ownership}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>가족 구성</InfoLabel>
            <InfoValue>{adoption.family_type}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </ContentSection>
      
      <ContentSection>
        <SectionTitle>성향 정보</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>신청자 성격</InfoLabel>
            <InfoValue>{adoption.personality}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>활동성 선호도</InfoLabel>
            <InfoValue>{adoption.activity_preference}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>견종 크기 선호도</InfoLabel>
            <InfoValue>{adoption.size_preference}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>신청 견종</InfoLabel>
            <InfoValue>{getBreedNameById(adoption.dog_breed)}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </ContentSection>
      
      <ContentSection>
        <SectionTitle>신청 관리</SectionTitle>
        <ActionsContainer>
          <StatusButtons>
            <StatusActionButton 
              status="pending" 
              active={adoption.status === 'pending'} 
              onClick={() => handleStatusChange('pending')}
              disabled={updateLoading || adoption.status === 'pending'}
            >
              대기중으로 변경
            </StatusActionButton>
            <StatusActionButton 
              status="approved" 
              active={adoption.status === 'approved'} 
              onClick={() => handleStatusChange('approved')}
              disabled={updateLoading || adoption.status === 'approved'}
            >
              승인하기
            </StatusActionButton>
            <StatusActionButton 
              status="rejected" 
              active={adoption.status === 'rejected'} 
              onClick={() => handleStatusChange('rejected')}
              disabled={updateLoading || adoption.status === 'rejected'}
            >
              거절하기
            </StatusActionButton>
          </StatusButtons>
          
          {!confirmDelete ? (
            <DeleteButton onClick={() => setConfirmDelete(true)}>
              입양 신청 삭제
            </DeleteButton>
          ) : (
            <DeleteConfirmation>
              <p>정말 삭제하시겠습니까?</p>
              <DeleteConfirmButtons>
                <ConfirmDeleteButton onClick={handleDelete} disabled={deleteLoading}>
                  {deleteLoading ? '삭제 중...' : '예, 삭제합니다'}
                </ConfirmDeleteButton>
                <CancelDeleteButton onClick={() => setConfirmDelete(false)}>
                  취소
                </CancelDeleteButton>
              </DeleteConfirmButtons>
            </DeleteConfirmation>
          )}
        </ActionsContainer>
      </ContentSection>
      
      <MetaInfo>
        <MetaInfoItem>신청일: {new Date(adoption.created_at).toLocaleString()}</MetaInfoItem>
        <MetaInfoItem>마지막 업데이트: {new Date(adoption.updated_at).toLocaleString()}</MetaInfoItem>
      </MetaInfo>
    </Container>
  );
};

// 스타일 컴포넌트 정의
const Skeleton = styled.div<{
  width: string;
  height: string;
  borderRadius?: string;
  marginBottom?: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius || '4px'};
  margin-bottom: ${props => props.marginBottom || '0'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const StatusButtonsSkeleton = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  color: ${theme.color.main};
  font-size: 28px;
  margin: 0;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    margin: 16px 0;
  }
`;

const BackButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &::before {
    content: '←';
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background-color: #fffbe6;
          color: #e6c700;
        `;
      case 'approved':
        return `
          background-color: #f6ffed;
          color: #52c41a;
        `;
      case 'rejected':
        return `
          background-color: #fff1f0;
          color: #f5222d;
        `;
      default:
        return `
          background-color: #e6f7ff;
          color: #1890ff;
        `;
    }
  }}
`;

const ContentSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${theme.color.main};
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #777;
`;

const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatusActionButton = styled.button<{ status: string; active: boolean }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  flex: 1;
  
  ${props => {
    const baseStyles = `
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    
    switch (props.status) {
      case 'pending':
        return `
          background-color: ${props.active ? '#e6c700' : '#fffbe6'};
          color: ${props.active ? 'white' : '#e6c700'};
          &:hover:not(:disabled) {
            background-color: #e6c700;
            color: white;
          }
          ${baseStyles}
        `;
      case 'approved':
        return `
          background-color: ${props.active ? '#52c41a' : '#f6ffed'};
          color: ${props.active ? 'white' : '#52c41a'};
          &:hover:not(:disabled) {
            background-color: #52c41a;
            color: white;
          }
          ${baseStyles}
        `;
      case 'rejected':
        return `
          background-color: ${props.active ? '#f5222d' : '#fff1f0'};
          color: ${props.active ? 'white' : '#f5222d'};
          &:hover:not(:disabled) {
            background-color: #f5222d;
            color: white;
          }
          ${baseStyles}
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #333;
          &:hover:not(:disabled) {
            background-color: #e0e0e0;
          }
          ${baseStyles}
        `;
    }
  }}
`;

const DeleteButton = styled.button`
  background-color: #fff1f0;
  color: #f5222d;
  border: 1px solid #f5222d;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 16px;
  align-self: flex-end;
  
  &:hover {
    background-color: #ff4d4f;
    color: white;
  }
  
  @media (max-width: 768px) {
    align-self: stretch;
  }
`;

const DeleteConfirmation = styled.div`
  background-color: #fff1f0;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  
  p {
    color: #f5222d;
    font-weight: 500;
    margin: 0 0 16px 0;
  }
`;

const DeleteConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ConfirmDeleteButton = styled.button`
  background-color: #f5222d;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover:not(:disabled) {
    background-color: #ff4d4f;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelDeleteButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #d9d9d9;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const MetaInfoItem = styled.div``;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  color: ${theme.color.main};
  font-size: 18px;
`;

const ErrorContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  border-left: 4px solid #ff4d4f;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  color: #555;
  font-size: 16px;
  
  p {
    margin: 8px 0;
  }
`;

export default AdoptionDetail;
