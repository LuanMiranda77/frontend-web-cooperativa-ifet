import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  margin: 0 auto;
  /* width: 70vw; */
  height: 100vh;
  flex-direction: row;

  .logo {
    width: 30%;
    margin: 5% 35% auto;
    margin-bottom: 2rem;
    @media (max-width: 720px) {
      width: 50%;
      margin: 5% 15% auto;
    }
  }

  h3 {
    margin-top: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${(color) => color.theme.colors.primary};
    /* padding: 3 1rem 10rem; */
  }

  .div-left {
    background: ${(color) => color.theme.colors.white};
    width: 60%;
    padding: 1.5rem;

    .caixa-imge{
      position: absolute;
      bottom: 0px;
      margin-left: -25px;
      width: calc(400px + 5vw);
      max-width: 580px;
    }
  }

  .div-right {
    display: flex;
    /* margin: 0 auto; */
    background: ${(color) => color.theme.colors.primary};
    align-items: center;
    justify-content: center;
    color: white;
    width: 40%;
    padding: 3rem;
  }

  .olho {
    font-size: 24px;
    position: absolute;
    margin-left: 12.5em;
    margin-top: -28px;
    border: 0;
    outline: 0;
    /* font-size: 1.3rem; */
    color: ${(color) => color.theme.colors.primary};
    cursor: pointer;
  }

  .label-senha {
    cursor: pointer;
    &:hover {
      color: ${(color) => color.theme.colors.gray};
      font-weight: 100;
    }
  }

  .div-login {
    width: 50%;
    margin-right: -2rem;
    @media (max-width: 720px) {
      width: 91%;
      margin: 0 1rem auto;
    }
    .p-fluid {
      width: 100%;
    }
  }

  .div-link {
    margin-top: 1.5rem;
    /* justify-content: baseline; */
    font-weight: bold;
    font-size: 14px;

    @media (max-width: 720px) {
      font-size: 14px;
    }
    @media (max-width: 1025px) {
      font-size: 12px;
    }

    a {
      text-decoration: none;
    }
  }

  @media (max-width: 720px) {
    width: 100vw;
    margin: 0 auto;
    display: block;

    img {
      width: 60%;
      margin: 5% 15% auto;
    }

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
    }
    .input_line__field {
    }
  }
`;
