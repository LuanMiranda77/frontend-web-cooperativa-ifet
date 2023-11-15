import { Table } from "./../../../venda/pages/Pdv/styles";
import styled from "styled-components";

interface Statusprops{
  color: string;
  backgroundColor: string;
}

export const Container  = styled.div`
    //adicionar stylos
    label{
        /* color: ${color => (color.theme.title === 'dark' ? color.theme.colors.textLabel : color.theme.colors.primary)} */
    }
    input[type='file']{
        display: none;
    }

  @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
  }
`;

export const Body = styled.div`
  //adicionar stylos
  width: 100%;
  height: calc(100vh - 215px);
  background-color: transparent;

  @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
  }
`;

export const ContainerTable = styled.div`
  //adicionar stylos
  width: 100%;
  height: calc(100vh - 210px);
  background-color: transparent;

  .column-1 {
    color: ${(color) => color.theme.colors.primary};
  }

  @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
  }
`;

export const ContainerFiltro = styled.div`
  height: calc(100vh - 220px) !important;
  margin-top: -0.5rem;
  border-radius: 5px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ContainerEntradaNota = styled.div`
  /* height: calc(100vh - 335px); */
  margin-top: -0.5rem;
  border-radius: 5px;
  background-color: ${(color) =>
    color.theme.title === "dark"
      ? color.theme.colors.tertiary
      : color.theme.colors.white};
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;

    .left {
      width: "30%";
      /* height: calc(100vh - 100px); */
      background-color: blue;
    }
    .right {
      width: "70%";
      /* height: calc(100vh - 100px); */
      background-color: red;
    }

    .card-local {
      background-color: ${(color) => color.theme.colors.gray}!important;
    }
  }

  .show-impost{
    color: red;
  }

  .iconButton{

  }
`;

export const ContainerProdutoSync = styled.div`
  height: calc(100vh - 200px);
  max-height: 600px;
  .image {
    position: absolute;
    top: 30%auto;
    left: calc(100vh - 120px);
  }
`;

export const ContainerFoto  = styled.div`
        /* position: absolute; */
        /* top:8%; */
        /* left:calc(200vh - 25px); */
        width: 100%;
`;

export const ButtonFilter = styled.div`
  display:flex;
  align-items:center;
  transition: all 0.3s;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const StatusNota = styled.div<Statusprops>`
  border: 1px solid ${props => props.color};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  padding: .1rem;
  border-radius: 5px;
  font-size: 11px;
  font-weight:bold;
  width: 100%;
`;

export const HeaderNota = styled.div`
  display: flex;
  flex-direction: column; 
`;


