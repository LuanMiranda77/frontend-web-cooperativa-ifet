import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  InputDefault,
  InputNumber,
  InputSelectDefault,
} from "../../../../../components";
import { ProdutoType } from "../../../../../domain";
import cfops from "../../../../../helpers/help_lista_CFOP.json";
interface TabProps {
  product: ProdutoType;
  setProduct?: (product: ProdutoType) => void;
}

const TabImposto: React.FC<TabProps> = ({ product, setProduct }) => {
  const { title, colors } = useContext(ThemeContext);
  return (
    <div className="tab4">
      <div className="grid grid-cols-12 gap-3 mb-5">
        <InputDefault className="col-span-2" type="number" label="NCM" />
        <InputDefault className="col-span-2" type="number" label="CEST" />
      </div>

      <div className="flex mb-10">
        <div className="w-6/12 mr-5">
          <InputSelectDefault label="CFOP" options={cfops.entrada} />
        </div>
        <InputDefault type="number" label="CST/CSOSN" />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="% ICMS"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.info}
          />
        </div>
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="ICMS"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.info}
          />
        </div>
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="% IPI"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.warning}
          />
        </div>
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="IPI"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.warning}
          />
        </div>
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="% COFINS"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.error}
          />
        </div>
        <div className="mr-2 col-span-2">
          <InputNumber
            placeholder="00,00"
            label="COFINS"
            separadorDecimal=","
            casaDecimal={2}
            separadorMilhar="."
            prefixo=""
            fixedZeroFinal
            color={colors.error}
          />
        </div>
      </div>
    </div>
  );
};

export default TabImposto;
