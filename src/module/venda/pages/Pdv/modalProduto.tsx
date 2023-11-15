import React, { useState, useContext } from 'react';
import { DataGridDefault, InputIcon, InputSearch, ModalDefault } from "../../../../components";
import { UsageState } from "webpack";
import { FaSearch } from 'react-icons/fa';
import { ColumnsDataGridType } from '../../../../components/types';
import _ from 'lodash';
import { TableProduto } from './styles';
import { ThemeContext } from 'styled-components';

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalProduto: React.FC<ModalProps> = (props) => {

  const theme = useContext(ThemeContext);

  const eventClose = () => {
    props.closeModal();
  }
  const columns = new Array<ColumnsDataGridType>();
  columns.push({ dataField: 'item', caption: 'ITEM', alignment: 'center', dataType: '', width: 70, cssClass: 'font-bold column-1' });
  columns.push({ dataField: 'codigo', caption: 'Código', alignment: '', dataType: '', width: 70, cssClass: 'font-bold', visible: false });
  columns.push({ dataField: 'descricao', caption: 'DESCRIÇÃO', alignment: '', dataType: '', cssClass: 'font-bold column-2' });
  columns.push({ dataField: 'quantidade', caption: 'QUANTIDADE', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 3 }, width: 110 });
  columns.push({ dataField: 'valor', caption: 'VALOR', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 110 });
  columns.push({ dataField: 'desconto', caption: 'DESCONTO', alignment: 'center', dataType: 'number', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 110 });
  columns.push({ dataField: 'total', caption: 'TOTAL', alignment: 'right', dataType: 'number', cssClass: 'font-bold', allowSearch: false, format: { type: 'fixedPoint', precision: 2 }, width: 150 });

  const data = [
    { item: 1, descricao: 'produto1', quantidade: 10.00, valor: 1502, desconto: 12.00, total: 32 },
    { item: 1, descricao: 'tudo', quantidade: 10, valor: 1502, desconto: 12, total: 32.00 },
    { item: 1, descricao: 'tudynho', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
    { item: 1, descricao: 'luto', quantidade: 10, valor: 1502, desconto: 12, total: 32 },
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
  const [dataSource, setDataSource] = useState(data);
  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);

  const search = (desc: string) => {
    if (desc !== '') {
      let produtos = dataSourceCopy.filter(produto => { return produto.descricao.includes(desc) });
      setDataSource(produtos);
    } else {
      setDataSource(dataSourceCopy);
    }
  }

  const eventCaptureTecla = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.key === "Escape" ? eventClose() : null;
  }

  return <ModalDefault key={"#modalproduto"} title="LISTA DOS PRODUTOS" isOpen={props.showModal} onRequestClose={eventClose}>
    <div>
      <div className='w-full p-2 card-local'>
        <div className='w-3/6'>
          <InputSearch onChange={(e) => search(e.currentTarget.value)} autoFocus onKeyDownCapture={eventCaptureTecla}/>
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
          showColumnLines
          hoverStateEnabled
          isSelectRow
        />
      </TableProduto>
    </div>

  </ModalDefault>;
}

export default ModalProduto;