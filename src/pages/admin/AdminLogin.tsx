import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme';
import { useLogin } from '../../api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const result = await login({ username, password });
      
      if (result) {
        // 로그인 성공, 관리자 대시보드로 이동
        navigate('/admin/dashboard');
      } else {
        setErrorMessage('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>관리자 로그인</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="관리자 아이디"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </FormGroup>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </SubmitButton>
        </form>
        <HomeLink onClick={() => navigate('/')}>홈으로 돌아가기</HomeLink>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f7f9fc;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.color.main};
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: ${theme.color.main};
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin-bottom: 16px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${theme.color.main};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${theme.color.mainDark};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const HomeLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: ${theme.color.main};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default AdminLogin;
