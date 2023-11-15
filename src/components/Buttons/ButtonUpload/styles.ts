import styled from "styled-components";

interface ButtonIconProps{
    color?:string;
    width?: string;
    borderColor?:string;
    backgroundColor?: string;
}


export const Container  = styled.label<ButtonIconProps>`
    //adicionar stylos
    input[type='file']{
        display: none;
    }

    cursor: pointer;
    display: flex;
    padding-top: 0.1rem;
    padding-left: 9px;
    padding-right: 10px;
    width: ${props => props.width};
    text-align: center;
    align-items: center ;
    /* justify-content: space-between; */
    background-color: ${porps => porps.backgroundColor ? porps.backgroundColor : porps.theme.colors.white};
    border-radius: 5px;
    height:var(--max-height-button);
    color: ${porps => porps.color ? porps.color : porps.theme.colors.primary};
    transition: all 0.3s;
    font-weight: bold;
    overflow: hidden;
    border: 2px solid  ${porps => porps.borderColor ? porps.borderColor : porps.theme.colors.white};
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.5);
    
    &:hover {
        /* transform: translateX(5px) translateY(-7px); */
        opacity : 0.9;
        box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.5);
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

