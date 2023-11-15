import React, { useMemo, useState } from "react";
import {
  InputCheck,
  InputDate,
  InputNumber,
  InputSelectDefault,
} from "../../../../../components";
import { ProdutoType } from "../../../../../domain";
import { unidades } from "../../../../../helpers/help_medidas";
import _ from "lodash";

interface TabProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
  product: ProdutoType;
  setProduct: (product: ProdutoType) => void;
  register?: any;
  errors?: any;
  setValue?: any;
  getValues?: any;
  control?:any;
}
const TabEstoque: React.FC<TabProps> = ({
  checked,
  setChecked,
  product,
  setProduct,
  register,
  errors,
  setValue,
  getValues,
  control,
}) => {
  const [markup, setMarkup] = useState<number>(0);
  useMemo(()=>{
    const result  = (getValues('precoVenda') -  getValues('precoCusto')/getValues('precoCusto'))*100;
    setMarkup(result);
  },[getValues('precoVenda'), getValues('precoCusto')])
  return (
    <div className="tab1">
      <div className="w-full flex items-center mb-5">
        <div className="w-3/12 text-left mr-5">
          <InputDate
            label="Data Vencimento"
            register={register("dtVencimento")}
          />
        </div>
        <div>
        <p>Makeup</p>
        <p>{markup.toFixed(2) + " %"}</p>
        </div>
        {/* <div className="mt-5 mr-5">
          <InputCheck
            label="Preço Atacado?"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div> */}
      </div>

      <InputSelectDefault
          name="unid"
          label="Unidade"
          options={unidades}
          placeholder="Selecione..."
          isClearable
          isSearchable
          className="w-3/12 mb-5"
          control={control}
          errorMessage={errors?.unid.message}
        />

      <div className="mb-5 text-left flex">
        <InputNumber
          className="font-bold"
          label="Saldo"
          prefixo=""
          casaDecimal={3}
          separadorMilhar="."
          separadorDecimal=","
          fixedZeroFinal
          placeholder="00,000"
          value={getValues("saldo")}
          onChange={(e) => setValue("saldo", e.target.value)}
        />

        <InputNumber
          className="font-bold"
          label="Fator de conversão"
          prefixo=""
          casaDecimal={3}
          separadorMilhar="."
          separadorDecimal=","
          fixedZeroFinal
          placeholder="00,000"
          value={getValues("fatorConversao")}
          onChange={(e) => setValue("fatorConversao", e.target.value)}
        />
      </div>

      <div className="mb-5 text-left flex">
        <div className="mr-10">
          <InputNumber
            className="font-bold"
            label="Saldo minimo"
            prefixo=""
            casaDecimal={2}
            separadorMilhar="."
            separadorDecimal=","
            fixedZeroFinal
            placeholder="00,00"
            value={getValues("saldoMinimo")}
            onChange={(e) => setValue("saldoMinimo", e.target.value)}
          />
        </div>
        {checked && (
          <InputNumber
            className="font-bold"
            label="Quant. p/atacado"
            prefixo=""
            casaDecimal={2}
            separadorMilhar="."
            separadorDecimal=","
            fixedZeroFinal
            placeholder="00,00"
            value={getValues("quantMinAtacado")}
            onChange={(e) => setValue("quantMinAtacado", e.target.value)}
          />
        )}
      </div>

      <div className="mb-5 text-left flex">
        <div className="mr-10">
          <InputNumber
            className="font-bold"
            label="Preço custo"
            prefixo=""
            casaDecimal={2}
            separadorMilhar="."
            separadorDecimal=","
            fixedZeroFinal
            placeholder="00,00"
            value={getValues("precoCusto")}
            onChange={(e) => setValue("precoCusto", e.target.value)}
            errorMessage={errors?.precoCusto?.message}
            required
          />
        </div>
        <div className="mr-10">
          <InputNumber
            className="font-bold"
            label="Preço venda"
            prefixo=""
            casaDecimal={2}
            separadorMilhar="."
            separadorDecimal=","
            fixedZeroFinal
            placeholder="00,00"
            value={getValues("precoVenda")}
            onChange={(e) => setValue("precoVenda", e.target.value)}
            errorMessage={errors?.precoVenda?.message}
            required
          />
        </div>
        {checked && (
          <InputNumber
            className="font-bold"
            label="Preço atacado"
            prefixo=""
            casaDecimal={2}
            separadorMilhar="."
            separadorDecimal=","
            fixedZeroFinal
            placeholder="00,00"
            value={getValues("precoAtacado")}
            onChange={(e) => setValue("precoAtacado", e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default TabEstoque;
