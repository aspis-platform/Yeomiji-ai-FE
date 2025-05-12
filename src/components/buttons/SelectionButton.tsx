import styled from "styled-components";
import { theme } from "../../style/theme";

interface Prop {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

const SelectionButton = ({ text, selected = false, onClick }: Prop) => {
  return <Button selected={selected} onClick={onClick}>{text}</Button>;
};

const Button = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.selected ? theme.color.main : theme.color.gray2};
  background-color: ${props => props.selected ? 'rgba(87, 143, 202, 0.1)' : 'white'};
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.selected ? theme.color.main : 'inherit'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: ${props => props.selected ? '0' : '-100%'};
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(87, 143, 202, 0.1), rgba(87, 143, 202, 0.2));
    transition: all 0.4s ease;
    z-index: -1;
    opacity: ${props => props.selected ? '1' : '0'};
  }
  
  &:hover {
    border-color: ${theme.color.main};
    color: ${theme.color.main};
    
    &:before {
      left: 0;
      opacity: 1;
    }
  }
  
  &:active {
    transform: scale(0.98);
    border-color: ${theme.color.mainDark};
    background-color: rgba(87, 143, 202, 0.1);
    color: ${theme.color.mainDark};
  }
`;

export default SelectionButton;
