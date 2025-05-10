import styled from "styled-components";
import { theme } from "../../style/theme";
import arrow from "../../assets/arrow.svg";

interface Prop {
  goToNext: () => void;
}

const GoNextButton = ({ goToNext }: Prop) => {
  return (
    <Button onClick={goToNext}>
      <span>다음</span>
      <img src={arrow} />
    </Button>
  );
};

const Button = styled.button`
  height: 52px;
  display: flex;
  flex-direction: row;
  padding: 14px 15px;
  border: none;
  border-radius: 10px;
  background-color: ${theme.color.main};
  font-size: 20px;
  font-weight: 600;
  color: white;
  display: flex;
  flex-direction: row;
  gap: 10px;
  white-space: nowrap;
`;

export default GoNextButton;
