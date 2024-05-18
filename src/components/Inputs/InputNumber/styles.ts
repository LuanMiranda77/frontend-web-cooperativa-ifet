import styled from "styled-components";

interface InputPorps {
  color?: string;
  typeStyle?: boolean;
}

export const Container = styled.div<InputPorps>`
  //adicionar stylos

  position: relative;
  padding: ${(props) => (props.typeStyle ? "0px" : "10px 5px")};
  margin-top: ${(props) => (props.typeStyle ? "0px" : "5px")};

  label {
    color: color;
  }

  @media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
  }
`;
