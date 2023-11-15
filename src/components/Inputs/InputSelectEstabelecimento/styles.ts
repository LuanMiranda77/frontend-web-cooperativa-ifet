import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    .input{
        width: 35rem;
        .css-tlfecz-indicatorContainer{
            color: ${color => color.theme.colors.primary};
            font-weight: bold;
        }
    }

@media screen and (max-width: 40em) {
    .input{
        width: 13rem;
    }
}

`;

