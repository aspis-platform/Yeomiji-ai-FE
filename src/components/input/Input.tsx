import styled from "styled-components";
import { theme } from "../../style/theme";
import { useEffect, useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

const Input = () => {
  const { job, setJob } = useSurvey();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customJob, setCustomJob] = useState("");

  // 선택 가능한 직업 목록
  const jobOptions = [
    "회사원",
    "자영업",
    "학생",
    "전문직",
    "프리랜서"
  ];

  // 기타 직업이 선택되었는지 확인
  useEffect(() => {
    // job이 있고 미리 정의된 옵션에 없는 경우
    if (job && !jobOptions.includes(job)) {
      setShowCustomInput(true);
      setCustomJob(job);
    } else {
      setShowCustomInput(false);
    }
  }, [job, jobOptions]);

  const handleJobSelect = (selectedJob: string) => {
    if (selectedJob === "기타") {
      setShowCustomInput(true);
      // 기타를 선택했을 때는 job을 비워둘
      setJob("");
    } else {
      setShowCustomInput(false);
      setJob(selectedJob);
    }
  };

  const handleCustomJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomJob(value);
    setJob(value);
  };

  return (
    <Container>
      <JobButtonContainer>
        {jobOptions.map((option) => (
          <JobButton
            key={option}
            type="button"
            selected={job === option}
            onClick={() => handleJobSelect(option)}
          >
            {option}
          </JobButton>
        ))}
        <JobButton
          type="button"
          selected={showCustomInput}
          onClick={() => handleJobSelect("기타")}
          isOther
        >
          기타
        </JobButton>
      </JobButtonContainer>

      {showCustomInput && (
        <CustomJobInput
          type="text"
          placeholder="직업을 입력해주세요"
          value={customJob}
          onChange={handleCustomJobChange}
          autoFocus
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const JobButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
`;

const JobButton = styled.button<{ selected: boolean; isOther?: boolean }>`
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1 0 calc(33.333% - 12px);
  border: 2px solid ${props => props.selected ? theme.color.main : theme.color.gray2};
  background-color: ${props => props.selected ? theme.color.main : 'white'};
  color: ${props => props.selected ? 'white' : theme.color.gray1};
  position: relative;
  overflow: hidden;
  
  ${props => props.isOther && props.selected && `
    background-color: #f0f0f0;
    border-color: ${theme.color.main};
    color: ${theme.color.main};
  `}
  
  &:hover {
    border-color: ${theme.color.main};
    background-color: ${props => props.selected ? theme.color.main : '#f8f9fa'};
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: ${props => props.selected ? 'white' : theme.color.main};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  }
  
  &:active::after {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
    transition: 0s;
  }
  
  @media (max-width: 576px) {
    flex: 1 0 calc(50% - 12px);
  }
`;

const CustomJobInput = styled.input`
  width: 100%;
  padding: 18px;
  font-size: 18px;
  font-weight: 500;
  border: 2px solid ${theme.color.main};
  border-radius: 10px;
  background-color: white;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease-in-out;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(87, 143, 202, 0.25);
  }
  
  ::placeholder {
    color: ${theme.color.gray1};
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Input;
