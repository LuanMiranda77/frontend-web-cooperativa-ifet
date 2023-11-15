import React from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { Container } from './styles';

interface InputFileProdutoProps {
  //adicionar os props
  label: string;
  color?: string;
  backgroundColor?: string;
  boderColor?: string;
  width?: string;
  className?: string;
  style?: object;
  multiple?: boolean;
  upload: (event: React.ChangeEvent<HTMLInputElement>)=>void;
}

export const ButtonUpload: React.FC<InputFileProdutoProps> = (props) => (
  <Container className={'cursor-pointer '+ props.className} 
    htmlFor="file" 
    color={props.color} 
    backgroundColor={props.backgroundColor}
    borderColor={props.boderColor} 
    width={props.width}
    style={props.style}
  >
    <input id='file' type="file" accept=".xml" name='file' multiple={props.multiple}  onChange={(event) => props.upload(event)} />
      <FaFileUpload style={{ fontSize: '18px', marginRight:'8px' }}/>
    <label htmlFor="file" className='cursor-pointer' style={{fontSize:'15px'}}>{props.label}</label>
  </Container>
)