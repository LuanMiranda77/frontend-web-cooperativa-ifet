import React, { InputHTMLAttributes } from "react";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  model: "input_base" | "input_line" | "input_super";
  label: string;
}

export const InputTextarea: React.FC<InputBaseProps> = (props) => {
  return (
    <div className={props.model + "_group"}>
    <div>
      <textarea

        className={'w-full border border-current rounded'}
        placeholder={props.model !== "input_base" ? props.label : props.placeholder}
        name={props.label}
        id={props.label}
      />
      <label className={props.model + "__label"}>{props.label}</label>
    </div>
  </div>
  );
};
