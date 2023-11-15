import React from "react";
import { Container } from "./styles";
import { IconButton } from "../../Buttons/IconButton";

export function ModalExample() {
  return (
    <Container className="card-local">
      <h2>Modelos que podem ser usado como base neste projeto</h2>
      <div style={{ display: "flex", width: '100%' }}>
        <div style={{textAlign:'center', marginRight:"1rem"}}>
          <h4>Button icon</h4>
          <IconButton   icon="new"></IconButton>
          <IconButton icon="remove"></IconButton>
          <IconButton icon="edit"></IconButton>
          <IconButton icon="info"></IconButton>
          <IconButton icon="search"></IconButton>
        </div>
        <div style={{textAlign:'center', marginRight:"1rem"}}>
          <h4>Button base</h4>
          
        </div>
        <div style={{textAlign:'center', marginRight:"1rem"}}>
          <h4>Button base</h4>
          
        </div>
        <div style={{textAlign:'center', marginRight:"1rem"}}>
          <h4>Button base</h4>
          
        </div>
        <div style={{textAlign:'center', marginRight:"1rem"}}>
          <h4>Button base</h4>
          
        </div>
      </div>
      <h1>Login</h1>
    </Container>
  );
}
