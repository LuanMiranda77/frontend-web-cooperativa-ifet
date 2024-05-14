import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { ModalDefault } from "../../../../../components";
import { OrderSaleType } from "../../../../../domain/types/OrderSalesType";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  orderSale: OrderSaleType;
  setOrderSale: Function;
}

const ModalCancelamento: React.FC<Props> = ({ ...props }) => {
  const { isOpen, onClose, onSave, orderSale, setOrderSale } = props;
  const initial = { index: "", quant: "" };
  const [itemRemove, setItemRemove] = useState<any>(initial);
  const removeItem = () => {
    const index = itemRemove.index - 1;
    const prod = orderSale.products[index];
    if (prod) {
      const products = [...orderSale.products];
      
      if (prod.quantitySale < itemRemove.quant) {
        return toast.error("A quantidade digitada é maior que a vendida");
      }

      if (itemRemove.quant === 0) {
        products.splice(index, 1);
        setOrderSale({ ...orderSale, products: [...products] });
        return onClose();
      }

      prod.quantitySale -= itemRemove.quant;
      Object.assign(products[index], prod);
      setOrderSale({ ...orderSale, products: [...products] });
      onClose();
    } else {
      toast.error("Item não encontrado");
    }
  };
  const inputIndexRef = useRef<any>();
  const inputQuantRef = useRef<any>();

  useEffect(() => {
    setItemRemove(initial);
  }, [isOpen]);

  return (
    <ModalDefault
      title="Cancelamento"
      isOpen={isOpen}
      onRequestClose={onClose}
      height="300px"
      onClickAction={removeItem}
    >
      <small className="text-red-700 font-bold">Atenção: Para cancelar o item, digitar zero na quantidade!</small>
      <div className="p-1 text-center my-5 font-bold">
        <p className="text-sm">Código Item</p>
        <NumericFormat
          getInputRef={(inputElement: any) => {
            inputIndexRef.current = inputElement;
          }}
          className="w-32 text-4xl border focus:outline-none px-2"
          type={"text"}
          thousandSeparator={false}
          prefix={""}
          fixedDecimalScale={false}
          onChange={(e) => {
            setItemRemove({ ...itemRemove, index: Number(e.target.value) });
          }}
          autoFocus
          value={itemRemove.index}
          onKeyDown={(event) => event.key === "Enter" && inputQuantRef.current?.focus()}
        />
      </div>
      <div className="p-1 text-center font-bold">
        <p className="text-sm">Quantidade</p>
        <NumericFormat
          getInputRef={(inputElement: any) => {
            inputQuantRef.current = inputElement;
          }}
          className="w-32 text-4xl border focus:outline-none px-2"
          // style={{ background: "transparent", border: "none" }}
          type={"text"}
          thousandSeparator={false}
          decimalSeparator={","}
          prefix={""}
          fixedDecimalScale={true}
          decimalScale={3}
          onChange={(e) => {
            setItemRemove({ ...itemRemove, quant: Number(e.target.value.replaceAll(",", ".")) });
          }}
          value={itemRemove.quant}
          onKeyDown={(event) => event.key === "Enter" && removeItem()}
        />
      </div>
    </ModalDefault>
  );
};

export default ModalCancelamento;
