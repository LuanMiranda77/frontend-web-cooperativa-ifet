import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    grid-area: MH;
    background:${props =>props.theme.colors.primary};
    display: flex;
    align-items: center ;
    justify-content: space-between;
    text-align: right;
    padding: 0.9rem;
    border-bottom: 1px solid ${props =>props.theme.colors.gray};
    box-shadow: 3px 3px 0px black;

    .teste{
        cursor: pointer;
        font-weight: bold;
        border-color: ${props =>props.theme.colors.primary} transparent transparent;

        &:hover{
            border-color: ${props =>props.theme.colors.black} transparent transparent;
        }
    }

    .inputdrop{
        cursor: pointer;
        font-weight: bold;
        color: ${props =>props.theme.colors.primary} transparent transparent;
        border-radius: 8px;

        &:hover{
            color: ${props =>props.theme.colors.black} transparent transparent;
            border-color: ${props =>props.theme.colors.info};
        }
    }

    .div-menu{
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        text-align: center;
        position: absolute;
        left: 89vw;
        top:3rem;
        z-index: 999999999;
        &:focus-within{
            display: none;
        }
        &:hover ::before{
            display: none;
        }
    }
    .div-item{
        &:hover {
            color: ${props =>props.theme.colors.black};
            border-color: ${props =>props.theme.colors.info};
        }
        
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

