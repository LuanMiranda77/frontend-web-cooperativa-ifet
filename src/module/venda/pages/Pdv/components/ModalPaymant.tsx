import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { ModalDefault } from "../../../../../components";
import { EnumTypePayment } from "../../../../../domain/enums";
import { OrderSaleType } from "../../../../../domain/types/OrderSalesType";
import { UtilsConvert } from "../../../../../utils/utils_convert";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderSale: OrderSaleType;
  setOrderSale: Function;
  onSave: () => void;
}
const ModalPayment: React.FC<Props> = ({ ...props }) => {
  const inputDesconto = useRef<any>(null);
  const inputTroco = useRef<any>(null);
  const inputRecebido = useRef<any>(null);
  const [valorRecebido, setValorRecebido] = useState<number>(0);
  const [troco, setTroco] = useState<number>(0);
  const [optionPayment, setOpitonPayment] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const { onSave, orderSale, setOrderSale } = props;

  const eventCaptureTecla = (event: any) => {
    let key = event.key;
    switch (key) {
      case "F2":
        setOpitonPayment(1);
        setOrderSale({ ...orderSale, pagamento: EnumTypePayment.DINHEIRO });
        break;
      case "F4":
        setOpitonPayment(2);
        setOrderSale({ ...orderSale, pagamento: EnumTypePayment.PIX });
        break;
      case "F8":
        setOpitonPayment(3);
        setOrderSale({ ...orderSale, pagamento: EnumTypePayment.CARTAO_DEBITO });
        break;
      case "F9":
        setOpitonPayment(4);
        setOrderSale({ ...orderSale, pagamento: EnumTypePayment.CARTAO_CREDITO });
        break;
    }
  };

  const closing = (event: any) => {
    if (event.key === "Enter") {
      if ((optionPayment === 2 || optionPayment === 3 || optionPayment === 4) && confirmed === false) {
        setConfirmed(true);
      } else if ((optionPayment === 2 || optionPayment === 3 || optionPayment === 4) && confirmed === true) {
        props.onSave();
      } else {
        inputRecebido.current?.focus();
      }
    } else {
      eventCaptureTecla(event);
    }
  };

  useEffect(() => {
    setValorRecebido(orderSale.valorTotal);
    setTroco(0);
    setConfirmed(false);
    setOpitonPayment(1);
  }, [props.isOpen]);

  return (
    <ModalDefault
      title="Finalizar pagamento"
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      onClickAction={onSave}
      left="25%"
      height="570px"
      width="500px"
      textBtnAction={confirmed ? "Finalizar venda?" : "Salvar venda"}
    >
      <div className="text-center">
        <div className="flex justify-center">
          <button
            className={`px-5 py-2 mr-3 w-28 border rounded-md 
            ${optionPayment === 1 && "bg-blue-400 font-bold text-white"}
            focus:bg-blue-400 focus:font-bold focus:text-white
            hover:bg-gray-400 hover:font-bold hover:text-white
            `}
            onClick={() => setOpitonPayment(1)}
          >
            <p className="p-0 m-0 text-sm">F2</p>
            Dinheiro
          </button>
          <button
            className={`px-5 py-2 mr-3 w-28 border rounded-md 
            ${optionPayment === 2 && "bg-blue-400 font-bold text-white"}
            focus:bg-blue-400 focus:font-bold focus:text-white
            hover:bg-gray-400 hover:font-bold hover:text-white
            `}
            onClick={() => setOpitonPayment(2)}
          >
            <p className="p-0 m-0 text-sm">F4</p>
            PIX
          </button>
          <button
            className={`px-5 py-2 mr-3 w-28 border rounded-md 
            ${optionPayment === 3 && "bg-blue-400 font-bold text-white"}
            focus:bg-blue-400 focus:font-bold focus:text-white
            hover:bg-gray-400 hover:font-bold hover:text-white
            `}
            onClick={() => setOpitonPayment(3)}
          >
            <p className="p-0 m-0 text-sm">F8</p>
            Cartão Débito
          </button>
          <button
            className={`px-5 py-2 mr-3 w-28 border rounded-md 
            ${optionPayment === 4 && "bg-blue-400 font-bold text-white"}
            focus:bg-blue-400 focus:font-bold focus:text-white
            hover:bg-gray-400 hover:font-bold hover:text-white
            `}
            onClick={() => setOpitonPayment(4)}
          >
            <p className="p-0 m-0 text-sm">F9</p>
            Cartão Crédito
          </button>
        </div>
        <div className="mt-5">
          <span className="text-2xl font-bold">
            Valor Total: <span>{UtilsConvert.formatCurrency(orderSale.valorTotal)}</span>
          </span>
          <div className="text-4xl text-red-700">
            <p className="font-bold">Valor a Pagar</p>
            <span className="font-bold">
              {UtilsConvert.formatCurrency(orderSale.valorLiquido == 0 ? orderSale.valorTotal : orderSale.valorLiquido)}
            </span>
          </div>
          <div className="p-1 text-center my-5 font-bold">
            <p className="text-xl">Desconto</p>
            <NumericFormat
              getInputRef={(inputElement: any) => {
                inputDesconto.current = inputElement;
              }}
              className="w-56 text-4xl border focus:outline-none px-2 text-center"
              type={"text"}
              thousandSeparator={false}
              prefix={""}
              fixedDecimalScale={true}
              decimalSeparator=","
              decimalScale={2}
              allowLeadingZeros
              onChange={(e) => {
                const desconto = Number(e.target.value.replaceAll(",", "."));
                let descPorcetagem = (desconto / orderSale.valorTotal) * 100;
                if (descPorcetagem >= 50) {
                  return toast.warning("Desconto não permitido porque ultrapassa os 50%");
                }
                setOrderSale({ ...orderSale, valorDesconto: desconto, valorLiquido: orderSale.valorTotal - desconto });
              }}
              autoFocus
              value={orderSale.valorDesconto}
              onKeyDown={(event) => closing(event)}
            />
          </div>
          {optionPayment === 1 && (
            <div>
              <div className="p-1 text-center my-5 font-bold">
                <p className="text-xl">Valor Recebido</p>
                <NumericFormat
                  getInputRef={(inputElement: any) => {
                    inputRecebido.current = inputElement;
                  }}
                  className="w-56 text-4xl border focus:outline-none px-2 text-center"
                  type={"text"}
                  thousandSeparator={false}
                  prefix={""}
                  fixedDecimalScale={true}
                  decimalSeparator=","
                  decimalScale={2}
                  allowLeadingZeros
                  onChange={(e) => {
                    const totalRecebido = Number(e.target.value.replaceAll(",", "."));
                    if (totalRecebido < orderSale.valorTotal) {
                      return;
                    }
                    if (totalRecebido === 0) {
                      setTroco(0);
                    }
                    setTroco(totalRecebido - (orderSale.valorTotal - orderSale.valorDesconto));
                    setValorRecebido(totalRecebido);
                  }}
                  value={valorRecebido}
                  onKeyDown={(event) =>
                    event.key === "Enter" ? (setConfirmed(true), inputTroco.current?.focus()) : eventCaptureTecla(event)
                  }
                />
                <div className="p-1 text-center mt-5 font-bold">
                  <p className="text-xl">Troco</p>
                  <NumericFormat
                    getInputRef={(inputElement: any) => {
                      inputTroco.current = inputElement;
                    }}
                    className="w-56 text-4xl border focus:outline-none px-2 text-center"
                    type={"text"}
                    thousandSeparator={false}
                    prefix={""}
                    fixedDecimalScale={true}
                    decimalSeparator=","
                    decimalScale={2}
                    allowLeadingZeros
                    // onChange={(e) => {
                    //   setTroco(Number(e.target.value.replaceAll(",", ".")));
                    // }}
                    readOnly
                    value={troco}
                    onKeyDown={(event) => event.key === "Enter" && onSave()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalDefault>
  );
};

export default ModalPayment;
