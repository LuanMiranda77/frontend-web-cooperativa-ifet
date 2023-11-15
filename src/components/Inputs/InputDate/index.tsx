import React, { InputHTMLAttributes, useContext } from "react";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";

interface InputDateProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  label: string;
  register?:any
  errorMessage?:any;
}

export const InputDate: React.FC<InputDateProps> = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <Container
      className={`input_line_group ${props.className ? props.className : ""}`}
    >
      <label
        className="font-bold input_line__label font-14-responsive"
        htmlFor={props.label}
        style={{
          color:
            theme.title === "dark"
              ? theme.colors.textLabel
              : theme.colors.primary,
        }}
      >
        {props.label}
      </label>
      <input
        id={props.label}
        className="input_line__field font-14-responsive font-bold color-tertiary"
        type="date"
        value={props.value}
        onChange={props.onChange}
        readOnly={props.readOnly ? props.readOnly : false}
        {...props.register}
      />
      <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">{props.errorMessage}</small>
    </Container>
  );
};
