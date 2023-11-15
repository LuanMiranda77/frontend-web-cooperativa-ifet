import React, { InputHTMLAttributes } from "react";
import { NumericFormat } from 'react-number-format';
import { Container } from './styles';

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement>{
  //adicionar os props
  label: string;
  separadorMilhar?: "." | "," | boolean
  separadorDecimal: '.' | ','
  prefixo: string;
  fixedZeroFinal?:boolean;
  permiteZeroInicio?: boolean;
  casaDecimal: number;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?:any;
  onKeyDownCapture?:(e: any)=>void;
  color?:string;
  valid?: any;
  errorMessage?: any;

}

export const InputNumber: React.FC<InputNumberProps> = (props) => {
  return <Container color={props.color} className={props.className}>
    <label className='input_line__label' htmlFor={props.label} style={{color:props.color}}>{props.label}</label>
    <NumericFormat className={'input_line__field '}
      id={props.label}
      type={'text'}
      thousandSeparator={props.separadorMilhar}
      decimalSeparator={props.separadorDecimal}
      prefix={props.prefixo}
      fixedDecimalScale={props.fixedZeroFinal ? true:false}
      decimalScale={props.casaDecimal}
      allowLeadingZeros={props.permiteZeroInicio}
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus ? props.autoFocus:false}
      onKeyDownCapture={props.onKeyDownCapture}
      disabled={props.disabled ? props.disabled:false}
      readOnly={props.readOnly ? props.readOnly:false}
      value={props.value}
      {...props.valid}
    />
    <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">{props.errorMessage}</small>
  </Container>;
}