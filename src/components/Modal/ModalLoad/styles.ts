import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos

.ReactModal__Content{
    width:'100%';
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    border: 0;
    padding: 0;
    background-color: "#1c1c1c",
}    

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    .ReactModal__Content{
    width:'100%';
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



