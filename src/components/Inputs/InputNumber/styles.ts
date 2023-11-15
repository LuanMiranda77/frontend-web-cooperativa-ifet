import styled from "styled-components";

interface InputPorps{
  color?: string;
}

export const Container  = styled.div<InputPorps>`

    //adicionar stylos

  position: relative;
  padding: 10px 5px;
  margin-top: 5px;

  label{
    color:color
  }



@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

