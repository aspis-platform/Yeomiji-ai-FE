import styled from "styled-components";
import { theme } from "../../style/theme";

interface Prop {
  text: string;
}

const SelectionButton = ({ text }: Prop) => {
  return <Button>{text}</Button>;
};

const Button = styled.button`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.color.gray2};
  background-color: white;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
`;

export default SelectionButton;
