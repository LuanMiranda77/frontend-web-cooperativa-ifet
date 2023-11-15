import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //adicionar os props
  model: "btn_base" | "btn_line" | "btn_super";
  label: string;
  size?: "large" | "medium" | "small" | "mini";
}

export const ButtonBase: React.FC<ButtonBaseProps> = (props) => {
  return <Container className={props.className}>
    <button id={props.label}
      name={props.label}
      className={props.model + " " + (props.className ? props.className : 'btn_base') + " " + (props.size ? props.size : 'large')}
      onClick={props.onClick}>{props.label}
    </button>
  </Container>;
}

ButtonBase.defaultProps = {
  size: "mini",
}
