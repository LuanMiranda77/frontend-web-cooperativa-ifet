import { CircularProgress } from "@mui/material";
import { Column } from "devextreme-react/data-grid";
import React, { useContext, useEffect, useState } from "react";
import { FaFileCircleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { DataGridDefault, InputSelectDefault, ModalDefault } from "../../../../../components";
import { api } from "../../../../../config/api";
import { EnumStatusOrder } from "../../../../../domain/enums";
import { OrderSaleType } from "../../../../../domain/types/OrderSalesType";
import statusNota from "../mooks/statusNotas.json";
import { TableProduto } from "../styles";
import { UtilsConvert } from "../../../../../utils/utils_convert";

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  sales: OrderSaleType[];
  loadData: () => void;
}

const ModalVenda: React.FC<ModalProps> = (props) => {
  const theme = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState<OrderSaleType[]>(props.sales);
  const [isCancel, setIsCancel] = useState(false);
  const [notaCancel, setNotaCancel] = useState<any>();

  useEffect(() => {
    setDataSource(props.sales);
  }, [props.sales]);

  const eventClose = () => {
    props.closeModal();
  };

  const actionNota = (nota: any) => {
    api
      .put(`api/pedido/cancel?vendaId=${nota.id}`)
      .then(() => {
        props.loadData();
        toast.success("Venda cancelada");
        setIsCancel(false);
      })
      .catch((e) => toast.error("Erro:" + e));
  };

  const renderCell = (element: any) => {
    if (element.value === EnumStatusOrder.FINALIZADO) {
      return (
        <div className={`px-1 font-bold text-white border border-green-600 text-green-600 bg-green-200`}>
          Finalizada
        </div>
      );
    } else if (element.value === EnumStatusOrder.PENDENTE) {
      return (
        <div className="px-1 font-bold text-white w-full" style={{ backgroundColor: theme.colors.warning }}>
          Pendente
        </div>
      );
    } else if (element.value === EnumStatusOrder.CANCELADO) {
      return (
        <div className="px-1 font-bold text-white w-full" style={{ backgroundColor: theme.colors.error }}>
          Cancelada
        </div>
      );
    } else {
      return element.data.status !== EnumStatusOrder.CANCELADO && (
        <div className="text-lg text-blue-400 cursor-pointer flex justify-center" onClick={() => {setNotaCancel(element.data);setIsCancel(true)}}>
          <FaFileCircleExclamation id="buttonAction" className="" title="Cancelar venda" />
        </div>
      );
    }
  };

  const filterStatus = (status: string) => {
    if (status !== "") {
      let notas = props.sales.filter((e) => e.status === status);
      setDataSource(notas);
    } else {
      setDataSource(props.sales);
    }
    document.getElementById("buscaVendas")?.focus();
  };

  return (
    <>
      <ModalDefault
        key={"#modalvenda"}
        title="LISTA DAS VENDAS"
        isOpen={props.showModal}
        onRequestClose={eventClose}
        textBtnAction="Carregar venda pendente"
        width="calc(100vw - 100px)"
        isNotBtnCancel
        isNotBtnConfirmed
      >
        <div className="p-3">
          <TableProduto>
            {props.sales.length === 0 ? (
              <div className="w-full flex items-center justify-center h-80">
                <CircularProgress size={30} />
                <span className="text-xl font-bold ml-3">Carregando...</span>
              </div>
            ) : (
              <DataGridDefault
                dataSource={dataSource}
                allowSorting={false}
                paginar={false}
                showRowLines
                showBorders
                // showColumnLines
                moduloSeletion="single"
                height="85%"
                hoverStateEnabled
                isSelectRow
                isSearch
                headerChildren={
                  <div className="w-2/12">
                    <InputSelectDefault
                      label=""
                      options={statusNota.tipos}
                      isClearable={false}
                      defaultValue={statusNota.tipos[0]}
                      onChange={(e) => filterStatus(e.value)}
                    />
                  </div>
                }
                onRowDblClick={actionNota}
              >
                <Column
                  dataField="id"
                  caption="Código"
                  alignment="center"
                  dataType=""
                  width={100}
                  cssClass="font-bold column-1"
                />
                <Column
                  dataField="dateCreate"
                  caption="Venda"
                  alignment="center"
                  dataType="date"
                  cssClass="font-bold"
                  allowSearch={false}
                  // defaultSortOrder="desc"
                />
                <Column
                  dataField="valorTotal"
                  caption="Valor Bruto"
                  alignment="right"
                  dataType="number"
                  cssClass="font-bold"
                  format={{ type: "fixedPoint", precision: 2 }}
                />
                <Column
                  dataField="valorDesconto"
                  caption="Desconto"
                  alignment="right"
                  dataType="number"
                  cssClass="font-bold"
                  format={{ type: "fixedPoint", precision: 2 }}
                />
                <Column
                  dataField="valorLiquido"
                  caption="Valor Líquido"
                  alignment="right"
                  dataType="number"
                  cssClass="font-bold"
                  format={{ type: "fixedPoint", precision: 2 }}
                />
                <Column
                  dataField="status"
                  caption="Status"
                  alignment="center"
                  dataType="string"
                  cellRender={renderCell}
                  width={120}
                />
                <Column
                  dataField=""
                  caption="Ações"
                  alignment="center"
                  dataType="string"
                  cellRender={renderCell}
                  width={70}
                />
              </DataGridDefault>
            )}
          </TableProduto>
        </div>
      </ModalDefault>
      <ModalDefault
        title="Cancelar nota"
        isOpen={isCancel}
        onRequestClose={() => setIsCancel(false)}
        onClickAction={() => actionNota(notaCancel)}
        textBtnAction="Sim"
      >
        <p className="font-bold text-xl">Tem certeza que deseja cancelar? </p>
      <p className="font-bold text-center text-2xl" style={{ color: theme.colors.error }}>
        Venda: {notaCancel?.id} → {UtilsConvert.formatCurrency(notaCancel?.valorLiquido)}
      </p>
      </ModalDefault>
    </>
  );
};

export default ModalVenda;
