import React, { useState } from 'react';
import { FaArchive, FaCameraRetro, FaFolderPlus, FaPlusSquare, FaWindowClose } from 'react-icons/fa';
import src from 'react-select/dist/declarations/src';
import { Container } from './styles';

interface InputFileProdutoProps {
  //adicionar os props
  lado: 'left' | 'right';
  setValue: (event: any)=>void;
  value: any;
}

export const InputFileProduto: React.FC<InputFileProdutoProps> = (props) => {
  const [url, setUrl] = useState('');
  const uploadImge = (event: any) => {
    if (event.target.files[0]) {
      props.setValue(event.target.files[0]);
      setUrl(URL.createObjectURL(event.target.files[0]));
      // var output = document.getElementById('preview') as HTMLImageElement;
      // if(output !== undefined && output !== null){
      //   output.src = URL.createObjectURL(event.target.files[0]);
      //   output.onload = function() {
      //     URL.revokeObjectURL(output.src) // free memory
      //   }
      // }
    }
  }

  return <Container className='flex'>
    {props.lado === 'left' ?
      <div className='mr-2'>
        <label htmlFor="file"><FaCameraRetro className='text-blue-900 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '45px' }} /></label>
        <label htmlFor="file"><FaWindowClose className='text-red-500 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '5px' }} /></label>
      </div>
      : ''}
    <input type="file" accept="image/png,image/jpeg" name='file' id='file' onChange={(event) => uploadImge(event)} />
    <div className='h-24 w-24 bg-gray-200 flex items-center justify-center border-2 border-blue-400 shadow-md'>

      {url === '' ?
        <FaArchive className='text-6xl text-gray-400' />
        :
        <img id='preview' src={url} alt="" />
      }
    </div>
    {props.lado === 'right' ?
      <div className='ml-2'>
        <label htmlFor="file"><FaCameraRetro className='mt-6 text-blue-900 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '45px' }} /></label>
        <label htmlFor="file"><FaWindowClose className='mt-6 text-red-500 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '5px' }} /></label>
      </div>
      : ''}
  </Container>;
}