import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";
import _ from "lodash";
interface InputSelectDefaultProps {
  //adicionar os props
  options: Array<Object>;
  label?: string;
  placeholder?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: Object;
  value?: any;
  onKeyDownCapture?: (e: any) => void;
  onChange?: (e: any) => void;
  required?: boolean;
  valid?: any;
  errorMessage?: any;
  height?: number;
  fontSize?: string;
  control?: any;
  name?: string;
  disabled?:boolean;
}

export const InputSelectDefault: React.FC<InputSelectDefaultProps> = (
  props
) => {
  const theme = useContext(ThemeContext);
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      // color: state.isSelected ? 'red' : 'blue',
      fontSize: "12px",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      width: "100%",
      height: props.height ? props.height : 25,
      border: 0,
      borderBottom: "1px solid " + theme.colors.gray,
      // borderRadius: '0px 5px 5px 5px',
      outline: 0,
      color: theme.colors.primary,
      background: "transparent",
      fontSize: props.fontSize ? props.fontSize : "13px",
    }),
  };
  return (
    <Container
      className={`w-full font-bold text-left ${
        props.label ? "input_line_group" : ""
      } ${props.className ? props.className : ""}`}
    >
      {props.label && (
        <label className="input_line__label" htmlFor="">
          {props.label}
          <span className="text-red-500 font-bold">
            {props.required ? " *" : ""}
          </span>
        </label>
      )}
      {props.control && props.name ? (
        <Controller
          control={props.control}
          name={props.name}
          defaultValue={props.options[0]}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              // defaultValue={props.options[0]}
              id={"input-select" + props.label}
              className={"input font-14-responsive"}
              options={props.options}
              placeholder={props.placeholder}
              isSearchable={props.isSearchable}
              isClearable={props.isClearable}
              autoFocus={props.autoFocus}
              noOptionsMessage={(obj: { inputValue: string }) => (
                <p>Não existe items</p>
              )}
              styles={customStyles}
              ref={ref}
              value={_.find(props.options, { 'value':value })?_.find(props.options, { 'value':value }):value}
              onChange={(e)=>onChange(e.value)}
              isDisabled={props.disabled}
            />
          )}
        />
      ) : (
        <Select
          id={"input-select" + props.label}
          className={"input font-14-responsive mt-1"}
          options={props.options}
          placeholder={props.placeholder}
          isSearchable={props.isSearchable}
          isClearable={props.isClearable}
          defaultValue={props.defaultValue}
          autoFocus={props.autoFocus}
          onKeyDown={props.onKeyDownCapture}
          onChange={props.onChange}
          noOptionsMessage={(obj: { inputValue: string }) => (
            <p>Não existe items</p>
          )}
          styles={customStyles}
          value={props.value}
          isDisabled={props.disabled}
          // {...props.valid}
        />
      )}
      <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">
        {props.errorMessage}
      </small>
    </Container>
  );
};
