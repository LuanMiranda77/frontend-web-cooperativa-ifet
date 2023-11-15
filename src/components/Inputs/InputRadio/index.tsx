import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  label: string;
  color?: string;
}

export const InputRadio: React.FC<InputRadioProps> = (props) => {
  return <Container className={props.className}>
    <input type="radio" className='cursor-pointer '  {...props} style={{background:'red'}} name={props.label}/>
    <label className='ml-1 ' htmlFor={props.label}>{props.label}</label>
  </Container>;
}