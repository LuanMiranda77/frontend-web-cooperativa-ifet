import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    .input{
        width: 100%;
        .css-1s2u09g-control{
            height: var(--max-height-button);

        }
        .css-tlfecz-indicatorContainer{
            color: ${color => color.theme.colors.primary};
            font-weight: bold;
            width: 100%;
        }
        /* border-bottom: 2px solid  ${color => color.theme.colors.primary}; */
        
    }

    .label{
        color: ${color => color.title !== 'dark'? color.theme.colors.primary : color.theme.colors.textLabel};
        font-size: 14px;
    }

@media screen and (max-width: 40em) {
    .input{
        width: 100%;
    }
}

`;

