import styled from "styled-components";

export const Container  = styled.div`
    height: calc(100vh - 70px);
    padding-bottom: 45px;
    //adicionar stylos
    .column-1{
        color: ${props => props.theme.title ==='dark' ? props.theme.colors.textLabel: props.theme.colors.primary };
    }
    .column-2{
        color: ${props => props.theme.colors.info};
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const TableContainer  = styled.div`
    height: calc(100vh - 150px);
    //adicionar stylos
    /* height: calc(100vh - 150px); */

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const ContainerFoto  = styled.div`
        /* position: absolute;
        top:10vh;
        left:46vh; */
        width:40% ;
        margin-top: -30px;

        /* @media screen and (max-height: 768px) {
            //adicionar o stylo responsivo
            top:12vh;
            left:calc(56.5vh - 60px);
        }

        @media screen and (max-width: 40em) {
            //adicionar o stylo responsivo
            top:12vh;
            left:calc(20vh - 60px);
        } */
`;


