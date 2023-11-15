import styled from "styled-components";

/** grid siglas
*Layout
*MH = MainHeader
*AS = Aside
*CT = Content
*/
export const Grid  = styled.div`

    display: grid;
    /* grid-template-columns: 200px auto; */
    grid-template-rows: 50px auto;
    transition: grid-template-columns 0.5s;
    grid-template-areas:
    'MH MH'
    'AS CT';

    height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;



@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    grid-template-columns: 0px auto;
}

`;

export const ContainerMenu = styled.div`
    transition: width  0.5s;
    position:absolute;
    z-index:99999;
    background-color:${props => (props.title === 'dark' ? props.theme.colors.tertiary : props.theme.colors.tertiary)};
    height:calc(100vh - 50px);
    margin-top:50px;
    box-shadow: rgba(0, 0, 0, 0.16) 8px 6px 3px;
`;

