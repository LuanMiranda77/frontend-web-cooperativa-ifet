import { Column } from "devextreme-react/data-grid";
import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  ButtonIcon,
  DataGridDefault,
  InputDate,
  InputNumber,
} from "../../../../../components";
import { ProdutoType } from "../../../../../domain";
interface TabProps {
  dataSource: [];
  product: ProdutoType;
  setProduct: (product: ProdutoType) => void;
}

const TabPromotion: React.FC<TabProps> = ({
  dataSource,
  product,
  setProduct,
}) => {
  return (
    <div className="tab2">
      <div className="mb-5 w-3/12">
        <InputNumber
          className="font-bold"
          label="% Desconto"
          prefixo=""
          casaDecimal={2}
          separadorDecimal=","
          fixedZeroFinal
          placeholder="00,00"
        />
      </div>
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
      <div className="" style={{ height: "calc(100vh - 415px)" }}>
        <DataGridDefault
          dataSource={dataSource}
          allowSorting
          paginar={false}
          // showRowLines
          rowAlternationEnabled
          showBorders
          showColumnLines
          hoverStateEnabled
          isSelectRow
          moduloSeletion="single"
        >
          <Column
            dataField="dataInicial"
            caption="Final"
            alignment="center"
            dataType="string"
            cssClass="font-bold column-1"
          />
          <Column
            dataField="dataFinal"
            caption="Inicio"
            alignment="center"
            dataType="string"
            cssClass="font-bold"
          />
          <Column
            dataField="desconto"
            caption="% Desconto"
            alignment="center"
            dataType="string"
            cssClass="font-bold"
          />
          <Column
            dataField="quant"
            caption="Qtde. vendida"
            alignment="center"
            dataType="string"
            cssClass="font-bold"
          />
        </DataGridDefault>
      </div>
    </div>
  );
};

export default TabPromotion;
