import React from 'react';
import ReactModal from 'react-modal';
import { Container } from './styles';
import load from '../../../assets/load.gif';

interface ModalLoadProps {
  //adicionar os props
  isOpen: boolean;
  mensage: string;
  onRequestClose: () => void;
}

export const ModalLoad: React.FC<ModalLoadProps> = (props) => {
  return <Container>
    <ReactModal
      isOpen={props.isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(78, 76, 76, 0.75)",
        },
        content: {
          width: '100%',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          border: 0,
          padding: 0,
          backgroundColor: "transparent",
        },
      }}
      onRequestClose={() => props.onRequestClose}
    >
      <div className='w-full h-full text-center'>
        <div className='w-full h-full flex justify-center items-center'>
          <img className='w-24' src={load} alt="load" />
        </div>
          <p className='text-xl text-white font-bold' style={{marginTop:'-20%'}}>{props.mensage}</p>
      </div>
    </ReactModal>
  </Container>;
}