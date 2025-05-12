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
  padding: 14px 20px;
  border: 2px solid ${theme.color.gray2};
  border-radius: 12px;
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.color.gray1};
  display: flex;
  flex-direction: row;
  gap: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  img {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    border-color: ${theme.color.main};
    color: ${theme.color.main};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    
    img {
      transform: translateX(-4px);
    }
  }
  
  &:active {
    transform: scale(0.95);
    background-color: #f5f5f7;
    border-color: ${theme.color.mainDark};
    color: ${theme.color.mainDark};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.1s ease;
  }
`;

export default GoBackButton;
