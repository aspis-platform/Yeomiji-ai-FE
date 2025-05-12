import styled from "styled-components";
import { theme } from "../../style/theme";
import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

const Input = () => {
  const { job, setJob } = useSurvey();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
  };

  return (
    <InputComponent 
      type="text" 
      placeholder="직업을 입력하세요" 
      value={job}
      onChange={handleChange}
    />
  );
};

const InputComponent = styled.input`
  width: 100%;
  padding: 18px;
  font-size: 20px;
  font-weight: 500;
  border: 2px solid ${theme.color.gray2};
  border-radius: 10px;
  ::placeholder {
    color: ${theme.color.gray1};
  }
`;

export default Input;
