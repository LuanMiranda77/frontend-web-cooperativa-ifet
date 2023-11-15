import React, {InputHTMLAttributes} from 'react';
import { Container } from './styles';

interface InputIconProps extends InputHTMLAttributes<HTMLInputElement>{
  //adicionar os props
  label: string;
  icon: React.ReactNode;
}

export const InputIcon: React.FC< InputIconProps> = (props) => {
  return <Container className='input_line_group'>
            <label className="input_line__label" htmlFor="">{props.label}</label>
            <i className="ml-2 mt-1.5" style={{fontSize: '24px', position:'absolute'}}>{props.icon}</i>
            <input className="input_line__field" style={{paddingLeft:'2.5rem'}} name={props.label} id={props.label} {...props}/>
         </Container>;
}