import { response } from 'express';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import { api } from "../../../config/api";
import { EstabelecimentoType } from '../../../domain';
import { Cargo } from '../../../domain/enums';
import { load, selectStateEstab } from '../../../store/slices/estabelecimento.slice';
import { loadEstabelecimentos, selectStateEstabelecimentos } from '../../../store/slices/estabelecimentos.slice';
import { persistLocalStorage } from '../../../utils/persistLocalStorage';
import { UtilsGeral } from '../../../utils/utils_geral';
import { UtilsUserLocal } from '../../../utils/utils_userLocal';
import { ModalLoad } from '../../Modal/ModalLoad';
import { ToastDefault } from '../../ToastDefault';
import { Container } from './styles';
import {BiSearch} from 'react-icons/bi'

interface InputSelectEstabelecimentoProps {
  //adicionar os props

}

export const InputSelectEstabelecimento: React.FC<InputSelectEstabelecimentoProps> = () => {
  const navegate = useNavigate();
  const [options, setOptions] = useState(new Array<any>());
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<any>();
  const dispatch = useDispatch();
  const estabelecimento = useSelector(selectStateEstab);
  const estabelecimentos = useSelector(selectStateEstabelecimentos);
  const { colors, title } = useContext(ThemeContext);

  // useEffect(() => {
  //   setModalShow(true);
  //   let user = UtilsUserLocal.getTokenLogin();
  //   if (user.cargo == Cargo.MASTER || user.cargo == Cargo.REVENDA) {
  //     user.setor = 0;
  //     let est =  persistLocalStorage('@selected-est', "", 'get');
  //     dispatch(load(est));
  //   }else{
  //     persistLocalStorage('@selected-est', "", 'remove');
  //   }
  //   api.get(`api/estabelecimento/estabelecimentos/${user.setor}/${user.cargo}`).then(resp => {

  //     if(typeof resp.data === 'string'){
  //       UtilsUserLocal.logout();
  //     }
  //     resp.data = [..._.orderBy(resp.data,['nome'], ['asc'])];
  //     if (resp.data.length === 1) {
  //       dispatch(load(resp.data[0]));
  //     } 
  //     else {
  //       let lista = new Array<any>();
  //       resp.data.forEach((estabelecimento: EstabelecimentoType) => {
  //         lista.push({
  //           label: estabelecimento.matrizId == null ?
  //             estabelecimento.nome :
  //             estabelecimento.matrizId === "0" ?
  //               estabelecimento.nome + ' - MATRIZ' :
  //               estabelecimento.nome + ' - FILIAL',
  //           value: estabelecimento.id
  //         })
  //       });
  //       setOptions(lista);
  //       dispatch(loadEstabelecimentos(resp.data));
  //     }
  //     setModalShow(false);
  //     return options;
  //   }).catch(error => {
  //     console.log(error.response.data);
  //       UtilsUserLocal.logout();
  //       navegate("/");
  //     return toast.error(UtilsGeral.getEmoji(2) + " " + error.response.data.message);
  //   });
  // }, [selectedEstabelecimento])

  const onSelect = (event: any) => {
    let selectEstabelecimento = _.find(estabelecimentos, { 'id': event.value });
    if (selectEstabelecimento) {
      let user = UtilsUserLocal.getTokenLogin();
      if (user.cargo == Cargo.MASTER) {
          persistLocalStorage('@selected-est', selectEstabelecimento, 'set');
      }
      dispatch(load(selectEstabelecimento));
    }
  }


  return <Container className='font-bold'>

    {options.length > 1 ?
      <Select id='select-estabelecimento'
        className='input'
        options={options}
        placeholder='Selecione o estabelecimento...'
        isSearchable={true}
        isClearable={true}
        onChange={(e) => { onSelect(e) }}
        // defaultValue={options[0]}
        components={{
          DropdownIndicator: () => (
            <BiSearch className='ml-2 mr-2' color={colors.primary} size={20}/>
          ),
        }}
        value={_.find(options, {'value':estabelecimento.id})}
      />
      :
      <div className='ml-1' style={{marginTop:'-3px'}}>
        <p className='text-lg font-bold' style={{color: colors.textLabel}}>{estabelecimento.name}</p>
        <p className='text-xs' style={{color: colors.warning}}>CNPJ/CPF: {estabelecimento.cnpjCpf}</p>
      </div>
    }
    <ModalLoad isOpen={modalShow} mensage='Carregando dados iniciais do estabelecimento aguarde...' onRequestClose={()=>setModalShow(false)}/>
  </Container>;
}