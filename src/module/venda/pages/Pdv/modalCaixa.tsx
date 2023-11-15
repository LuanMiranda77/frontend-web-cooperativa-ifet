import React, { useContext, useState, useEffect } from 'react';
import { FaCreditCard, FaDollarSign, FaIdCard, FaMoneyCheckAlt } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';
import { ButtonBase, InputIcon, InputNumber, InputSearch, ModalDefault } from "../../../../components";
import CountUp from 'react-countup';
import { PDVService } from '../services/PDVService';
import { ResumoCaixaType } from './types';
import { toast } from "react-toastify";

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalCaixa: React.FC<ModalProps> = (props) => {
  const service = new PDVService();
  const theme = useContext(ThemeContext);
  const [resumoCaixa, setResumoCaixa] = useState<ResumoCaixaType>({ dinheiro: 0, credito: 0, debito: 0, vale: 0, diferenca:0, valorDigitado:0, status:0 });
  const [titulo, setTitulo] = useState("ABRIR CAIXA");
  const [valorDigitado, setValorDigitado] = useState<number>(0);


  useEffect(() => {
    service.getCaxixa().then(data => {
      if (data.dinheiro > 0) {
        setTitulo("FECHAR CAIXA");
        setResumoCaixa(data);
      }
    }).catch(error => {

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventClose = () => {
    props.closeModal();
  }

  const abrirCaixa = () => {
    if(valorDigitado===0){
      toast.error('Para abrir o caixa digite o valor em dinheiro no campo.');
      return false;
    }
    eventClose();
  }

  const fecharCaixa = () => {
    if(valorDigitado===0){
      toast.error('Para fechar o caixa digite o valor em dinheiro no campo.');
      return false;
    }
    eventClose();
  }

  return <ModalDefault key={"#modalcaixa"} title={titulo} isOpen={props.showModal} onRequestClose={eventClose} width='50%' left='25%'>
    <div className='p-5 text-center'>
      <div className='mb-2' style={{ color: theme.colors.primary }}>
        <label className='text-5xl font-bold mb-10' htmlFor=""> CAIXA 01</label>
      </div>
      <header className='w-full  mb-2'>
        <p className='text-2xl font-bold'>Ola! usuario</p>
        <p className='text-lg'>Para {resumoCaixa.dinheiro === 0 ? 'abrir' : 'fechar'} o caixa digite o valor do caixa!</p>
      </header>
      <hr className='mb-3' />
      <div className='text-left'>

        <p className='text-3xl font-bold'>RESUMO DO CAIXA: {
          <CountUp className="font-bold lg:text-3xl" end={(resumoCaixa.dinheiro+resumoCaixa.debito+resumoCaixa.credito+resumoCaixa.vale)} prefix='R$ ' separator="." decimal="," decimals={2} style={{ color: "#c99b05" }} />
        }
        </p>

        <div className='flex items-center'>
          <i><FaDollarSign style={{ fontSize: '20px', }} /></i>
          <p className='text-2xl ml-2'>Dinheiro: {
            <CountUp className="font-bold lg:text-2xl" end={resumoCaixa.dinheiro} prefix='R$ ' separator="." decimal="," decimals={2} style={{ color: theme.colors.success }} />
          }
          </p>
        </div>

        <div className='flex items-center'>
          <i><FaMoneyCheckAlt style={{ fontSize: '20px' }} /></i>
          <p className='text-2xl ml-2'>Cartão Débito: {
            <CountUp className="font-bold lg:text-2xl" end={resumoCaixa.debito} prefix='R$ ' separator="." decimal="," decimals={2} style={{ color: theme.colors.primary }} />
          }
          </p>
        </div>

        <div className='flex items-center'>
          <i><FaCreditCard style={{ fontSize: '20px' }} /></i>
          <p className='text-2xl ml-2'>Cartão Crédito: {
            <CountUp className="font-bold lg:text-2xl" end={resumoCaixa.credito} prefix='R$ ' separator="." decimal="," decimals={2} style={{ color: theme.colors.info }} />
          }
          </p>
        </div>

        <div className='flex items-center'>
          <i><FaIdCard style={{ fontSize: '20px' }} /></i>
          <p className='text-2xl ml-2'>Vale: {
            <CountUp className="font-bold lg:text-2xl" end={resumoCaixa.vale} prefix='R$ ' separator="." decimal="," decimals={2} style={{ color: theme.colors.error }} />
          }</p>
        </div>

        <hr className='mt-3' />

      </div>
      <div className='mb-10'>
        <InputNumber className='h-16 text-4xl text-center'
          label=''
          prefixo='R$ '
          fixedZeroFinal
          separadorMilhar={'.'}
          casaDecimal={2}
          separadorDecimal={','}
          placeholder='R$ 0,00'
          onChange={(e)=> setValorDigitado(Number(e.currentTarget.value))}
        />
      </div>
      { resumoCaixa.dinheiro === 0 ?
      <ButtonBase label="ABRIR CAIXA" model="btn_base" className="primary-color mb-3" size="small" onClick={abrirCaixa} /> :
      <ButtonBase label="FECHAR CAIXA" model="btn_base" className="red-color mb-3" size="small" onClick={fecharCaixa}/>
      }
      <i><FaDollarSign style={{ fontSize: '150px', position: 'absolute', left: '-25', top: '50px', zIndex: '1', color: '#cacaca' }} /></i>
    </div>
    {/* <ToastDefault/> */}
  </ModalDefault>;
}

export default ModalCaixa;