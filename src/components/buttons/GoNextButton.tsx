import styled from "styled-components";
import { theme } from "../../style/theme";
import arrow from "../../assets/arrow.svg";

interface Prop {
  goToNext: () => void;
  disabled?: boolean;
}

const GoNextButton = ({ goToNext, disabled = false }: Prop) => {
  return (
    <Button onClick={goToNext} disabled={disabled}>
      <span>다음</span>
      <img src={arrow} />
    </Button>
  );
};

const Button = styled.button`
  height: 52px;
  display: flex;
  flex-direction: row;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, ${theme.color.main}, #4B6EAA);
  font-size: 20px;
  font-weight: 600;
  color: white;
  display: flex;
  flex-direction: row;
  gap: 10px;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(87, 143, 202, 0.3);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  img {
    transition: transform 0.3s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(87, 143, 202, 0.4);
    
    img {
      transform: translateX(4px);
    }
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
    background: linear-gradient(135deg, #4B6EAA, #375D96);
    box-shadow: 0 2px 8px rgba(87, 143, 202, 0.3);
    transition: all 0.1s ease;
  }
  
  &:disabled {
    background: linear-gradient(135deg, #a0b8d1, #8fa5c6);
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover:not(:disabled):after {
    transform: translateX(0);
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    20%, 100% {
      transform: translateX(100%);
    }
  }
`;

export default GoNextButton;
