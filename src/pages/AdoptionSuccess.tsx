import styled from 'styled-components';
import { theme } from '../style/theme';
import { useNavigate } from 'react-router-dom';

const AdoptionSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SuccessWrapper>
        <h1>입양 신청이 완료되었습니다!</h1>
        <p>입양 신청이 성공적으로 접수되었습니다.</p>
        <p>검토 후 연락드리도록 하겠습니다.</p>
        <ButtonGroup>
          <HomeButton onClick={() => navigate('/')}>
            홈으로 돌아가기
          </HomeButton>
        </ButtonGroup>
      </SuccessWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

const SuccessWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h1 {
    color: ${theme.color.main};
    margin-bottom: 20px;
    font-size: 28px;
  }
  
  p {
    color: #666;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${theme.color.main};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.color.mainDark};
    transform: translateY(-2px);
  }
`;

export default AdoptionSuccess; 