import React, { InputHTMLAttributes } from 'react';
import InputMaskDefault from 'react-input-mask';
import { Container } from './styles';

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  //adicionar os props
  label: string;
  mask: string | (string)[];
  register?: any
  errorMessage?: any;
}

export const InputMask: React.FC<InputMaskProps> = (props) => (
  <Container className={props.className}>
    <label className={"input_line__label"}>{props.label}<span className='text-red-500 font-bold'>{props.required ? " *" : ''}</span></label>
    <InputMaskDefault
      className={'input_line__field'}
      type='text'
      mask={props.mask}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly ? props.readOnly:false}
      placeholder={props.placeholder}
      required={props.required}
      {...props.register}
    />
    <small className="text-red-500 absolute top-12 text-xs left-1 font-bold">{props.errorMessage}</small>
  </Container>
);