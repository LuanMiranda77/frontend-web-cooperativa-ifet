import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    display: flex;
    align-items:center;
    label{
        color: ${color=>(color.theme.title === 'dark' ? color.theme.colors.textLabel : color.theme.colors.primary)};
        font-weight:bold;
    }

    input{
        transform : scale(1.6);
        background-color: red;
    }
    
    input:checked{
        accent-color: ${color=>(color.theme.title === 'dark' ? color.theme.colors.textLabel : color.theme.colors.primary)};
    }
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

