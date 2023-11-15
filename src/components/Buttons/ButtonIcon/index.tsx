import React, { ButtonHTMLAttributes, useState } from 'react';
import { ButtonBase } from '../ButtonBase';
import { Container } from './styles';

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //adicionar os props
  label: string;
  icon: React.ReactNode;
  color?: string;
  width?: string;
  borderColor?: string;
  colorText?: string;
  background?:string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = (props) => {

  return <Container 
    id={props.label}
    onClick={props.onClick}
    color={props.color}
    // width={props.width}
    type={props.type}
    {...props}
  >
    <i className='mr-1' style={{ fontSize: '15px' }}>{props.icon}</i>
    {props.label}
  </Container>;
}