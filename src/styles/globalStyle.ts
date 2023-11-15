import { error } from 'console';
import styled, { createGlobalStyle } from "styled-components";
interface LabelProps {
  color: string;
}
export const Label = styled.label<LabelProps>`
  color: ${(props) => props.color};
  font-size: calc(5px + 0.5vw);

  @media screen and (min-width: 1920px) {
    font-size: 12px;
  }
`;

export const GlobalStyle = createGlobalStyle`
:root{
  //variaveis do tema de cores
  --background: ${(color) => color.theme.colors.background};
  --white: #FFF;
  --text-label: #fff;
 
  //variaveis de tamanho
  --max-height-button:30px;
}

*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

html{
  @media (max-width: 1080px){
    font-size: 18px;
  }
  @media (max-width: 720px){
    font-size: 14px;
  }
}

body {
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}

body, input, textarea, button{
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

h1,h2,h3,h4,h5,h6 strong{
  font-weight: 700;
}

button {
  cursor: pointer;
}

.column{
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.column-1{
        color: ${(props) =>
          props.theme.title === "dark"
            ? props.theme.colors.textLabel
            : props.theme.colors.error};
}

.row{
  display: flex;
}

/* remover o incrementador de input do type number */
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

//style dos inputs do projeto
.input_line_group {
  position: relative;
  padding: 10px 5px;
  margin-top: 5px;
}

.input_line__field {
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${(color) => color.theme.colors.gray};
  border-radius: 0px;
  outline: 0;
  height: 28px;
  /* font-size: 1.3rem; */
  color: ${(color) => color.theme.colors.black};;
  padding: 4px;
  background: transparent;
  transition: border-color 0.2s;
  font-size: calc(5px + 0.5vw);
  font-weight: bold;

  
  &:placeholder-shown ~ .input_line__label {
    /* font-size: 1.3rem; */
    cursor: text;
    top: 0px;
  }
}

.input_line__label {
  position: absolute;
  top:-5px;
  display: block;
  transition: 0.2s;
  font-size: calc(5px + 0.5vw);
  color: ${(color) =>
    color.theme.title === "dark"
      ? color.theme.colors.textLabel
      : color.theme.colors.primary};
  font-weight:bold;
}

.input_line__field:focus {
  ~ .input_line__label {
    position: absolute;
    top: 3px;
    display: block;
    transition: 0.2s;
    font-size: calc(5px + 0.5vw);
    color: ${(color) => color.theme.colors.primary};;
    font-weight:700;    
  }
  padding-bottom: 0px;  
  font-weight: 700;
  border-width: 2px;
  border-image: linear-gradient(to right, ${(color) =>
    color.theme.colors.primary},${(color) => color.theme.colors.dns_info});
  border-image-slice: 1;
}
/* reset input */
.input_line__field{
  &:required,&:invalid { box-shadow:none; }
}

[disabled]{
  opacity: 0.6;
  cursor: not-allowed;
}
.react-modal-overlay{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

}

.linha-vertical {
        border-left: 2px solid;/* Adiciona borda esquerda na div como ser fosse uma linha.*/
}

.card-local{
  background: var(--white);
  border-radius: 8px;
}

.MuiPaper-root-MuiDialog-paper{
    max-width:100vw !important;  
    width:100vw !important;  
}

.react-modal-content{
  /* width: 100%; */
  /* max-width: 70rem; */
  background-color: var(--background);
  padding: 1.5rem;
  position: relative;
  border-radius: 0.24rem;
}
.react-modal-close{
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  border: 0;
  transition: filter 0.2s;
  &:hover{
    filter:brightness(0.9);
  }
  @media (max-width: 720px){
    right: 3rem;
  }
}

::-webkit-scrollbar{
        width:10px;
}

::-webkit-scrollbar-thumb{
    background-color:${(props) =>
      props.theme.title === "dark"
        ? props.theme.colors.warning
        : props.theme.colors.primary};
    border-radius:5px;
}

::-webkit-scrollbar-track{
    background-color:${(props) => props.theme.colors.tertiary};
    border-radius:5px;
    margin:0rem;
}

.title-responsive{
  font-size: calc(5px +0.6vw);
  font-weight: bold;
  color:${(props) => props.theme.colors.tertiary};
  
}

.subtitle-responsive{
  font-size: calc(5px +0.5vw);
  font-weight: 500;
  color:${(props) => props.theme.colors.gray};
}

.font-12-responsive{
  font-size: calc(5px + 0.4vw);
  color:${(props) => props.theme.colors.primary};
}

.font-14-responsive{
  font-size: calc(5px + 0.5vw);
  color:${(props) => props.theme.colors.primary};

}
  .font-16-responsive{
    font-size: calc(5px + 0.6vw);
    color:${(props) => props.theme.colors.primary};
  }

  .font-20-responsive{
    font-size: calc(5px + 0.7vw);
    color:${(props) => props.theme.colors.primary};
  }

  .color-primary{
    color:${(props) => props.theme.colors.primary} !important;
  }
  .color-secondary{
    color:${(props) => props.theme.colors.secondary}!important;
  }
  .color-tertiary{
    color:${(props) => props.theme.colors.tertiary}!important;
  }
  .color-error{
    color:${(props) => props.theme.colors.error}!important;
  }
  .color-success{
    color:${(props) => props.theme.colors.success}!important;
  }

  .btn{
    background-color: transparent !important;
    cursor: pointer;
    padding: 3px;
    transition: all 0.5s;
    border-radius: 4px;
    &:hover{
      transform: translateX(2px) translateY(-2px);
      box-shadow: 0px 2px 4px 0 rgba(0,0,0,0.5);
    }
  }

@media (min-width: 1920px){
  .title-responsive{
    font-size: 20px;
  }
  .subtitle-responsive{
    font-size: 16px;
    font-weight: bold;
  }

  .font-12-responsive{
    font-size: 12px;

  }
  .font-14-responsive{
    font-size: 14px;

  }
  .font-16-responsive{
    font-size: 16px;

  }
  .font-20-responsive{
    font-size: 20px;

  }

  .input_line__field {
    font-size: 14px;
  }
  .input_line__label {
    font-size: 12px;
  }
  .input_line__field:focus {
  ~ .input_line__label {
    font-size: 12px;
  }}
  
  }
`;
