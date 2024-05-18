import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { ThemeContext } from "styled-components";
import { Container } from "./styles";

interface Props {
  //adicionar os props
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
  disabled?: boolean;
  loadOptions: any;
}

export const InputAsyncSelect: React.FC<Props> = (props) => {
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
      height: props.height ? props.height : 28,
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
          defaultValue={props.defaultValue}
          render={({ field: { value, onChange, ref } }) => (
            <AsyncSelect
              id={"input-select" + props.label}
              className={"input font-14-responsive mt-1"}
              loadOptions={props.loadOptions}
              placeholder={props.placeholder}
              isSearchable={props.isSearchable}
              isClearable={props.isClearable}
              defaultValue={props.defaultValue}
              autoFocus={props.autoFocus}
              onKeyDown={props.onKeyDownCapture}
              noOptionsMessage={(obj: { inputValue: string }) =>
                obj.inputValue.length < 3
                  ? "Digite 3 caracteres para pesquisar"
                  : "Item não existe"
              }
              loadingMessage={() => "Carregando..."}
              styles={customStyles}
              onChange={onChange}
              value={props.value}
              isDisabled={props.disabled}
              ref={ref}
            />
          )}
        />
      ) : (
        <AsyncSelect
          id={"input-select" + props.label}
          className={"input font-14-responsive"}
          loadOptions={props.loadOptions}
          placeholder={props.placeholder}
          isSearchable={props.isSearchable}
          isClearable={props.isClearable}
          defaultValue={props.defaultValue}
          autoFocus={props.autoFocus}
          onKeyDown={props.onKeyDownCapture}
          onChange={props.onChange}
          noOptionsMessage={(obj: { inputValue: string }) =>
            obj.inputValue.length < 3
              ? "Digite 3 caracteres para pesquisar"
              : "Item não existe"
          }
          loadingMessage={() => "Carregando..."}
          styles={customStyles}
          value={props.value}
          isDisabled={props.disabled}
        />
      )}
      <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">
        {props.errorMessage}
      </small>
    </Container>
  );
};
