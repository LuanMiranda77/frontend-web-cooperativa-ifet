import moment from 'moment';
import React, { useEffect } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { Divider, InputDate, InputDefault, InputFileProduto, InputMook, InputNumber, InputSelectDefault, ModalDefault } from "../../../../components";
import { ProdutoXml } from '../../../../domain/types/produtoXml';
import cfops from '../../../../helpers/help_lista_CFOP.json';
import useModalSincronizarItem from '../../../../hooks/mde/useModalSincronizarItem';
import { UtilsConvert } from '../../../../utils/utils_convert';
import { ContainerFoto } from './styles';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io'

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  tipo: number;
  produto: ProdutoXml;
}

export const ModalSincronizarProduto: React.FC<ModalProps> = (props) => {

  const {
    theme,
    isAtacado,
    setIsAtacado,
    produtoXml,
    setProdutoXml,
    produto,
    setProduto,
    isShowImpost, 
    setIsShowImpost,
    onConversaoMedida,
  } = useModalSincronizarItem(props)

  useEffect(() => {
    let produto = UtilsConvert.convertProdutoXmlToProduto({...props.produto});
    let produtoXml = {...props.produto};
    produto.saldo = (1*produtoXml.quantCom);
    setProdutoXml(produtoXml);
    setProduto(produto);
  },[props.produto]);


  return <ModalDefault key={"#modalcaixa"} title={props.tipo === 1 ? 'Sincronizar item' : 'Item novo'} isOpen={props.showModal} onRequestClose={props.closeModal} width='99%' margin='0.4rem' >
    <div className='card-local text-center p-2' style={{ marginTop: '-10px', height: 'calc(100vh - 200px)', background:(theme.title=='dark'? theme.colors.tertiary:theme.colors.white) }}>
      <div className='grid grid-cols-12 gap-3'>
        <InputMook className='col-span-1' label='Código' type='text' readOnly value={produto.codigo} onChange={(e)=> setProduto({...produto, codigo:Number(e.target.value)})}/>
        <InputDefault className='col-span-2' type='number' label='Código Barras' value={produto.ean} onChange={(e)=> setProduto({...produto, ean:e.target.value})}/>
        {props.tipo === 1 ?
          <div className='col-span-4'>
            <InputSelectDefault label='Descrição' options={[]} placeholder='Selecione um produto para sincronizar' isClearable isSearchable value={produto.nome} onChange={(e)=> setProduto({...produto, nome:e.target.value})}/>
          </div>
          :
          <InputDefault className='col-span-4' type='text' label='Nome' value={produto.nome} onChange={(e)=> setProduto({...produto, nome:e.target.value})}/>
        }
        <div className='col-span-3 flex justify-between items-center mr-3' style={{marginTop:'-40px'}}>
          <div className='w-full mr-2'>
            <InputSelectDefault label='Categoria' options={[]} placeholder='Selecione a categoria' isClearable isSearchable />
          </div>
          <FaPlusSquare className='mt-6' style={{ fontSize: '25px', color: theme.colors.primary }} />
        </div>
        <ContainerFoto className='col-span-2' >
          {/* <InputFileProduto lado='right' upload={()=>{}}/> */}
        </ContainerFoto>
      </div>


      <div className='flex'>

        <div className='w-3/12 mr-1'>
          {/* <div className='text-left  mb-3'>
            <p className="text-xs font-bold ">Conversão de médidas</p>
            <div className=' font-bold bg-gray-200 p-1 text-sm rounded-md'>
              <p>Quantas unidades deste item equivalem na sua empresa para converter corretamente as medidas?</p>
              <p className='text-blue-700'>ex: 01 CX é igual a 30 UN</p>
            </div>
          </div> */}

          <div className='text-left mb-3'>
            <p className="text-xs font-bold ">Medidas do XML</p>
            <div className='flex text-center w-full font-bold bg-gray-200 p-1 text-sm rounded-md'>
              <div className='mr-8 ml-1'>
                <p>Quantidade</p>
                <p>{produtoXml.quantCom}</p>
              </div>
              <div className='mr-8'>
                <p>Medida</p>
                <p>{produtoXml.uniCom}</p>
              </div>
              <div className='' style={{ color: theme.colors.error }}>
                <p>Saldo estoque</p>
                <p>{produtoXml.quantCom}</p>
              </div>
            </div>
          </div>

          <div className='text-left mb-3'>
            <p className="text-xs font-bold ">Medidas do seu item</p>
            <div className='flex text-center w-full font-bold'>
              <div className='mr-2'>
                <InputNumber placeholder='0,000' label='Quantidade' separadorDecimal=',' casaDecimal={3} separadorMilhar='.' prefixo='' fixedZeroFinal value={produto.fatorConversao} onChange={(e)=> onConversaoMedida(UtilsConvert.DecimalToNumber(e.target.value))}/>
              </div>
              <div className='mr-2 text-xs'>
                <InputDefault label='Medida' type='text' placeholder='UND' value={produto.unid} onChange={(e)=> setProduto({...produto, unid:e.target.value})}/>
              </div>
              <InputNumber placeholder='0,000' color={theme.colors.error} label='Saldo Estoque' separadorDecimal=',' casaDecimal={3} separadorMilhar='.' prefixo='' fixedZeroFinal value={produto.saldo} onChange={(e)=> setProduto({...produto, saldo:Number(e.target.value)})}/>
            </div>
          </div>

          <div className='flex justify-end'>
            <InputDate className="text-ms w-40 text-left mb-3" label="Data de vencimento" value={moment(produto.dtVencimento).format("YYYY-MM-DD")} onChange={(e)=> setProduto({...produto, dtVencimento: moment(e.target.value).toDate()})}/>
          </div>

          <div className='text-left'>
            <div className=' font-bold bg-gray-200 p-1 text-sm rounded-md'>
              <p>Informativo dos cálculos:</p>
              <p className='text-xs'>(quantidade do xml  X  quantidade do digitada) = Saldo</p>
              <p className='text-red-700'>ex: 01 x 30,00  = 30,00</p>
            </div>
          </div>

        </div>

        <Divider tipo='vertical' color='#d2d2d2' className='mr-2 ml-1'/>

        <div className='w-9/12'>
          <div className='text-left mb-3'>
          <p className="text-xs font-bold ">Cálculos de impostos</p>
            <div className='grid grid-cols-12 gap-3 mb-2 font-bold bg-gray-200 p-2 text-xs rounded-md'>
              <div className='col-span-1'>
                <p>NCM</p>
                <p>{produtoXml.ncm}</p>
              </div>
              <div className='col-span-1'>
                <p>CEST</p>
                <p>{produtoXml.cest}</p>
              </div>
              <div className='col-span-2'>
                <p>CFOP</p>
                <p>{produtoXml.cfop}</p>
              </div>
              <div className='col-span-2'>
                <p className=''>CST/CSOSN</p>
                <p>{produtoXml.cstIcms}</p>
              </div>
              <div className='col-span-1'>
                <p>% ICMS</p>
                <p>{produtoXml.porcIcms.toFixed(2)}</p>
              </div>
              <div className='col-span-1'>
                <p>ICMS</p>
                <p>{produtoXml.valorIcms.toFixed(2)}</p>
              </div>
              <div className='col-span-1'>
                <p>% IPI</p>
                <p>{produtoXml.porcIpi.toFixed(2)}</p>
              </div>
              <div className='col-span-1'>
                <p>IPI</p>
                <p>{produtoXml.valorIpi.toFixed(2)}</p>
              </div>
              <div className='col-span-1'>
                <p>% COFINS</p>
                <p>{""+produtoXml.porcCofins.toFixed(2)}</p>
              </div>
              <div className='col-span-1'>
                <p>COFINS</p>
                <p>{produtoXml.valorCofins.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className='text-left mt-2 mb-2'>
            <p className="text-xs font-bold ">Preços unitários</p>
            <div className='flex text-center w-full font-bold'>
              <div className='mr-4 w-32'>
                <InputNumber placeholder='00,00' label='Valor com imposto' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal readOnly />
              </div>
              <div className='mr-4  w-32'>
                <InputNumber placeholder='00,00' label='Valor de custo' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal value={produto.precoCusto} onChange={(e)=> setProduto({...produto, precoCusto:Number(e.target.value)})}/>
              </div>
              <div className='mr-4 w-32'>
                <InputNumber placeholder='00,00' label='Valor de venda' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.success} value={produto.precoVenda} onChange={(e)=> setProduto({...produto, precoVenda:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 w-32'>
                <InputNumber placeholder='0,000' label='Saldo mínimo' separadorDecimal=',' casaDecimal={3} separadorMilhar='.' prefixo='' fixedZeroFinal value={produto.saldoMinimo} onChange={(e)=> setProduto({...produto, saldoMinimo:Number(e.target.value)})}/>
              </div>
              {isAtacado &&
                <>
                  <div className='mr-4'>
                    <InputNumber placeholder='0,000' label='Quantidade mini p/atacado' separadorDecimal=',' casaDecimal={3} separadorMilhar='.' prefixo='' fixedZeroFinal value={produto.quantMinAtacado} onChange={(e)=> setProduto({...produto, quantMinAtacado:Number(e.target.value)})}/>
                  </div>
                  <div className='mr-4 w-32'>
                    <InputNumber placeholder='00,00' label='Preço de atacado' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.success} value={produto.precoAtacado} onChange={(e)=> setProduto({...produto, precoAtacado:Number(e.target.value)})}/>
                  </div>
                </>}
            </div>
          </div>

          <div className='w-full text-left flex items-center cursor-pointer ' onClick={()=>setIsShowImpost(!isShowImpost)}>
            <p className="text-md font-bold">Ver detalhes dos impostos</p>
            {!isShowImpost ? <IoMdArrowDropdown size={20}/> :<IoMdArrowDropup size={20}/>}
          </div>

          <div className='text-left' style={{display: isShowImpost ? 'block':'none', transition:'all 0.8s'}}>
            <p className="text-xs font-bold">Impostos</p>
            <div className='grid grid-cols-12 gap-3 mb-2'>
              <InputDefault className='col-span-2' type='number' label='NCM' value={produto.ncm} onChange={(e)=> setProduto({...produto, ncm:e.target.value})}/>
              <InputDefault className='col-span-2' type='number' label='CEST' value={produto.cest} onChange={(e)=> setProduto({...produto, cest:e.target.value})}/>
              <div className='col-span-7'>
                <InputSelectDefault label='CFOP' options={cfops.entrada} />
              </div>
              <InputDefault className='col-span-1' type='number' label='CST/CSOSN' value={produto.cstIcms} onChange={(e)=> setProduto({...produto, cstIcms:e.target.value})}/>
            </div>

            <div className='grid grid-cols-12 gap-3'>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='% ICMS' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.info} value={produto.porcIcms} onChange={(e)=> setProduto({...produto, porcIcms:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='ICMS' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.info} value={produto.valorIcms} onChange={(e)=> setProduto({...produto, valorIcms:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='% IPI' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.warning} value={produto.porcIpi} onChange={(e)=> setProduto({...produto, porcIpi:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='IPI' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.warning} value={produto.valorIpi} onChange={(e)=> setProduto({...produto, valorIpi:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='% COFINS' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.error} value={produto.porcConfis} onChange={(e)=> setProduto({...produto, porcConfis:Number(e.target.value)})}/>
              </div>
              <div className='mr-2 col-span-2'>
                <InputNumber placeholder='00,00' label='COFINS' separadorDecimal=',' casaDecimal={2} separadorMilhar='.' prefixo='' fixedZeroFinal color={theme.colors.error} value={produto.valorCofins} onChange={(e)=> setProduto({...produto, valorCofins:Number(e.target.value)})}/>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </ModalDefault>;
}