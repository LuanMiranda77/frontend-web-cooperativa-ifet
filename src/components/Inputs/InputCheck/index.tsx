import React, {InputHTMLAttributes} from 'react';
import { Container } from './styles';

interface InputCheckProps extends InputHTMLAttributes<HTMLInputElement>{
  //adicionar os props
  label: string;
  color?: string;
  css?:string;
  checked?: boolean;
}

export const InputCheck: React.FC<InputCheckProps> = (props) => {
  return <Container className={props.css}>
    <input id={props.label} type="checkbox" className='cursor-pointer' checked={props.checked} name={props.label} {...props}/>
    <label className='ml-2' htmlFor={props.label}>{props.label}</label>
  </Container>;
}