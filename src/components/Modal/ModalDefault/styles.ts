import styled from "styled-components";

export const HeaderModal  = styled.header`
    background-color:${color=> color.theme.colors.primary};
    border-radius: 2px 2px 0px 0px;
    margin-top:0;
`;

export const Container  = styled.div`
    //adicionar stylos
.ReactModal__Content{
    width:'100vw';
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    border: 0;
    padding: 0;
    /* margin: '1rem'; */
    background-color: "#1c1c1c",
}    

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    .ReactModal__Content{
    width:'94%';
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    border: 0;
    padding: 0;
    margin: '1rem';
    background-color: "red",
}  
}

`;

