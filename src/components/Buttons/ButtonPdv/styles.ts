import styled from "styled-components";

interface styleButton{
    tipo: string
}

export const Container  = styled.button<styleButton>`
    background-color: ${props => (props.tipo === 'ESC' ?  color => color.theme.colors.error :color => color.theme.colors.success) };
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s;
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0px 2px 5px  black;
    padding: 0.3rem;
    width: 100%;
    height: 100%;

    &:hover {
        transform: translateX(5px) translateY(-7px);
        opacity : 0.8;
    }




    //adicionar stylos

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

