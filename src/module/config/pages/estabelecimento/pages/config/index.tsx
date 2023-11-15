
import TreeView from 'devextreme-react/tree-view';
import React, {useContext, useEffect, useState} from 'react';
import { FaSave } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';
import { ButtonBase, ButtonIcon, Divider, InputCheck, InputSelectDefault, ModalDefault } from '../../../../../../components';
import { EstabelecimentoType } from '../../../../../../domain';
import { ConfigModuloType } from '../../../../../../domain/types/configModulo';
import { UtilsConvert } from '../../../../../../utils/utils_convert';
import { MenuContainer } from './styles';
import { dataSource } from './__mocks__';
import {saveModulo, getModulo} from '../../../services/EstabelecimentoService';
import { error } from 'console';
import { toast } from 'react-toastify';
import { UtilsGeral } from '../../../../../../utils/utils_geral';

interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
    estabelecimento?:  EstabelecimentoType;
  }

const ModalConfigModulo: React.FC<ModalProps> = (props) => {

    let config = {
        orcamento: "S",
        pedido: "S",
        filial: "N",
        prevenda:"S",
        nfe:"N",
        nfce: "N",
        sat: "N",
        mdfe:"N",
        mde: "S",
        contas:"N",
        planoContas :"N",
        controleCaixa:"N",
        transferenciaEstoque:"N",
        balanca:"N",
        numCasaDecimais: 1
    } as ConfigModuloType;

    const { colors, title } = useContext(ThemeContext);
    const [showOptions, setShowOptions] = useState('1');
    const op = [{label:'START', value:'1'}, {label:'COMMERCE', value:'2'}, {label:'SUPER LOJA', value:'3'}];
    const [options,setOptions] = useState(op);
    const [configModulo, setConfigModulo] = useState<ConfigModuloType>(config);

    useEffect(()=>{
        console.log(props.estabelecimento?.id);
        if(props.estabelecimento?.id){
            getModulo(props.estabelecimento.id).then( response =>{
                console.log(response);
                setConfigModulo(response);
                toast.success(UtilsGeral.getEmoji(1)+"Efetuado com sucesso");
            })
            .catch(error=>{toast.error(UtilsGeral.getEmoji(2)+error.mensagemUsuario)});
        }
    }, []);




    const geral = (
        <div>
            <InputCheck css='mb-5 mt-2' label='Orçamento'
                checked={configModulo?.orcamento=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, orcamento:'S'} : {...configModulo, orcamento:'N'})}
            />
            <InputCheck css='mb-5' label='Pedido'
                checked={configModulo?.pedido=== "S" ? true : false} 
                 onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, pedido:'S'} : {...configModulo, pedido:'N'})}
            />
            <InputCheck css='mb-5' label='Pré-venda'
                checked={configModulo?.prevenda=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, prevenda:'S'} : {...configModulo, prevenda:'N'})}
            />
            <InputCheck css='mb-5' label='Modo de cadastro para Filial'
                checked={configModulo?.filial=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, filial:'S'} : {...configModulo, filial:'N'})}
            />
        </div>
    );

    const fiscal = (
        <div>
            <InputCheck css='mb-5 mt-2' label='nfe'
                checked={configModulo?.nfe=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, nfe:'S'} : {...configModulo, nfe:'N'})}
            />
            <InputCheck css='mb-5' label='nfce'
                checked={configModulo?.nfce=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, nfce:'S'} : {...configModulo, nfce:'N'})}
            />
            <InputCheck css='mb-5' label='mdfe'
                checked={configModulo?.mdfe=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, mdfe:'S'} : {...configModulo, mdfe:'N'})}
            />
            <InputCheck css='mb-5' label='sat'
                checked={configModulo?.sat=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, sat:'S'} : {...configModulo, sat:'N'})}
            />
            <InputCheck css='mb-5' label='mde'
                checked={configModulo?.mde=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, mde:'S'} : {...configModulo, mde:'N'})}
            />
        </div>
    );

    const onChangeModulo = (value: string) => {
        console.log(value);
        // setConfigModulo(config);
        if(value === '1'){
            let modulos = {...configModulo}
            modulos.orcamento="S"
            modulos.pedido="S"
            modulos.prevenda="S"
            modulos.filial="N"
            modulos.nfe="N"
            modulos.nfce="N"
            modulos.mdfe="N"
            modulos.sat="N"
            modulos.mde="S"
            modulos.contas="N"
            modulos.planoContas ="N"
            modulos.controleCaixa="S"
            modulos.transferenciaEstoque="N"
            modulos.balanca="N"
            modulos.controleCaixa="S"


            setConfigModulo(modulos);
        }else if(value === '2'){
            let modulos = {...configModulo}
            modulos.orcamento="S"
            modulos.pedido="S"
            modulos.prevenda="S"
            modulos.filial="N"
            modulos.mde="S"
            modulos.nfe="S"
            modulos.nfce="S"
            modulos.mdfe="S"
            modulos.contas="S"
            modulos.planoContas ="S"
            modulos.controleCaixa="S"
            modulos.transferenciaEstoque="N"
            modulos.balanca="N"
            modulos.controleCaixa="S"
            setConfigModulo(modulos);
        }else{
            let modulos = {...configModulo}
            modulos.orcamento="S"
            modulos.pedido="S"
            modulos.prevenda="S"
            modulos.filial="S"
            modulos.mde="S"
            modulos.nfe="S"
            modulos.nfce="S"
            modulos.mdfe="S"
            modulos.contas="S"
            modulos.planoContas ="S"
            modulos.controleCaixa="S"
            modulos.transferenciaEstoque="S"
            modulos.balanca="S"
            modulos.controleCaixa="S"
            setConfigModulo(modulos);
        }
    };

    const estoque = (
        <div>
            <InputCheck css='mb-5 mt-2' label='Transferencia'
                checked={configModulo?.transferenciaEstoque=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, transferenciaEstoque:'S'} : {...configModulo, transferenciaEstoque:'N'})}
            />
        </div>
    );

    const financeiro = (
        <div>
            <InputCheck css='mb-5 mt-2' label='Contas'
                checked={configModulo?.contas=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, contas:'S'} : {...configModulo, contas:'N'})}
            />
            <InputCheck css='mb-5' label='Controle Caixa'
                checked={configModulo?.controleCaixa=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, controleCaixa:'S'} : {...configModulo, controleCaixa:'N'})}
            />
            <InputCheck css='mb-5' label='Plano de contas'
                checked={configModulo?.planoContas=== "S" ? true : false} 
                onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, planoContas:'S'} : {...configModulo, planoContas:'N'})}
            />
        </div>
    );

    const integracao = (
        <div>
            {/* <InputCheck css='mb-5 mt-2' label='Contas'/>
            <InputCheck css='mb-5' label='Controle Caixa'/> */}
            {/* <InputCheck css='mb-5' label='Pre-venda'/> */}
            <InputCheck css='mb-5' label='Balança'
                 checked={configModulo?.balanca=== "S" ? true : false} 
                 onChange={(e)=>setConfigModulo(e.target.checked ? {...configModulo, balanca:'S'} : {...configModulo, balanca:'N'})}
            />
        </div>
    );

    const onSelectMenu = (item: any) => {
        let id = item.itemData.id;
        setShowOptions(id);
    }

    const onSave = () =>{
        saveModulo(configModulo).then(responses =>{
            toast.success(UtilsGeral.getEmoji(1)+'Efetuado com sucesso');
        })
        .catch(error =>{
            toast.error(UtilsGeral.getEmoji(2)+error.mensagemUsuario);
        });

    }

  return <ModalDefault title='CONFIGURAÇÃO DE MÓDULOS' isOpen={props.showModal} onRequestClose={props.closeModal} width="97%" height='95%' margin='1%'>

        <header className='w-full h-18 p-2' style={{backgroundColor: colors.gray, marginTop:'-8px'}}>
            <div className='flex font-bold'>
                <div className='w-10/12 text-left'>
                    <p className=' mb-2'>
                        <span className='mr-1' style={{color: title==='dark' ? colors.textLabel : colors.primary}}>Código:</span>
                        {props.estabelecimento?.id}
                    </p>
                    <label className='mr-5'>
                        <span className='mr-1' style={{color: title==='dark' ? colors.textLabel : colors.primary}}>CNPJ/CPF:</span>
                        {UtilsConvert.setMaskCpfCnpj(props.estabelecimento?.cnpjCpf !== undefined ? props.estabelecimento?.cnpjCpf:'')}
                    </label>
                    <label>
                        <span className='mr-1' style={{color: title==='dark' ? colors.textLabel : colors.primary}}>Nome:</span>
                        {props.estabelecimento?.nome}
                    </label>
                </div>
                <div className='w-2/12 flex rounded-full items-center justify-center h-12 mt-1' 
                    style={{backgroundColor: props.estabelecimento?.status ==='S' ? colors.success : colors.error, color: colors.textLabel}}
                    >
                    {props.estabelecimento?.status}
                </div>
            </div>
        </header>

        <div className='w-full h-full flex mt-3 font-bold text-left' style={{height:'calc(100vh - 340px)'}}>

            <div className='w-3/12 p-1'>
                <div className='w-full text-left'>
                    <p>Módulos</p>
                    {/* <Divider  tipo='vertical' className='mr-2 ml-2' color='red'/> */}
                    <hr />
                </div>
                <MenuContainer className='font-bold'>
                    <TreeView
                        id="treeview"
                        items={dataSource}
                        width={'100%'}
                        height={'100%'}
                        searchMode={'contains'}
                        searchEnabled={false}
                        className='text-white'
                        onItemClick={onSelectMenu}
                        noDataText=''
                    
                    />
                </MenuContainer>
            </div>

            <Divider  tipo='horizontal' className='mr-2 ml-2 h-40'/>
            <hr className='linha-vertical mt-8 mr-4 h-full' style={{color: colors.gray}}/>

            <div className='w-6/12 p-1'>
                <div className='w-full text-left'>
                    <p>Opções</p>
                    <Divider  tipo='vertical' className=''/>
                    <hr />
                </div>
                <div className='p-2'>
                    { showOptions === "1" ? 
                        geral :
                      showOptions === "2" ? 
                        fiscal:
                        showOptions === "3" ?
                        estoque:
                        showOptions === "4" ?
                        financeiro:
                        integracao
                    }
                </div>
            </div>

            <div className='w-3/12'>
                <InputSelectDefault className='Módulos' label='Configurar módulo' defaultValue={options[0]} options={options} isSearchable={false} onChange={(e)=>onChangeModulo(e.value)}/>
            </div>

        </div>
        <footer className=''>
            <div className="flex justify-end" style={{ bottom: 25, right: 15, position: 'absolute' }}>
              <ButtonBase label="CANCELAR" model="btn_line" className="primary-color mr-5  w-32" size="large" onClick={() => props.closeModal()} />
              <ButtonIcon className="mr-3" label="SALVAR" icon={<FaSave />} width={'50%'} onClick={onSave} />
            </div>
          </footer>
  </ModalDefault>;
}

export default ModalConfigModulo;