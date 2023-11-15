import React, { InputHTMLAttributes, useRef } from "react";
import { Container } from "./styles";

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  type: string;
  label: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  onKeyDownCapture?:(e: any)=>void;
  register?:any
  errorMessage?:any;
}

export const InputDefault: React.FC<InputDefaultProps> = (props) =>(
    <Container className={"input_line_group " + props.className}>
          <label className="input_line__label">{props.label}<span className='text-red-500 font-bold'>{props.required ? " *" : ''}</span></label>
          <input
            id={props.label}
            name={props.label}
            type={props.type}
            className={"input_line__field"}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onKeyDownCapture={props.onKeyDownCapture}
            autoFocus={props.autoFocus ? props.autoFocus:false}
            readOnly={props.readOnly ? props.readOnly:false}
            required={props.required ? props.required:false}
            {...props.register}
            value={props.value}
            maxLength={props.maxLength}
          />
          <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">{props.errorMessage}</small>
    </Container>
  );

