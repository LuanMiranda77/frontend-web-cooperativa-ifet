import { useContext, useMemo, useState } from "react";
import { FaArchive, FaBarcode, FaBox, FaBoxOpen, FaFileInvoice, FaHandHoldingMedical, FaHandHoldingUsd, FaIdCard, FaIdCardAlt, FaLongArrowAltLeft, FaMinusCircle, FaMoneyBillAlt, FaMoneyCheck, FaSync, FaTeamspeak, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from 'styled-components';
import { ButtonBase, ButtonPdv, DataGridDefault, DialogPopupConfirme, InputDefault, InputNumber, InputSelectDefault, ModalDefault, ModalLoad } from "../../../../components";
import { UtilsConvert } from '../../../../utils/utils_convert';

import { NumericFormat } from "react-number-format";
import { ColumnsDataGridType } from "../../../../components/types";
import ModalCaixa from './modalCaixa';
import ModalProduto from './modalProduto';
import ModalVenda from './modalVenda';
import { Container, ContainerLeft, ContainerMenu, ContainerProduto, ContainerRight } from './styles';
import cartoes from './mooks/tipoCartao.json';
/**
*@Author Luan Miranda
*@Issue 15
*/

function Pdv() {

  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showPoup, setShowPopup] = useState(false);
  const [showModalProd, setShowModalProd] = useState(false);
  const [showModalCaixa, setShowModalCaixa] = useState(false);
  const [showModalVenda, setShowModalVenda] = useState(false);
  const [showPoupFechamento, setShowPoupFechamento] = useState(false);
  const [ultimoPagamento, setUltimoPagamento] = useState(0);
  const [totalVenda, setTotalVenda] = useState(0);
  const [valorDigitado, setValorDigitado] = useState(0);
  const [saldoPagar, setSaldoPagar] = useState(0);
  const [troco, setTroco] = useState(0);
  const [tipoPagamento, setTipoPagamento] = useState(-1);
  const columns = new Array<ColumnsDataGridType>();
  columns.push({ dataField: 'item', caption: 'ITEM', alignment: 'center', dataType: '', width: 70, cssClass: 'font-bold column-1' });
  columns.push({ dataField: 'codigo', caption: 'Código', alignment: '', dataType: '', width: 70, cssClass: 'font-bold', visible: false });
  columns.push({ dataField: 'descricao', caption: 'DESCRIÇÃO', alignment: '', dataType: '', cssClass: 'font-bold column-2' });
  columns.push({ dataField: 'quantidade', caption: 'QUANTIDADE', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 3 }, width: 110 });
  columns.push({ dataField: 'valor', caption: 'VALOR', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 110 });
  columns.push({ dataField: 'desconto', caption: 'DESCONTO', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 110 });
  columns.push({ dataField: 'total', caption: 'TOTAL', alignment: 'right', dataType: 'number', cssClass: 'font-bold', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 150 });

  const dataSource = [
    { item: 1, descricao: 'produto', quantidade: 10.00, valor: 1502, desconto: 12.00, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32.00 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'produto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
  ]

  useMemo(() => {
    let soma = 0;
    dataSource.forEach(produto => {
      soma += produto.total;
    });
    setTotalVenda(soma);
    setSaldoPagar(soma);
  }, [totalVenda]);

  const calcvenda = () => {

  }

  const styleCell = (data: any) => {
    if (data.rowType === "data") {
      if (data.columnIndex === 5) {
        return (
          <span className="font-bold" style={{ color: theme.colors.error }}>
            {data.row.cells[data.columnIndex].value}
            {/* <CountUp end={data.row.cells[data.columnIndex].value} prefix='' separator="." decimal="," decimals={2} /> */}
          </span>
        );
      }
      else if (data.columnIndex === 1) {
        return (
          <div style={{ color: theme.colors.primary }}>
            <p className="text-black">Cod.55454</p>
            <p className="font-bold text-lg">{data.row.cells[data.columnIndex].value}</p>
            {/* <CountUp end={data.row.cells[data.columnIndex].value} prefix='' separator="." decimal="," decimals={2} /> */}
          </div>
        );
      }
    }
    return (
      <div style={{ color: "black" }}>
        {data.row.cells[data.columnIndex].value}
      </div>
    );
  };

  const eventCaptureTecla = (event: any) => {
    let key = event.key;
    switch (key) {
      case 'Insert':
        setShowModalProd(true);
        break;
      case 'F2':
        setShowModalCaixa(true);
        break;
      case 'F4':
        setShowModalCaixa(true);
        break;
      case 'F8':
        liberarPgamento(0);
        break;
      case 'F9':
        liberarPgamento(1);
        break;
      case 'F10':
        liberarPgamento(2);
        break;
      case 'Home':
        liberarPgamento(3);
        break;
      case 'End':
        liberarPgamento(3);
        break;
      case 'PageUp':
        setShowModalVenda(true);
        break;
      case 'PageDown':
        setShowModalCaixa(true);
        break;
      case 'Delete':
        setShowPopup(true);
        break;
      case 'Escape':
        setShowPopup(true);
        break;
      case 'Enter':
        tipoPagamento === 3 ? document.getElementById("Valor")?.focus()
          : calculaTroco()
        break;
    }
  }

  const closeModal = () => {
    setShowPoupFechamento(false);
  }

  const eventEsc = () => {
    setShowPopup(false);
    navigate('/');
    document.getElementById("#digite-produto")?.focus();
  }

  const calculaTroco = () => {
    document.getElementById("Troco")?.focus()
    if (valorDigitado > totalVenda) {
      let troco = valorDigitado - totalVenda;
      setTroco(troco);
    }
    console.log(valorDigitado, totalVenda);
  }

  const liberarPgamento = (tipo: number) => {
    setTipoPagamento(tipo);
    if (tipo === 0) {
      setShowPoupFechamento(true);
    } else if (tipo === 1) {
      setShowPoupFechamento(true);
    } else if (tipo === 2) {
      setShowPoupFechamento(true);
    } else if (tipo === 3) {
      setShowPoupFechamento(true);
    }
  }

  const efetuarPagamento = (event: any) => {
    if (event.key && event.key === 'Enter' && tipoPagamento === 0) {
      console.log(tipoPagamento);
      let restante = totalVenda - valorDigitado;
      setSaldoPagar(restante);
      setUltimoPagamento(valorDigitado);
      closeModal();
    }
    else if (event.key && event.key === 'Enter' && tipoPagamento === 1) {
      console.log(tipoPagamento);
    }
    else if (event.key && event.key === 'Enter' && tipoPagamento === 2) {
      console.log(tipoPagamento);
    }
    else if (event.key && event.key === 'Enter' && tipoPagamento === 3) {
      console.log(tipoPagamento);
    }
  }

  return <Container>
    <header>
      <div className="flex items-center text-left font-bold text-xs" style={{ color: theme.colors.textLabel }}>
        <FaTeamspeak className="text-3xl mr-2" />
        <div>
          <p>SUPORTE</p>
          <p style={{ color: theme.colors.warning }}>83 99638-6694</p>
        </div>
      </div>
      <div className="flex  items-center font-bold" style={{ color: theme.colors.textLabel }}>
        <div className="flex text-right items-center text-xs cursor-pointer" >
          <div className="mr-2">
            <p>CONSUMIDOR</p>
            <p style={{ color: theme.colors.success }}>MARIA</p>
          </div>
          <FaUserTie className="text-3xl" />
        </div>
        <div className="linha-vertical h-10 m-2"></div>
        <div className="flex text-left items-center text-xs cursor-pointer">
          <FaIdCardAlt className="text-3xl mr-2" />
          <div >
            <p>VENDEDOR</p>
            <p style={{ color: theme.colors.warning }}>MARIA</p>
          </div>
        </div>
        <div className="text-center font-bold text-xl ml-32">
          <p>CAIXA</p>
          <p>01</p>
        </div>
      </div>
    </header>
    <div className="flex font-bold" style={{ color: theme.colors.textLabel, backgroundColor: theme.colors.background }}>
      <ContainerLeft>
        <div className="h-22 p-2 flex" style={{ backgroundColor: theme.colors.tertiary }}>
          <div className="w-full">
            <label className="text-xs">DESCRIÇÃO DO ITEM  OU CÓDIGO</label>
            <div className="flex">
              <i className="mr-2"><FaBarcode style={{ height: '48px', width: '48px' }} /></i>
              <input
                id="#digite-produto"
                className="w-full text-4xl focus:outline-none"
                autoFocus
                type="text"
                style={{ background: 'transparent', border: 'none' }}
                onKeyDownCapture={eventCaptureTecla}
              />
            </div>
          </div>
          <div className="linha-vertical h-14 m-2"></div>
          <div className="p-1">
            <label htmlFor="" className="text-sm">QUANTIDADE</label>
            <NumericFormat
              className="w-32 text-4xl focus:outline-none" style={{ background: 'transparent', border: 'none' }}
              type={'text'}
              thousandSeparator={false}
              decimalSeparator={','}
              prefix={''}
              fixedDecimalScale={true}
              decimalScale={3}
            />
          </div>
        </div>
        <ContainerProduto>
          <DataGridDefault
            columns={columns}
            dataSource={dataSource}
            allowSorting={false}
            showColumnLines
            rowAlternationEnabled
            paginar={false}
          />
        </ContainerProduto>
        <footer className="flex h-22 p-2" style={{ backgroundColor: '#B4B8C5', borderTop: '2px solid ' + theme.colors.primary }}>
          <div className="w-32 text-left mr-10">
            <p className="text-xs text-black">ITEMS</p>
            <p className="text-3xl" style={{ color: theme.colors.info }}>{dataSource.length < 9 ? '0' + dataSource.length : dataSource.length}</p>
          </div>
          <div className="w-full text-right">
            <p className="text-xs text-black">TOTAL A PAGAR</p>
            <p className="text-6xl" style={{ color: theme.colors.error }}>{UtilsConvert.formatCurrency(totalVenda)}</p>
          </div>
        </footer>
      </ContainerLeft>

      {/* =======================================divisor=============== */}

      <ContainerRight>
        <header className="h-12" style={{ backgroundColor: theme.colors.info }}>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="">SALDO À PAGAR</label>
            <label htmlFor="" className="text-3xl">{UtilsConvert.formatCurrency(saldoPagar)}</label>
          </div>
        </header>
        <div className="shadow-lg">
          {/* <div className="h-32 shadow-lg" style={{ backgroundColor: theme.colors.primary }}>
            <div className="text-center p-3">
              <label className="text-xs">INFORME O VALOR PAGO E  CLIQUE NA FORMA DE PAGAMENTO</label>
              <NumericFormat
                id="saldoPagar"
                className="w-full h-10 focus:outline-none text-center text-3xl" style={{ background: 'transparent', border: 'none' }}
                type={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={''}
                fixedDecimalScale={true}
                decimalScale={2}
                placeholder='0,00'
                disabled={disablePagemento}
                onChange={(e) => setTroco(Number(e.currentTarget.value) - totalVenda)}
              />
            </div>
            <div className="flex items-center justify-between text-center p-1">
              <label className="text-xs mr-2" style={{ color: theme.colors.warning }}>TROCO</label>
              <label className="w-full text-3xl" style={{ color: theme.colors.warning }}>{UtilsConvert.formatCurrency(troco)}</label>
            </div>
          </div> */}
          <ContainerMenu className="">
            <div className="w-full text-center mb-2">
              <label className="text-xs">ESCOLHA A FORMA DE PAGAMENTO</label>
            </div>
            <div className="max-h-max lg:grid lg:grid-cols-3 lg:gap-3 font-bold mb-3">
              <ButtonPdv labelSuperior="INSERT" icon={<FaArchive className="text-xl" />} labelInferior="CONSULTAR PRODUTOS" onClick={() => setShowModalProd(true)} />
              <ButtonPdv labelSuperior="F2" icon={<FaBoxOpen className="text-2xl" />} labelInferior="CAIXA" onClick={() => setShowModalCaixa(true)} />
              <ButtonPdv labelSuperior="F4" icon={<FaBox className="text-xl" />} labelInferior="FECHAR CAIXA" onClick={() => setShowModalCaixa(true)} />
              <ButtonPdv labelSuperior="F8" icon={<FaHandHoldingUsd className="text-2xl" />} labelInferior="DINHEIRO" onClick={() => liberarPgamento(0)} />
              <ButtonPdv labelSuperior="F9" icon={<FaIdCard className="text-xl" />} labelInferior="VALE" onClick={() => liberarPgamento(1)} />
              {/* <ButtonPdv labelSuperior="F6" icon={<FaMoneyCheckAlt className="text-xl" />} labelInferior="CARTÃO DÉBITO" /> */}
              <ButtonPdv labelSuperior="F10" icon={<FaMoneyCheck className="text-xl" />} labelInferior="CARTÃO" onClick={() => liberarPgamento(2)} />
              <ButtonPdv labelSuperior="END" icon={<FaMoneyBillAlt className="text-xl" />} labelInferior="SANGRIA" onClick={() => liberarPgamento(3)} />
              <ButtonPdv labelSuperior="HOME" icon={<FaSync className="text-xl" />} labelInferior="ALTERAR PREÇO" />
              <ButtonPdv labelSuperior="PG UP" icon={<FaFileInvoice className="text-xl" />} labelInferior="VENDAS" onClick={() => setShowModalVenda(true)} />
              <ButtonPdv labelSuperior="PG DN" icon={<FaHandHoldingMedical className="text-xl" />} labelInferior="ADICIONAL" />
              <ButtonPdv labelSuperior="DEL" icon={<FaMinusCircle className="text-xl" />} labelInferior="CANCELAR PRODUTOS" />
              <ButtonPdv labelSuperior="ESC" icon={<FaLongArrowAltLeft className="text-xl" />} labelInferior="SAIR" onClick={dataSource.length > 0 ? () => setShowPopup(true) : () => navigate('/')} />
              {/* <Link to={'/'} onClick={() => setShowPopup(true)}>
              </Link> */}
            </div>
          </ContainerMenu>
        </div>
        <footer className="flex h-16">
          <div className="w-3/5 p-2" style={{ backgroundColor: theme.colors.info }}>
            {tipoPagamento !== -1 && tipoPagamento !== 3 ?
              <>
                {/* <a href="javascript:window.print();"> este</a> */}
                <p className="text-xs lg:text-lg">{tipoPagamento === 0 ? 'DINHEIRO' : tipoPagamento === 2 ? 'VALE' : 'CARTÃO'}</p>
                <p className="text-xs lg:text-2xl" style={{ marginTop: '-.5rem' }}>{UtilsConvert.formatCurrency(ultimoPagamento)}</p>
              </>
              : <></>
            }
          </div>
          <button className="w-2/5 font-bold button-pagamento" style={{ backgroundColor: theme.colors.success }}>
            <p className="text-xs lg:text-lg">CONFIRMAR</p>
            <p className="text-xs lg:text-xs" style={{ marginTop: '-.5rem' }}>PAGAMENTO</p>
          </button>
        </footer>
      </ContainerRight>
    </div>

    <DialogPopupConfirme title="Confirme" isOpen={showPoup} onRequestClose={() => setShowPopup(false)} onClickSim={eventEsc}>
      <p className="font-bold text-2xl">Tem certeza que deseja sair da venda? </p>
      <p className="font-bold" style={{ color: theme.colors.error }}>Esta venda ficará pendente ao sair da tela!</p>
    </DialogPopupConfirme>
    {/* <ModalLoad mensage="carregar notas..." isOpen={showPoup} onRequestClose={() => setShowPopup(false)}/> */}
    <ModalProduto showModal={showModalProd} closeModal={() => setShowModalProd(false)} />
    <ModalCaixa showModal={showModalCaixa} closeModal={() => setShowModalCaixa(false)} />
    <ModalVenda showModal={showModalVenda} closeModal={() => setShowModalVenda(false)} />

    {/* modal de pagamento */}
    <ModalDefault title="Confirmar"
      isOpen={showPoupFechamento}
      onRequestClose={closeModal}
      left='25%' width="50%">
      <div className="text-center">
        {tipoPagamento === 0 ?
          <div className='mb-1 font-bold card-local p-5 m-2'>
            <div className="">
              <label className="text-4xl font-bold " htmlFor="" style={{ color: theme.colors.primary }}>PAGAMENTO EM DINHEIRO</label>
              <hr className="mt-5" />
              <div className="text-right mt-2 mb-2">
                <p className="text-3xl">VALOR À PAGAR</p>
                <label className="text-5xl" style={{ color: theme.colors.error }}>{UtilsConvert.formatCurrency(saldoPagar)}</label>
              </div>
              <hr className="mb-5" />
              <div className="p-5 w-9/12" style={{ marginLeft: '13%' }}>
                <InputNumber id='saldoPagar' className='h-16 text-4xl text-center mb-5'
                  label='Valor pago'
                  prefixo=''
                  fixedZeroFinal
                  separadorMilhar={'.'}
                  casaDecimal={2}
                  separadorDecimal={','}
                  placeholder='R$ 0,00'
                  onChange={(e) => setValorDigitado(Number(e.currentTarget.value.replaceAll(',', '.')))}
                  autoFocus
                  onKeyDownCapture={eventCaptureTecla}
                />
                <InputNumber id='troco' className='h-16 text-4xl text-center'
                  label='Troco'
                  prefixo=''
                  fixedZeroFinal
                  separadorMilhar={'.'}
                  casaDecimal={2}
                  separadorDecimal={','}
                  placeholder='R$ 0,00'
                  readOnly={true}
                  value={troco}
                  onKeyDownCapture={efetuarPagamento}
                />
              </div>
              <ButtonBase label="PAGAR" model="btn_base" className="primary-color mt-3" onClick={() => efetuarPagamento({ key: 'Enter' })} />
            </div>
          </div>
          :
          tipoPagamento === 1 ?
            <div className='mb-10 font-bold card-local p-5 m-10'>
              <div className="mb-10">
                <label className="text-4xl font-bold " htmlFor="" style={{ color: theme.colors.primary }}>PAGAMENTO EM VALE</label>
                <hr className="mt-5" />
                <div className="text-right mt-2 mb-2">
                  <p className="text-3xl">VALOR À PAGAR</p>
                  <label className="text-5xl" style={{ color: theme.colors.error }}>{UtilsConvert.formatCurrency(saldoPagar)}</label>
                </div>
                <hr className="mb-5" />
                <div className="p-5 w-9/12" style={{ marginLeft: '13%' }}>
                  <InputSelectDefault className="text-left"
                    label="Consumidor"
                    placeholder="Selecione o consumidor..."
                    isClearable
                    autoFocus
                    options={[{ value: '1', label: 'JOÃO' }, { value: '1', label: 'MARIA' }]}
                    onKeyDownCapture={efetuarPagamento}
                  />
                  <InputNumber id='saldoPagar' className='h-16 text-4xl text-center mb-5'
                      label='Valor pago'
                      prefixo=''
                      fixedZeroFinal
                      separadorMilhar={'.'}
                      casaDecimal={2}
                      separadorDecimal={','}
                      placeholder='R$ 0,00'
                      onChange={(e) => setValorDigitado(Number(e.currentTarget.value.replaceAll(',', '.')))}
                      onKeyDownCapture={efetuarPagamento}
                    />
                </div>
                <ButtonBase label="PAGAR" model="btn_base" className="primary-color mt-8" onClick={() => efetuarPagamento({ key: 'Enter' })} />
              </div>
            </div>
            :
            tipoPagamento === 2 ?
              <div className='mb-10 font-bold card-local p-5 m-10'>
                <div className="mb-10">
                  <label className="text-4xl font-bold " htmlFor="" style={{ color: theme.colors.primary }}>PAGAMENTO EM CARTÃO</label>
                  <hr className="mt-5" />
                  <div className="text-right mt-2 mb-2">
                    <p className="text-3xl">VALOR À PAGAR</p>
                    <label className="text-5xl" style={{ color: theme.colors.error }}>{UtilsConvert.formatCurrency(saldoPagar)}</label>
                  </div>
                  <hr className="mb-5" />
                  <div className="p-5 w-9/12" style={{ marginLeft: '13%' }}>
                    <InputSelectDefault className="text-left"
                      label="Tipo do Cartão"
                      isClearable
                      autoFocus
                      placeholder="Selecione o cartão..."
                      options={cartoes.tipos}
                      // onKeyDownCapture={efetuarPagamento}
                    />
                    <InputNumber id='saldoPagar' className='h-16 text-4xl text-center mb-5'
                      label='Valor pago'
                      prefixo=''
                      fixedZeroFinal
                      separadorMilhar={'.'}
                      casaDecimal={2}
                      separadorDecimal={','}
                      placeholder='R$ 0,00'
                      onChange={(e) => setValorDigitado(Number(e.currentTarget.value.replaceAll(',', '.')))}
                      onKeyDownCapture={efetuarPagamento}
                    />
                  </div>
                  <ButtonBase label="PAGAR" model="btn_base" className="primary-color mt-8" onClick={() => efetuarPagamento({ key: 'Enter' })} />
                </div>
              </div>
              :
              <div className='mb-10 font-bold card-local p-5 m-10'>
                <div className="mb-10">
                  <label className="text-4xl font-bold " htmlFor="" style={{ color: theme.colors.primary }}>SANGRIA</label>
                  <hr className="mb-5" />
                  <div className="p-5 w-9/12" style={{ marginLeft: '13%' }}>
                    <InputDefault className="text-left mb-10 h-12"
                      type="text"
                      label="Motivo"
                      placeholder="Digite o motivo da sangria"
                      autoFocus
                      onKeyDownCapture={eventCaptureTecla}
                    />
                    <InputNumber id='valor-3' className='h-16 text-4xl text-center'
                      label='Valor'
                      prefixo='R$ '
                      fixedZeroFinal
                      separadorMilhar={'.'}
                      casaDecimal={2}
                      separadorDecimal={','}
                      placeholder='R$ 0,00'
                      // onChange={(e)=> setValorDigitado(Number(e.currentTarget.value))}
                      onKeyDownCapture={efetuarPagamento}
                    />
                  </div>
                  <ButtonBase label="PAGAR" model="btn_base" className="primary-color mt-8" onClick={() => efetuarPagamento({ key: 'Enter' })} />
                </div>
              </div>
        }
      </div>
    </ModalDefault>

  </Container>;
}
export default Pdv;