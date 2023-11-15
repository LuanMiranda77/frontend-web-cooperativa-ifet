import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height:100vh;
    width:100vw;


    header{
        background:${props =>props.theme.colors.primary};
        display: flex;
        align-items: center ;
        justify-content: space-between;
        text-align: right;
        padding: 0.9rem;
        max-height: 60px;
        /* border-bottom: 1px solid ${props =>props.theme.colors.gray}; */
        /* box-shadow: 2px 2px 2px gray; */
    }

    .button-pagamento{
        box-shadow: 0px 2px 5px  black;
        padding: 0.3rem;

        &:hover {
            opacity : 0.7;
            box-shadow: 0px 2px 5px  black;
        } 
    }

    .input-hover{
        &:focus{
            border: none;
        }
    }

    .side-right{

    }

    .sideLeft{

    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const Table = styled.table`
    width: 100%;
    max-height:100%;
    border-collapse: collapse;
    overflow-y:scroll;


    text-align: right;

    /* thead th  {
    position:absolute;   
    top:30px;
    z-index:2;
    height:20px;
    width:70%;
    border:1px solid red;
    } */
    thead{
        position: fixed;
        width:70%;
        margin-left:-1px;
        margin-top:-30px;
    }

    tr{
        color: ${props =>props.theme.colors.primary};
        font-size: 12px;
        background-color: ${props =>props.theme.colors.white};
        height: 30px;
        width:100%;
    }

    th{
        border: 1px solid #dddddd;
        width:10%;
    }

    td{
        border: 1px solid #dddddd;
        padding: 8px;
        color: ${props =>props.theme.colors.primary};
    }

    tr:nth-child(even) {
    background-color: #d2d2d2;
    }

    //adicionar o stylo responsivo
    @media screen and (max-width: 40em) {

    }

`;

export const ContainerLeft = styled.div`
    background-color: ${color => color.theme.colors.gray};
    height: calc(100vh - 340px);
    width: 75%;

    @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    height: calc(100vh - 187px);
    }

`;

export const ContainerRight = styled.div`
    background-color: ${color => color.theme.colors.gray};
    /* height: calc(100vh - 310px); */
    width: 25%;

    input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    }
    
    input[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;

    }

    @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    height: calc(100vh - 187px);
    }

`;

export const ContainerProduto  = styled.div`
    background-color: ${color => color.theme.colors.white};
    height: calc(100vh - 242px);

    .column-1{
        color: ${color => color.theme.colors.error};
    }
    .column-2{
        color: ${color => color.theme.colors.primary};
        font-size: 18px !important ;
    }
    /* overflow-y:scroll; */

    @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    height: calc(100vh - 187px);
    }

    .table{
        height: 100px;
    }

`;

export const ContainerMenu  = styled.div`
    padding: 1rem;
    background-color: ${color => color.theme.colors.tertiary};
    height: calc(100vh - 172px);
    max-height: max-content;
    /* overflow-y: scroll; */

    @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    /* height: calc(100vh - 270px); */
    overflow-y: scroll;
    font-size: 12px;
    }


`;

export const TableProduto  = styled.div`
    height: calc(100vh - 180px);

    @media screen and (max-width: 40em) {

    }
`;

