import { SizeLogo } from '../../domain/enums';
import styled from "styled-components";

interface PropsColor{
    color?:string;
    size?:string | number;
}

export const Container  = styled.div<PropsColor>`
    //adicionar stylos
    .vertical{
        border-left: ${props=>props.size? props.size+'px':'1px'} solid ${props=> (props.color ? props.color : props.theme.colors.gray)};/* Adiciona borda esquerda na div como ser fosse uma linha.*/
    }

    .horizontal{
        margin-top: -1px;
        border: ${props=>props.size? props.size+'px':'1px'} solid ${props=> (props.color ? props.color : props.theme.colors.gray)};
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

