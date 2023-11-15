import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    display: flex;
    margin: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .div-left {
    background: ${(color) => color.theme.colors.white};
    align-items: center;
    width: 60%;
    padding: 1rem;
    height: 100vh;
  }

  .div-right {
    display: flex;
    background: ${(color) => color.theme.colors.primary};
    align-items: center;
    text-align: center;
    color: white;
    width: 40%;
    padding: 3rem;
    height: 100vh;
  }


@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    width: 100vw;
    margin: 0 auto;
    display: block;

    .div-left {
      background: ${(color) => color.theme.colors.white};
      align-items: center;
      width: 87.5vw;
      border-radius: 10px;
      margin-left: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .div-right {
      width: 90%;
      border-radius: 10px;
      padding: 2rem;
      margin-left: 1.5rem;
      font-size: 12px;
      margin-bottom: 1rem;
    }
}

`;

