import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCameraRetro, FaSave, FaStoreAlt, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import * as yup from "yup";
import {
  ButtonBase,
  ButtonIcon, Divider, InputCheck, InputDefault,
  InputMask, InputSelectDefault, ModalDefault
} from "../../../../../../components";
import { EstabelecimentoType } from '../../../../../../domain';
import { RegimeTributario } from '../../../../../../domain/enums';
import tipos from '../../../../../../helpers/help_lista_uf.json';
import { RootState } from '../../../../../../store/index.store';
import { selectStateEstab } from '../../../../../../store/slices/estabelecimento.slice';
import { UtilsGeral } from '../../../../../../utils/utils_geral';
import { UtilsValid } from '../../../../../../utils/utils_valid';
import { Container, FormContainer } from './styles';
import { regimes } from './__mocks__';
import {save} from '../../../services/EstabelecimentoService';
import { UtilsConvert } from '../../../../../../utils/utils_convert';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  tipo: number;
  estabelecimento?:  EstabelecimentoType;
}


const FormEstabelecimento: React.FC<ModalProps> = (props) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const estabelecimentoSelect  = useSelector(selectStateEstab);
  const [ estabelecimento, setEstabelecimento ] = useState(props.estabelecimento);
  const [checkCPF, setCheckCPF] = useState(false);
  const [cpfSemMask, setCpfSemMask] = useState<string>();
  const [regime, setRegime] = useState<any>(regimes[0]);
  const [uf, setUF] = useState<any>();

  const schema = yup.object().shape({
    razao: yup.string().min(5, 'Digite no minímo 5 letras').required('O campo é obrigatório'),
    nome: yup.string().min(5, 'Digite no minímo 5 letras').required('O campo é obrigatório'),
    email: yup.string().email('E-mail inválido').required('O campo é obrigatório'),
    tel: yup.string().min(14, "Telefone incompleto").required('O campo é obrigatório'),
    cel: yup.string().min(16, "Celular incompleto").required('O campo é obrigatório'),
  }).required();

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  useEffect(()=>{
    let estTemp;
    if(props.tipo===1){
      estTemp = props.estabelecimento;
      setEstabelecimento(props.estabelecimento);
    }else{
      estTemp = estabelecimentoSelect;
      setEstabelecimento(estabelecimentoSelect);
    }
    if(estTemp?.cnpjCpf && estTemp.cnpjCpf.length===11){
      setCheckCPF(true);
    }else{
      setCheckCPF(false);
    }

    let regime = _.find(regimes, {'value': estTemp?.regime} );
    setRegime(regime);

    let uf  = _.find(tipos.estados, {'value': estTemp?.uf} );
    
    if(estTemp?.id){
      setUF(uf);
      reset({...estTemp});
      setValue('cnpjCpf', estTemp.cnpjCpf)
      setValue('cel', estTemp.celular1)
      setValue('tel', estTemp.foneFixo)
    }else{
      setUF("");
      reset({...estTemp});
      setValue('cnpjCpf', estTemp?.cnpjCpf)
      setValue('cel', estTemp?.celular1)
      setValue('tel', estTemp?.foneFixo)
    }

  },[estabelecimentoSelect, props.estabelecimento, props.tipo]);

 

  const eventClose = () => {
    props.closeModal();
  }

 
  const onSave = (form: FieldValues) => {

    let doc = UtilsGeral.removeMask(form.cnpjCpf);
    if (doc.length === 11 && !UtilsValid.isValidCPF(doc)) {
      toast.error(UtilsGeral.getEmoji(2) + ' Ops! O CPF digitado é inválido.');
      return
    }
    else if (doc.length > 11 && !UtilsValid.isValidCNPJ(doc)) {
      toast.error(UtilsGeral.getEmoji(2) + ' Ops! O CNPJ digitado é inválido.');
      return
    }

    if(estabelecimento!==undefined){
      save({
        ...estabelecimento,
        cnpjCpf:  doc,
        razao: form.razao,
        nome: form.nome,
        instEstadual: form.instEstadual,
        instMunicipal: form.instMunicipal,
        regime: regime.value === RegimeTributario.MEI ? RegimeTributario.MEI :
          regime.value === RegimeTributario.SIMPLES ? RegimeTributario.SIMPLES :
            regime.value === RegimeTributario.PRESUMIDO ? RegimeTributario.PRESUMIDO :
              RegimeTributario.REAL,
        codIbge: form.codIbge,
        cep: form.cep,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        uf: uf.value,
        foneFixo: UtilsGeral.removeMask(form.tel),
        celular1: UtilsGeral.removeMask(form.cel),
        logo: url,
        email: form.email,
        status:'S'
      }) 
      .then(response =>{
        toast.success(UtilsGeral.getEmoji(1)+"Efetuado com sucesso!"); 
        setEstabelecimento({...response});
        eventClose();
      })
      .catch(error=>{ toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario)});
    }

  }

  const [url, setUrl] = useState('');
  const uploadImge = (event: any) => {
    if (event.target.files[0]) {
      setUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  const form = () => {
    return (<>
      <header className="flex text-xl font-bold items-center justify-between mb-1 h-6" style={{ color: theme.colors.primary,  marginTop: (props.tipo === 1 ? '-1.5rem' : '-5px') }}>
        <div className="flex items-center justify-between" style={{ backgroundColor: (theme.title === 'dark' ? theme.colors.tertiary : theme.colors.white), borderRadius: '8px' }}>
          <i className="mr-1"><FaStoreAlt /></i>
          <label htmlFor="">Informações Principais</label>
        </div>
      </header>
      <Divider tipo="horizontal" />
      <FormContainer onSubmit={handleSubmit(onSave)}>
        <div id='informacoes' className="mb-3">
          <div>
            <InputCheck css="p-2" label="usar CPF?"
              checked={checkCPF}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCheckCPF(event.currentTarget.checked)}
            />
          </div>
          <div className="flex mb-3">
            <InputMask className="w-2/12 mr-5" label={checkCPF ? "CPF" : "CNPJ"}
              mask={checkCPF ? "999.999.999-99" : "99.999.999/9999-99"}
              onChange={(e) => setCpfSemMask(e.target.value)}
              required
              register={register('cnpjCpf')}
              // value={estabelecimento?.cnpjCpf}
            />
            {!checkCPF ?
              <>
                <InputDefault className="w-2/12 mr-5"
                  type="number"
                  label={"Ins. Estadual"}
                  max="11"
                  required 
                  register={register('instEstadual')}
      
                />
                <InputDefault className="w-2/12 mr-5"
                  type="number"
                  label={"Ins. Municipal"}
                  max="11"
                  register={register('instMunicipal')}
                 
                />
              </>
              :
              <></>
            }
            <div className="w-3/12" >
              <InputSelectDefault label="Regime da empresa" options={regimes}
                defaultValue={regimes[0]}
                value={regime}
                onChange={(e) => setRegime(e)}
              />
            </div>

            <div className='flex absolute' style={{ left: '87vw', top: '18vh', display: props.tipo === 1 ? 'none' : 'flex' }}>
              <div className='mr-2'>
                <label htmlFor="file"><FaCameraRetro className='text-blue-900 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '60px' }} /></label>
                <label><FaWindowClose className='text-red-500 text-2xl cursor-pointer' style={{ bottom: '0', marginTop: '5px' }} onClick={() => setUrl('')} /></label>
              </div>
              <input type="file" accept="image/png,image/jpeg" name='file' id='file' onChange={(event) => uploadImge(event)} />
              <div className='h-28 w-28 bg-gray-200 flex items-center justify-center border-2 border-blue-400 shadow-md'>

                {url === '' ?
                  <FaStoreAlt className='text-6xl text-gray-400' />
                  :
                  <img id='preview' src={url} alt="" />
                }
              </div>
            </div>

          </div>

          <div className="flex">
            <InputDefault className="w-5/12 mr-5"
              label="Razão"
              type="text"
              required
              register={register('razao')}
              errorMessage={errors.razao?.message}
            // value={estabelecimento.razao}

            />
            <InputDefault className="w-5/12 mr-5" label="Nome Fantasia"
              type="text"
              name='nome'
              required
              register={register('nome')}
              errorMessage={errors.nome?.message}
            />
            {!checkCPF ?
              <InputDefault className="w-2/12 mr-5" label="Código IBGE"
                type="number"
                required
                register={register('codIbge')}
              />
              : 
              <></>
            }

          </div>
        </div>

        <div id='endereco' className="mb-5 text-left">
          <p className="font-bold" style={{ color: (theme.title === 'dark' ? theme.colors.textLabel : theme.colors.primary) }}>Endereço</p>
          <Divider tipo="horizontal" className="mb-2" />
          <div className="flex mb-4">
            <InputMask className="w-1/12 mr-5" label="CEP" mask={'99999-999'} register={register('cep')} />
            <InputDefault className="w-5/12 mr-5" label="Logradouro" type="text" register={register('logradouro')}  />
            <InputDefault className="w-2/12 mr-5" label="Número" type="text" register={register('numero')} />
          </div>
          <div className="flex">
            <InputDefault className="w-3/12 mr-5" label="Bairro" type="text" register={register('bairro')} />
            <InputDefault className="w-3/12 mr-5" label="Cidade" type="text" register={register('cidade')} />
            <div className="w-2/12" >
              <InputSelectDefault label="UF" options={tipos.estados} placeholder='Estado...' value={uf} onChange={(e) => setUF(e)} />
            </div>
          </div>
        </div>

        <div id='contato'>
          <div className="flex">
            <InputMask className="w-40 mr-5" label="Telefone" mask={'(99) 9999-9999'}
              required
              register={register('tel')}
              errorMessage={errors.tel?.message}

            />
            <InputMask className="w-40 mr-5" label={"Celular"}
              mask={'(99) 9.9999-9999'}
              required
              register={register('cel')}
              errorMessage={errors.cel?.message}
            />
            <InputDefault className="w-4/12 mr-5" label="E-mail" type="email"
              required 
              register={register('email')}
              errorMessage={errors.email?.message}
              />
          </div>
        </div>

        <footer className="flex justify-end" style={{ bottom: 18, right: 10, position: 'absolute' }}>
          {props.tipo === 1 ?
            <>
              <ButtonBase label="CANCELAR" model="btn_line" className="primary-color mr-5  w-32" size="large" onClick={eventClose} />
              <ButtonIcon className="mr-3" label="SALVAR" icon={<FaSave />} width={'50%'} type='submit' />
            </>
            :
            <ButtonIcon type="submit" className="mr-3" label="SALVAR" icon={<FaSave />} width={'100%'} />
          }
        </footer>
      </FormContainer>
    </>
    )
  }

  return <>
    {props.tipo === 1 ?
      <ModalDefault key={"modalEstab"} title={'FICHA DO ESTABELECIMENTO'} isOpen={props.showModal} onRequestClose={eventClose} width='96%' height='95%' left='1%' margin='1%'>
        <div className='p-3'>
          {form()}
        </div>
      </ModalDefault>
      :
      <Container className="p-3">
        {form()}
      </Container>
    }
  </>

}
export default FormEstabelecimento;