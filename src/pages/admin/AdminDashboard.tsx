const SectionTitle = styled.h2`
  font-size: 22px;
  color: ${theme.color.main};
  margin: 20px 0;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e8e8e8;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? theme.color.main : 'transparent'};
  color: ${props => props.active ? theme.color.main : '#666'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${theme.color.main};
  }
`;

const AnimalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const AnimalCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AnimalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const AnimalInfo = styled.div`
  padding: 16px;
`;

const AnimalName = styled.h3`
  font-size: 18px;
  margin: 0 0 4px 0;
  color: #333;
`;

const AnimalBreed = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.main};
  margin-bottom: 12px;
`;

const AnimalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #666;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme';
import { useAdoptionsList, useAnimals } from '../../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adoptions, loading, error, fetchAdoptions } = useAdoptionsList();
  const { animals, loading: animalsLoading, error: animalsError, fetchAnimals } = useAnimals();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('adoptions'); // 'adoptions' 또는 'animals'

  // 견종 ID를 견종 이름으로 변환하는 함수
  const getBreedNameById = (breedId: string) => {
    const animal = animals.find(animal => animal.breedId === breedId);
    return animal ? animal.breed : '알 수 없는 견종';
  };

  useEffect(() => {
    // 토큰 확인 - 로그인 여부 체크
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }

    // 동물 정보와 입양 신청 목록 함께 가져오기
    fetchAnimals();
    fetchAdoptions();
  }, [navigate, fetchAnimals, fetchAdoptions]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleViewDetails = (id: number) => {
    navigate(`/admin/adoptions/${id}`);
  };

  const handleRefresh = () => {
    if (activeTab === 'adoptions') {
      fetchAdoptions();
    } else {
      fetchAnimals();
    }
  };

  // 필터링된 입양 신청 목록
  const filteredAdoptions = adoptions
    .filter(adoption => 
      (statusFilter === 'all' || adoption.status === statusFilter) &&
      (searchTerm === '' || 
       adoption.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       adoption.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       adoption.phone.includes(searchTerm))
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // 상태별 카운트
  const statusCounts = {
    all: adoptions.length,
    pending: adoptions.filter(a => a.status === 'pending').length,
    approved: adoptions.filter(a => a.status === 'approved').length,
    rejected: adoptions.filter(a => a.status === 'rejected').length
  };

  return (
    <Container>
      <Header>
        <Title>관리자 대시보드</Title>
        <HeaderActions>
          <RefreshButton onClick={handleRefresh}>
            새로고침
          </RefreshButton>
          <LogoutButton onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </HeaderActions>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'adoptions'} 
          onClick={() => setActiveTab('adoptions')}
        >
          입양 신청 관리
        </Tab>
        <Tab 
          active={activeTab === 'animals'} 
          onClick={() => setActiveTab('animals')}
        >
          보호 동물 목록
        </Tab>
      </TabsContainer>

      {activeTab === 'adoptions' ? (
        <>
          <SectionTitle>입양 신청 목록</SectionTitle>
          <FilterSection>
            <StatusFilters>
              <StatusButton 
                active={statusFilter === 'all'} 
                onClick={() => setStatusFilter('all')}
              >
                전체 ({statusCounts.all})
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'pending'} 
                onClick={() => setStatusFilter('pending')}
                color="#e6c700"
              >
                대기중 ({statusCounts.pending})
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'approved'} 
                onClick={() => setStatusFilter('approved')}
                color="#52c41a"
              >
                승인 ({statusCounts.approved})
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'rejected'} 
                onClick={() => setStatusFilter('rejected')}
                color="#f5222d"
              >
                거절 ({statusCounts.rejected})
              </StatusButton>
            </StatusFilters>
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="이름, 이메일, 전화번호 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
          </FilterSection>

          {loading ? (
            <LoadingMessage>입양 신청 목록을 불러오는 중...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>
              <p>입양 신청 목록을 불러오는데 실패했습니다.</p>
              <p>{error.message}</p>
              <RetryButton onClick={handleRefresh}>
                다시 시도하기
              </RetryButton>
            </ErrorMessage>
          ) : filteredAdoptions.length === 0 ? (
            <NoDataMessage>
              {searchTerm || statusFilter !== 'all' 
                ? '검색 결과가 없습니다.' 
                : '입양 신청 내역이 없습니다.'}
            </NoDataMessage>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <th>No.</th>
                    <th>신청자</th>
                    <th>신청일</th>
                    <th>견종</th>
                    <th>상태</th>
                    <th>액션</th>
                  </tr>
                </TableHead>
                <TableBody>
                  {filteredAdoptions.map((adoption, index) => (
                    <tr key={adoption.id}>
                      <td>{index + 1}</td>
                      <td>
                        <AdopterInfo>
                          <AdopterName>{adoption.name}</AdopterName>
                          <AdopterContact>{adoption.email} | {adoption.phone}</AdopterContact>
                        </AdopterInfo>
                      </td>
                      <td>{new Date(adoption.created_at).toLocaleDateString()}</td>
                      <td>{getBreedNameById(adoption.dog_breed) || '미지정'}</td>
                      <td>
                        <StatusBadge status={adoption.status}>
                          {adoption.status === 'pending' && '대기중'}
                          {adoption.status === 'approved' && '승인됨'}
                          {adoption.status === 'rejected' && '거절됨'}
                        </StatusBadge>
                      </td>
                      <td>
                        <ActionButton onClick={() => handleViewDetails(adoption.id)}>
                          상세보기
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <>
          <SectionTitle>보호 동물 목록</SectionTitle>
          <SearchBar style={{ marginBottom: '20px', maxWidth: '100%' }}>
            <SearchInput
              type="text"
              placeholder="동물 이름 또는 견종 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          {animalsLoading ? (
            <LoadingMessage>동물 정보를 불러오는 중...</LoadingMessage>
          ) : animalsError ? (
            <ErrorMessage>
              <p>동물 정보를 불러오는데 실패했습니다.</p>
              <p>{animalsError.message}</p>
              <RetryButton onClick={handleRefresh}>
                다시 시도하기
              </RetryButton>
            </ErrorMessage>
          ) : (
            <AnimalsGrid>
              {animals
                .filter(animal => 
                  animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(animal => (
                  <AnimalCard key={animal.id}>
                    <AnimalImage src={animal.profileUrl || 'https://via.placeholder.com/150'} alt={animal.name} />
                    <AnimalInfo>
                      <AnimalName>{animal.name}</AnimalName>
                      <AnimalBreed>{animal.breed}</AnimalBreed>
                      <AnimalDetails>
                        <DetailItem>성별: {animal.sex === 'MALE' ? '수컷' : '암컷'}</DetailItem>
                        <DetailItem>생년: {animal.birthYear}년</DetailItem>
                        <DetailItem>중성화: {animal.isNeutered ? '완료' : '미완료'}</DetailItem>
                      </AnimalDetails>
                    </AnimalInfo>
                  </AnimalCard>
                ))
              }
            </AnimalsGrid>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const Title = styled.h1`
  color: ${theme.color.main};
  font-size: 28px;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const LogoutButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const RefreshButton = styled.button`
  background-color: ${theme.color.main};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${theme.color.mainDark};
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const StatusFilters = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 10px;
    width: 100%;
  }
`;

const StatusButton = styled.button<{ active: boolean; color?: string }>`
  background-color: ${props => props.active ? (props.color || theme.color.main) : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? (props.color || theme.color.main) : '#e0e0e0'};
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${theme.color.main};
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #f0f5ff;
  
  th {
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: ${theme.color.main};
    border-bottom: 1px solid #e8e8e8;
    
    &:first-child {
      width: 70px;
    }
    
    &:last-child {
      width: 100px;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: #f9f9f9;
    }
    
    td {
      padding: 16px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
`;

const AdopterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdopterName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const AdopterContact = styled.div`
  font-size: 12px;
  color: #777;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
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

const ActionButton = styled.button`
  background-color: ${theme.color.main};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  
  &:hover {
    background-color: ${theme.color.mainDark};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${theme.color.main};
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  border-left: 4px solid #ff4d4f;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #555;
  font-size: 18px;
`;

const NoDataMessage = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  text-align: center;
  color: #888;
  border-radius: 8px;
`;

const RetryButton = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff7875;
    transform: translateY(-2px);
  }
`;

export default AdminDashboard;
