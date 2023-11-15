import styled from "styled-components";

export const Container  = styled.div`

/* input lable superior */
.input_super {
  position: relative;
  
  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(.4em * 0.75) calc(.4em * .5);
    margin: calc(.4em * 0.75 + 3px) calc(.4em * .5);
    background: pink;
    white-space: nowrap;
    transform: translate(0, 0);
    color: ${color => color.theme.colors.black};;
    transform-origin: 0 0;
    background: var(--white);
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }
  &__field {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 2px solid ${color => color.theme.colors.primary};;
    padding: calc(.5em * 1.5) .5em;
    color: currentColor;
    background: transparent;
    border-radius: 5px;
    
    &:focus,
    &:not(:placeholder-shown) {
      & + .input_super__label  {
        transform: translate(.25rem, -65%) scale(.8);
        color: ${color => color.theme.colors.primary};;
      }
    }
  }
}


/* line input */
.input_line_group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}

.input_line__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${color => color.theme.colors.primary};
  border-radius: 0px 5px 5px 5px;
  outline: 0;
  /* font-size: 1.3rem; */
  color: ${color => color.theme.colors.black};;
  padding: 6px 0;
  background: ${color => color.theme.colors.gray};
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .input_line__label {
    /* font-size: 1.3rem; */
    cursor: text;
    top: 20px;
  }
}

.input_line__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${color => color.theme.colors.black};;
}

.input_line__field:focus {
  ~ .input_line__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${color => color.theme.colors.primary};;
    font-weight:700;    
  }
  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, ${color => color.theme.colors.primary},${color => color.theme.colors.secondary});
  border-image-slice: 1;
}
/* reset input */
.input_line__field{
  &:required,&:invalid { box-shadow:none; }
}

/*========================== input base ====================== */
.input_base_group {
    position: relative;
    display: flex;
    width: 100%;
    .input_base {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        width: 1%;
        margin-top: 0;
        margin-bottom: 0;
    }
}

.input_base {
    
    &__label {
    position: absolute;
    left: 0;
    top: 0;
    /* padding: calc(.4em * 0.75) calc(.4em * .5); */
    margin: calc(.4em * 0.75 - 25px) calc(.4em * .5);
    white-space: nowrap;
    transform: translate(0, 0);
    color: ${color => color.theme.colors.black};;
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
  }
  &__field {
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: ${color => color.theme.colors.black};;
    border: 2px solid ${color => color.theme.colors.primary};;
    background: var(--background);
    transition: border .3s ease;
    
    &::placeholder {
        color: ${color => color.theme.colors.black};;
    }
    &:focus {
        outline: none;
        border-color: ${color => color.theme.colors.secondary};
        & + .input_base__label  {
        /* transform: translate(.25rem, -65%) scale(.8); */
        color: ${color => color.theme.colors.secondary};
      }
    }

  }
    
}




@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

