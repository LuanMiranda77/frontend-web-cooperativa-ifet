import { ButtonIcon } from './index';
import styled from "styled-components";

interface ButtonIconProps{
    background?:string;
    width?: string;
    borderColor?: string;
    color?: string;
}

export const Container  = styled.button<ButtonIconProps>`

    //adicionar stylos
    display: flex;
    padding-top: 0.1rem;
    padding-left: 9px;
    padding-right: 25px;
    width: ${props => props?.width};
    text-align: center;
    align-items: center ;
    justify-content: space-between;
    background-color: ${props => props.background ? props.background : props.theme.colors.primary};
    cursor: pointer;
    border-radius: 8px;
    height:var(--max-height-button);
    color: ${props => props.color?  props.color : props.theme.colors.textLabel};
    transition: all 0.3s;
    /* position: relative; */
    font-weight: bold;
    overflow: hidden;
    border: 2px solid ${props => props.borderColor?  props.borderColor : props.background};
    font-size:15px;
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.5);
    
    &:hover {
        /* transform: translateX(5px) translateY(-7px); */
        opacity : 0.8;
        box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.5);
    }



    
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

