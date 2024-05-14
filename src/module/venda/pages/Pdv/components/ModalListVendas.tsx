import { CircularProgress } from "@mui/material";
import { Column } from "devextreme-react/data-grid";
import React, { useContext, useEffect, useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { DataGridDefault, InputSelectDefault, ModalDefault } from "../../../../../components";
import { EnumStatusOrder } from "../../../../../domain/enums";
import { OrderSaleType } from "../../../../../domain/types/OrderSalesType";
import statusNota from "../mooks/statusNotas.json";
import { TableProduto } from "../styles";

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  sales: OrderSaleType[];
}

const ModalVenda: React.FC<ModalProps> = (props) => {
  const theme = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState<OrderSaleType[]>(props.sales);

  useEffect(() => {
    setDataSource(props.sales);
  }, [props.sales]);

  const eventClose = () => {
    props.closeModal();
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
      return (
        <i className="text-lg text-blue-400 cursor-pointer" onClick={() => actionNota(element)}>
          <FaFileImport id="buttonAction" className="ml-5" title="fazer ações na nota autorizar | cancelar " />
        </i>
      );
    }
  };

  // const search = (desc: string) => {
  //   if (desc !== "") {
  //     let produtos = props.sales.filter((e) => {
  //       return e.id.includes(desc);
  //     });
  //     setDataSource(produtos);
  //   } else {
  //     setDataSource(props.sales);
  //   }
  // };

  const filterStatus = (status: string) => {
    console.log(status);
    if (status !== "") {
      let notas = props.sales.filter((e) => e.status === status);
      setDataSource(notas);
    } else {
      setDataSource(props.sales);
    }
    document.getElementById("buscaVendas")?.focus();
  };

  const eventCaptureTecla = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.key === "Escape" ? eventClose() : null;
  };

  const actionNota = (nota: any) => {
    let venda = nota.data;
    if (venda.status === "A") {
      toast.success("Nota cancelada");
    } else if (venda.status === "P") {
      toast.success("Nota autorizada");
    } else {
      toast.error("Não é possivel autorizar uma nota cancelada");
      return;
    }
  };

  return (
    <ModalDefault
      key={"#modalvenda"}
      title="LISTA DAS VENDAS"
      isOpen={props.showModal}
      onRequestClose={eventClose}
      textBtnAction="Carregar venda pendente"
      width="calc(100vw - 100px)"
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
            </DataGridDefault>
          )}
        </TableProduto>
      </div>
    </ModalDefault>
  );
};

export default ModalVenda;
