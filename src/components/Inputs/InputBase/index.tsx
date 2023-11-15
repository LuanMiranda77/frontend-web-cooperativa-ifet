import React, { InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  type: string;
  model: "input_base"|"input_line"|"input_super";
  label: string;
}

export const InputBase: React.FC<InputBaseProps> = (props) => {
  return (
    <Container>
      <div className={props.model + "_group"}>
        <div className={props.model}>
          <input
            type={props.type}
            className={props.model + "__field " + props.className}
            placeholder={props.model !=="input_base" ? props.label : props.placeholder}
            name={props.label}
            id={props.label}
          />
          <label className={props.model + "__label"}>{props.label}</label>
        </div>
      </div>
    </Container>
  );
};
