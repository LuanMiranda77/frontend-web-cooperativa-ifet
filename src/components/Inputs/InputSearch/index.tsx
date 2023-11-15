
import React, { InputHTMLAttributes } from "react";

import { FaSearch } from 'react-icons/fa';
import { Container } from './styles';


interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement>{
  //adicionar os props
}

export const InputSearch: React.FC<InputSearchProps> = (props) => {
  return <Container className='w-full flex items-center'>
          <i className="color-primary mr-2"><FaSearch className="icon" size={18} /></i>
          <input
            className="w-full h-9 focus:outline-none font-bold"
            style={{background: 'transparent', border: 'none' }}
            placeholder='Pesquise...'
            {...props}
          /> 
         </Container>;
}