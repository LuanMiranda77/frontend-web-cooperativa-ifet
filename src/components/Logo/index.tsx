import React from 'react';
import logo from '../../assets/Logo/logo-2.svg';
import { Container } from './styles';

interface LogoProps{
  //adicionar os props
  size: "LARGE"|"MEDIUM"|"SMALL"|"MINI";
}

export const Logo: React.FC< LogoProps> = (props) => {
  const setSize = () =>{
    if(props.size === "LARGE"){
      return <img src={logo} alt="" style={{height:"50%", width:"75%"} } />
    }else if (props.size === "MEDIUM"){
      return <img src={logo} alt="" style={{height:"25%", width:"33%"}} />
    }else if (props.size === "SMALL"){
      return <img src={logo} alt="" style={{height:"15%", width:"25%"}} />
    }else if (props.size === "MINI"){
      return <img src={logo} alt="" style={{height:"5%", width:"15%"}} />
    }
  }
  return <Container>
          {setSize()}
         </Container>;
}