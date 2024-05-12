import React from "react";
import { InputDefault, InputNumber, InputSelectDefault, ModalDefault } from "../../../../components";
import { unidadeMedidas } from "../../../../constants/constMedidas";
import { ProductType } from "../../../../domain/types/productType";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
  setProduct: Function;
  onSave:() => void;
}

const ModalProduct: React.FC<Props> = ({ ...props }) => {
  const { product, setProduct } = props;
  return (
    <ModalDefault
      isOpen={props.isOpen}
      title="Ficha do produto"
      onRequestClose={props.onClose}
      height="calc(100vh - 0px)"
      width="500px"
      onClickAction={props.onSave}
    >
      <InputDefault
        className="w-4/12 mb-5"
        label="Código de Barras"
        type="text"
        value={product.ean}
        onChange={(e) => setProduct({ ...product, ean: e.target.value })}
      />
      <InputDefault
        className="mb-5"
        label="Descrição"
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <InputSelectDefault
        name="unid"
        label="Unidade"
        options={unidadeMedidas}
        placeholder="Selecione..."
        isClearable
        isSearchable
        className="w-6/12 mb-5"
        value={unidadeMedidas.find((e) => e.value == props.product.measure)}
        onChange={(e) => setProduct({ ...product, measure: e.value })}
      />
      <div className="flex">
        <InputNumber
          className="font-bold"
          label="Preço"
          prefixo=""
          casaDecimal={2}
          separadorMilhar="."
          separadorDecimal=","
          fixedZeroFinal
          placeholder="0,000"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value.replaceAll(",", ".")) })}
        />
        <InputNumber
          className="font-bold"
          label="Saldo"
          prefixo=""
          casaDecimal={3}
          separadorMilhar="."
          separadorDecimal=","
          fixedZeroFinal
          placeholder="00,000"
          value={product.balance}
          onChange={(e) => setProduct({ ...product, balance: Number(e.target.value.replaceAll(",", ".")) })}
        />
      </div>
    </ModalDefault>
  );
};

export default ModalProduct;
