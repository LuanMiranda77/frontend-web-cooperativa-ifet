import React from 'react';
import { FaSave } from 'react-icons/fa';
import { ButtonBase, ButtonIcon, InputDefault, ModalDefault } from '../../../../components';

// import { Container } from './styles';
interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
}

const ModalCategoria: React.FC<ModalProps> = (props) => {
    return <ModalDefault key={"modal-categoria"}
        title={'Ficha de categoria'}
        isOpen={props.showModal}
        onRequestClose={props.closeModal}
        width='40%'
        height='100vh'
        left='30vw'
    >
        <div className='p-2'>
            <InputDefault className='w-11/12 mb-5' label='Nome' type='text' />
            <div className='flex'>
                <InputDefault className='w-3-12 mr-9' label='NCM' type='number' />
                <InputDefault className='w-3-12' label='CEST' type='number' />
            </div>
        </div>
    </ModalDefault>


}

export default ModalCategoria;