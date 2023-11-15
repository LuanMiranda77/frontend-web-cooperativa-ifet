import React, { useContext } from "react";
import { FaDollarSign, FaSearch } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import {
  ButtonIcon,
  DataGridDefault,
  InputDate,
  SummaryDefault,
} from "../../../../../components";
import { ProdutoType } from "../../../../../domain";
interface TabProps {

  product: ProdutoType;
  setProduct: (product: ProdutoType) => void;
}

const TabMovimentation: React.FC<TabProps> = ({
  product,
  setProduct,
}) => {
  const { title, colors } = useContext(ThemeContext);
  const renderCellMov = (element: any) => {
    if (element.value < 0) {
      return (
        <span className="font-bold" style={{ color: colors.error }}>
          {element.value}
        </span>
      );
    } else if (element.value > 0) {
      return (
        <span className="font-bold" style={{ color: colors.success }}>
          {element.value}
        </span>
      );
    } else if (element.value.includes("S")) {
      return (
        <span className="font-bold" style={{ color: colors.error }}>
          {element.value}
        </span>
      );
    } else if (element.value.includes("E")) {
      return (
        <span className="font-bold" style={{ color: colors.success }}>
          {element.value}
        </span>
      );
    }
  };

  const columnsMovimentacao = [
    {
      dataField: "dataMov",
      caption: "DATA MOVIMENTO",
      alignment: "center",
      dataType: "date",
      cssClass: "font-bold column-1",
    },
    {
      dataField: "quant",
      caption: "QUANT.",
      alignment: "center",
      dataType: "number",
      styleCell: renderCellMov,
      format: { type: "fixedPoint", precision: 3 },
    },
    {
      dataField: "unit",
      caption: "UNITÁRIO",
      alignment: "center",
      dataType: "number",
      format: { type: "fixedPoint", precision: 2 },
    },
    {
      dataField: "desconto",
      caption: "DESCONTO",
      alignment: "center",
      dataType: "number",
      format: { type: "fixedPoint", precision: 2 },
    },
    {
      dataField: "acresimo",
      caption: "ACRÉSIMO",
      alignment: "center",
      dataType: "number",
      format: { type: "fixedPoint", precision: 2 },
    },
    {
      dataField: "total",
      caption: "TOTAL",
      alignment: "center",
      dataType: "number",
      format: { type: "fixedPoint", precision: 2 },
    },
    {
      dataField: "tipo",
      caption: "TIPO",
      alignment: "center",
      dataType: "string",
      styleCell: renderCellMov,
    },
  ];
  const dataMov = [
    {
      dataMov: "12/12/2022",
      quant: -120,
      unit: 123,
      desconto: 15,
      acresimo: 5,
      total: 50,
      tipo: "SV",
    },
    {
      dataMov: "12/12/2022",
      quant: 500,
      unit: 123,
      desconto: 15,
      acresimo: 5,
      total: 50,
      tipo: "EX",
    },
    {
      dataMov: "12/12/2022",
      quant: -120,
      unit: 123,
      desconto: 15,
      acresimo: 5,
      total: 50,
      tipo: "SV",
    },
  ];

  return (
    <div className="tab3">
      <div className="w-full flex items-center mb-5">
        <div className="w-3/12 text-left mr-5">
          <InputDate label="Data de inicio" />
        </div>
        <div className="w-3/12 text-left mr-5">
          <InputDate label="Data final" />
        </div>
        <div className="mt-6 w-2/12">
          <ButtonIcon label="Pesquisa" icon={<FaSearch />} width="100%" />
        </div>
      </div>
      <div className="mb-3" style={{ height: "calc(100vh - 440px)" }}>
        <DataGridDefault
          columns={columnsMovimentacao}
          dataSource={dataMov}
          allowSorting
          paginar={false}
          // showRowLines
          rowAlternationEnabled
          showBorders
          showColumnLines
          hoverStateEnabled
          isSelectRow
          moduloSeletion="single"
        />
      </div>
      {/* <Divider tipo="horizontal" className="mb-1" /> */}
      <div className="flex w-full">
        <div className="w-6/12 text-left">
          <p className="font-bold" style={{ color: colors.primary }}>
            INDICADORES
          </p>
          <div className="flex">
            <div
              className="text-xs font-bold mr-5"
              style={{ color: colors.success }}
            >
              <p>EX → ENTRA POR XML</p>
              <p>EA → ENTRA AVUSO</p>
              <p>EM → ENTRA MANUAL</p>
            </div>
            <div className="text-xs font-bold" style={{ color: colors.error }}>
              <p>SV → SAIDA VENDA</p>
              <p>SD → SAIDA DESPERDICIO</p>
              <p>SM → SAIDA MANUAL</p>
            </div>
          </div>
        </div>
        <div className="w-6/12 flex text-left h-18">
          <SummaryDefault
            className="w-6/12 mr-5"
            label="Valor das entradas"
            colorBorder={colors.warning}
            backgroundColor={""}
            montante={100}
            icon={<FaDollarSign style={{ color: colors.warning }} />}
          />
          <SummaryDefault
            className="w-6/12"
            label="Valor das saídas"
            colorBorder={colors.primary}
            backgroundColor={""}
            montante={100}
            icon={<FaDollarSign style={{ color: colors.primary }} />}
          />
        </div>
      </div>
    </div>
  );
};

export default TabMovimentation;
