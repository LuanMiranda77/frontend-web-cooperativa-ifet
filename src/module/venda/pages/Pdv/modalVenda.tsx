import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { FaFileExcel, FaFileExport, FaFileImport, FaFileInvoice, FaFileSignature } from 'react-icons/fa';
import { toast } from "react-toastify";
import { ThemeContext } from 'styled-components';
import { ButtonIcon, DataGridDefault, InputSearch, InputSelectDefault, ModalDefault, } from "../../../../components";
import { ColumnsDataGridType } from '../../../../components/types';
import { TableProduto } from './styles';
import statusNota from './mooks/statusNotas.json';
import { element } from 'prop-types';
import e from 'express';

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalVenda: React.FC<ModalProps> = (props) => {

  const theme = useContext(ThemeContext);

  const eventClose = () => {
    props.closeModal();
  }

  const renderCell = (element: any) => {
    if (element.value === "A") {
      return <span className='p-4 font-bold text-white' style={{ backgroundColor: theme.colors.success }}>AUTORIZADA</span>
    } else if (element.value === "P") {
      return <span className='p-6 font-bold text-white ' style={{ backgroundColor: theme.colors.warning }}>PENDENTE</span>
    } else if (element.value === "C") {
      return <span className='p-5 font-bold text-white' style={{ backgroundColor: theme.colors.error }}>CANCELADA</span>
    } else {
      return <i className='text-lg text-blue-400 cursor-pointer' onClick={()=>actionNota(element)}><FaFileImport id='buttonAction' className='ml-5' title='fazer ações na nota autorizar | cancelar ' /></i>
    }
  }
  const columns = new Array<ColumnsDataGridType>();
  columns.push({ dataField: 'numero', caption: 'NÚMERO', alignment: 'center', dataType: '', width: 150, cssClass: 'font-bold column-1' });
  columns.push({ dataField: 'dataVenda', caption: 'DATA VENDA', alignment: 'center', dataType: 'date', cssClass: 'font-bold', allowSearch: false, defaultSortOrder:'desc' });
  columns.push({ dataField: 'bruto', caption: 'BRUTO', alignment: 'right', dataType: 'number', cssClass: 'font-bold', format: { type: 'fixedPoint', precision: 2 } });
  columns.push({ dataField: 'taxa', caption: 'TAXA', alignment: 'right', dataType: 'number', cssClass: 'font-bold column-2', format: { type: 'fixedPoint', precision: 2 } });
  columns.push({ dataField: 'desconto', caption: 'DESCONTO', alignment: 'right', dataType: 'number', format: { type: 'fixedPoint', precision: 2 } });
  columns.push({ dataField: 'liquido', caption: 'LIQUIDO', alignment: 'right', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 2 } });
  columns.push({ dataField: 'status', caption: 'STATUS', alignment: 'center', dataType: 'string', styleCell: renderCell });
  columns.push({ dataField: '', caption: '', alignment: '', dataType: '', width: 80, styleCell: renderCell });

  const data = [
    { numero: '1', dataVenda: '27/10/2022 07:15:15', bruto: 250.00, taxa: 10.00, liquido: 1502, desconto: 12, status: 'P' },
    { numero: '2', dataVenda: '27/10/2022', bruto: 35, taxa: 10, liquido: 1502, desconto: 12, status: 'C' },
    { numero: '3', dataVenda: '22/10/2022', bruto: 25, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '4', dataVenda: '12/08/2022', bruto: 50, taxa: 10, liquido: 1502, desconto: 12, status: 'C' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'P' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'P' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
    { numero: '1', dataVenda: '12/08/2022', bruto: 10.50, taxa: 10, liquido: 1502, desconto: 12, status: 'A' },
  ]
  const [dataSource, setDataSource] = useState(data);
  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);

  const search = (desc: string) => {
    if (desc !== '') {
      let produtos = dataSourceCopy.filter(produto => { return produto.numero.includes(desc) });
      setDataSource(produtos);
    } else {
      setDataSource(dataSourceCopy);
    }
  }

  const filterStatus = (status: string) => {
    if (status !== '') {
      let notas = _.filter(dataSourceCopy, { "status": status });
      setDataSource(notas);
    } else {
      setDataSource(dataSourceCopy);
    }
    document.getElementById('buscaVendas')?.focus();
  }

  const eventCaptureTecla = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.key === "Escape" ? eventClose() : null;
  }

  const actionNota = (nota: any) => {
    let venda = nota.data
    if (venda.status === 'A') {
      toast.success('Nota cancelada');
    } else if (venda.status === 'P') {
      toast.success('Nota autorizada');
    } else {
      toast.error('Não é possivel autorizar uma nota cancelada');
      return
    }
  }

  const transmitirPendencia = () =>{
    let data = dataSource.map(nota => {
      if(nota.status === "P"){
        nota.status="A";
      }
      return nota;
    } );
    setDataSource(data);
    document.getElementById('buscaVendas')?.focus();
  }

  return <ModalDefault key={"#modalvenda"} title="LISTA DAS VENDAS" isOpen={props.showModal} onRequestClose={eventClose}>
    <div className='p-3'>
      <div className='w-full p-2 card-local flex '>
        <div className='w-4/12'>
          <InputSearch id='buscaVendas' onChange={(e) => search(e.currentTarget.value)} autoFocus onKeyDownCapture={eventCaptureTecla} />
        </div>
        <div className='w-8/12 flex justify-end'>
          <div className='text-xs mr-10 text-center'>
            <ButtonIcon className='text-left' icon={<FaFileInvoice />} label='TRASMITIR PENDENTES' width='100%' 
            style={{ background: '#fff', border: '2px solid' + theme.colors.primary, color: theme.colors.primary }} 
            onClick={transmitirPendencia}></ButtonIcon>
          </div>
          <div className='w-3/12'>
            <InputSelectDefault label='' options={statusNota.tipos} isClearable={false} defaultValue={statusNota.tipos[0]} onChange={(e) => filterStatus(e.value)}/>
          </div>
        </div>
      </div>
      <TableProduto>
        <DataGridDefault
          columns={columns}
          dataSource={dataSource}
          allowSorting={false}
          paginar={false}
          showRowLines
          showBorders
          // showColumnLines
          hoverStateEnabled
          isSelectRow
          onRowDblClick={actionNota}
        />
      </TableProduto>
    </div>
    {/* <ToastDefault /> */}
  </ModalDefault>;
}

export default ModalVenda;