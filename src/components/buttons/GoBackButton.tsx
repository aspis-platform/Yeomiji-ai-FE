import styled from "styled-components";
import { theme } from "../../style/theme";
import arrow_back from "../../assets/arrow_back.svg";

interface Prop {
  goBack: () => void;
}

const GoBackButton = ({ goBack }: Prop) => {
  return (
    <Button onClick={goBack}>
      <img src={arrow_back} />
      <span>이전</span>
    </Button>
  );
};

const Button = styled.button`
  height: 52px;
  display: flex;
  flex-direction: row;
  padding: 14px 15px;
  border: 1px solid ${theme.color.gray1};
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.color.gray1};
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default GoBackButton;
