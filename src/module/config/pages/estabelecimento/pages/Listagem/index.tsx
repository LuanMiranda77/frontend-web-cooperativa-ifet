
import { Column } from 'devextreme-react/data-grid';
import { useEffect, useState, useContext } from 'react';
import { FaFileContract, FaPenSquare, FaPlayCircle, FaPlus, FaRegPauseCircle, FaRegSun } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    ButtonIcon,
    DataGridDefault,
    DialogPopupConfirme
} from "../../../../../../components";
import { EstabelecimentoType } from '../../../../../../domain';
import { get, setStatus } from '../../../services/EstabelecimentoService';
import { TableContainer } from './styles';
import { ThemeContext } from 'styled-components';
import { RegimeTributario } from '../../../../../../domain/enums';
import {initialState} from '../../../../../../store/slices/estabelecimento.slice';
import _ from 'lodash';
import { UtilsConvert } from '../../../../../../utils/utils_convert';

import FormEstabelecimento from '../Form';
import { UtilsGeral } from '../../../../../../utils/utils_geral';
import ModalConfigModulo from '../config';



function ListEstabelecimentos() {

    const [dataSource, setDataSource] = useState<Array<EstabelecimentoType>>([]);
    const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoType>(initialState);
    const { colors, title } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalModulo, setShowModalModulo] = useState<boolean>(false);
    const [showPoupAtivo, setShowPopupAtivo] = useState<boolean>(false);
    const [showPoupInativo, setShowPopupInativo] = useState<boolean>(false);

    useEffect(() => {
        get().then(response => {
            let lista = [...response]
            setDataSource(lista);
        }).catch(error => {
            toast.error(error.mensagemUsuario);
        });

    }, [estabelecimento]);

    const showPopupConfirmeAction = (estabelecimento: EstabelecimentoType, tipo: number) => {
        setEstabelecimento(estabelecimento);
        (tipo === 1 ? setShowPopupAtivo(true) : setShowPopupInativo(true));
      }
    
      const onAtive = (estabelecimento: EstabelecimentoType) => {
        setStatus(estabelecimento.id, "S").then(response => {
          let data = _.map(dataSource, (value) => {
            if (estabelecimento.id === value.id) {
              value.status = 'S';
            }
            return value;
          });
          setDataSource(data);
          setShowPopupAtivo(false);
          toast.success(UtilsGeral.getEmoji(1)+'Bloqueado com sucesso');
        }).catch(error => {
          setShowPopupAtivo(false);
          toast.error(UtilsGeral.getEmoji(1)+error.mensagemUsuario);
        });
      }
    
      const onInative = (estabelecimento: EstabelecimentoType) => {
        setStatus(estabelecimento.id, "N").then(response => {
          let data = _.map(dataSource, (value) => {
            if (estabelecimento.id === value.id) {
              value.status = 'N';
            }
            return value;
          });
          setDataSource(data);
          setShowPopupInativo(false);
        }).catch(error => {
          setShowPopupInativo(false);
          toast.error(error.mensagemUsuario);
        });
      }

    const onNovo = () => {
      setEstabelecimento({...initialState});
      setShowModal(true);
    };

    const onEdit = (estabelecimento: EstabelecimentoType) => {
      setEstabelecimento({...estabelecimento});
      setShowModal(true);
    };

    const onShowModalModulo= (estabelecimento: EstabelecimentoType) => {
      setEstabelecimento({...estabelecimento});
      setShowModalModulo(true);
    };

    const renderCell = (element: any) => {

        if(element.columnIndex === 1){
            return <span className='font-bold'>{UtilsConvert.setMaskCpfCnpj(element.value)}</span>
        }
        else if(element.columnIndex === 5){
            return <span>{UtilsConvert.setMaskFone(element.value)}</span>
        }
        else if (element.value === "S") {
            return <div className='rounded-full h-6 text-center p-1' style={{ backgroundColor: colors.success }}><span className='font-bold text-white'>ATIVO</span></div>
        }
        else if (element.value === "N") {
            return <div className='rounded-full  h-6 text-center p-1' style={{ backgroundColor: colors.error }}><span className='font-bold text-white'>BLOQUEADO</span></div>
        }
        else if (element.columnIndex === 3) {
            let regime = '';
            if (element.value === RegimeTributario.MEI) {
                regime = 'MICROEMPREENDEDOR';
            } else if (element.value === RegimeTributario.SIMPLES) {
                regime = 'SIMPLES NACIONAL';
            } else if (element.value === RegimeTributario.PRESUMIDO) {
                regime = 'LUCRO PRESUMIDO';
            } else{
                regime = 'LUCRO REAL';
            } 
            return <span className='font-bold' style={{ color: colors.info }}>{regime}</span>
          }
        else{
                return <div className='flex items-center justify-center'>
                  {element.data.status === 'N' ?
                    <i className='text-2xl cursor-pointer mr-3' style={{ color: colors.success }}><FaPlayCircle id='buttonAtive' className='' title='Ativar usuário' onClick={() => showPopupConfirmeAction(element.data, 1)} /></i>
                    :
                    <i className='text-2xl cursor-pointer mr-3' style={{ color: colors.error }}><FaRegPauseCircle id='buttonInative' className='' title='Desativar usuário' onClick={() => showPopupConfirmeAction(element.data, 2)} /></i>
                  }
                  
                  <i className='text-2xl cursor-pointer  mr-3' style={{ color: colors.primary }}><FaFileContract id='buttonAction1' className='' title='Adicionar o certificado' onClick={() => onEdit(element.data)} /></i>
                  <i className='text-2xl cursor-pointer  mr-3' style={{ color: colors.primary }}><FaRegSun id='buttonAction2' className='' title='Configuração de módulos' onClick={() => onShowModalModulo(element.data)} /></i>
                  <i className='text-2xl cursor-pointer' style={{ color: colors.primary }}><FaPenSquare id='buttonAction3' className='' title='Editar estabelecimento' onClick={() => onEdit(element.data)} /></i>
                </div>
        }
    };

    return <>
        <TableContainer>
            <DataGridDefault
                isSearch
                cssSearch='w-11/12'
                headerChildren={
                    <div className='w-1/12 mr-2'>
                        <ButtonIcon label="Novo" icon={<FaPlus />} width={'100%'} onClick={onNovo} />
                    </div>
                }
                dataSource={dataSource}
                allowSorting={false}
                paginar={false}
                showRowLines
                rowAlternationEnabled
                showBorders
                showColumnLines
                hoverStateEnabled
                isSelectRow
            >
                <Column dataField='id' caption='CÓDIGO' alignment='center' dataType='string' width={100} cssClass='font-bold column-1' sortOrder={'asc'} />
                <Column dataField='cnpjCpf' caption='CPF/CNPJ' alignment='left' dataType='' width={150} cellRender={renderCell}  />
                <Column dataField='nome' caption='NOME' alignment='left' dataType='string' cssClass='font-bold' />
                <Column dataField='regime' caption='REGIME' alignment='left' dataType='string' cssClass='font-bold column-2' cellRender={renderCell} width={150} />
                <Column dataField='uf' caption='ESTADO' alignment='center' dataType='string' width={90} allowSearch={false} />
                <Column dataField='celular1' caption='CELULAR' alignment='left' dataType='string' width={120} cellRender={renderCell} allowSearch={false} />
                {/* <Column dataField='email' caption='E-MAIL' alignment='center' dataType='date' width={140} allowSearch={false}  /> */}
                <Column dataField='autorizado' caption='MOTIVO' alignment='center' dataType='string' width={140} allowSearch={false} />
                <Column dataField='status' caption='STATUS' alignment='center' dataType='string' width={120} cellRender={renderCell} allowSearch={false} />
                <Column dataField='' caption='' alignment='center' dataType='' width={150} cellRender={renderCell} allowSearch={false} />
            </DataGridDefault>
        </TableContainer>


        <DialogPopupConfirme title="Confirme" isOpen={showPoupInativo} onRequestClose={() => setShowPopupInativo(false)} onClickSim={() => onInative(estabelecimento)}>
            <p className="font-bold text-xl">Tem certeza que deseja bloquear o estabelecimento? </p>
            <p className="font-bold text-xs" style={{ color: colors.error }}>Todos os usuários do mesmo não poderão acessar o sistema até ser liberado!</p>
        </DialogPopupConfirme>

        <DialogPopupConfirme title="Confirme" isOpen={showPoupAtivo} onRequestClose={() => setShowPopupAtivo(false)} onClickSim={() => onAtive(estabelecimento)}>
            <p className="font-bold text-xl">Tem certeza que deseja liberar o estabelecimento? </p>
            <p className="font-bold text-xs" style={{ color: colors.error }}>Todos os usuários do mesmo acessarão o sistema normalmente</p>
        </DialogPopupConfirme>

        <FormEstabelecimento showModal={showModal} closeModal={()=>setShowModal(false)} tipo={1} estabelecimento={estabelecimento}/>

        <ModalConfigModulo showModal={showModalModulo} closeModal={()=>setShowModalModulo(false)} estabelecimento={estabelecimento} />
    </>

}
export default ListEstabelecimentos;