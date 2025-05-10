import styled from "styled-components";
import { theme } from "../../style/theme";

const Input = () => {
  return <InputComponent type="text" placeholder="직업을 입력하세요" />;
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
