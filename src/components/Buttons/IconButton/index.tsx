import React, {ButtonHTMLAttributes} from 'react';
import { Container } from './styles';
import { BsFillQuestionDiamondFill } from 'react-icons/bs';
import { BsFillPencilFill } from "react-icons/bs";
import {BsPlusLg} from "react-icons/bs";
import {BsSearch} from "react-icons/bs";
import {BsTrashFill} from 'react-icons/bs';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  icon:"new" |"remove" | "info"|"edit" |"search";
}

export const IconButton: React.FC< IconButtonProps> = (porps) => {
  const setIcon=()=>{
    if(porps.icon === 'new'){
      return <BsPlusLg className='new' />
    }else if(porps.icon === 'remove'){
      return <BsTrashFill className='remove' />
    }else if(porps.icon === 'edit'){
      return <BsFillPencilFill className='edit' />
    }else if(porps.icon === 'info' ){
      return <BsFillQuestionDiamondFill className='info' />
    }else if(porps.icon === 'search' ){
      return <BsSearch  className='search'/>
    }
  };
  return <Container>
           {setIcon()}
         </Container>;
}

IconButton.defaultProps={

  
}