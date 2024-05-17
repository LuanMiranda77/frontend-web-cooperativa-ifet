import { useContext } from "react";
import {
  FaBarcode,
  FaFileInvoice,
  FaHandHoldingUsd,
  FaLongArrowAltLeft,
  FaMinusCircle,
  FaMoneyCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { ButtonPdv, DataGridDefault, DialogPopupConfirme } from "../../../../components";
import { UtilsConvert } from "../../../../utils/utils_convert";

import { Column } from "devextreme-react/data-grid";
import { MdAttachMoney } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import AsyncSelect from "react-select/async";
import { usePDV } from "../../../../hooks/usePDV";
import { HeaderPDV } from "./components/HeaderPDV";
import ModalCancelamento from "./components/ModalCancelamento";
import ModalVenda from "./components/ModalListVendas";
import ModalPayment from "./components/ModalPaymant";
import { Container, ContainerLeft, ContainerMenu, ContainerProduto, ContainerRight } from "./styles";
/**
 *@Author Luan Miranda
 *@Issue 15
 */

function Pdv() {
  const theme = useContext(ThemeContext);
  const {
    showPoup,
    setShowPopup,
    showModalVenda,
    setShowModalVenda,
    showPoupFechamento,
    setShowPoupFechamento,
    sales,
    setSales,
    orderSale,
    setOrderSale,
    showModalCancel,
    setShowModalCancel,
    actualUser,
    handleF2,
    handleF4,
    handleF8,
    handleF10,
    handleESC,
    handleDel,
    eventCaptureTecla,
    searchItem,
    orderItem,
    setOrderItem,
    loadingSearch,
    saleItem,
    inputProduct,
    inputQuant,
    saveOrder,
    setFocusInputProduct,
    loadOrder,
  } = usePDV();
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderPDV theme={theme} actualUser={actualUser} />
      <div
        className="flex font-bold"
        style={{ color: theme.colors.textLabel, backgroundColor: theme.colors.background }}
      >
        <ContainerLeft>
          <div className="h-22 p-2 flex" style={{ backgroundColor: theme.colors.tertiary }}>
            <div className="w-full">
              <label className="text-xs">DESCRIÇÃO DO ITEM OU CÓDIGO</label>
              <div className="flex">
                <i className="mr-2">
                  <FaBarcode style={{ height: "48px", width: "48px" }} />
                </i>
                <AsyncSelect
                  id="#digite-produto"
                  ref={inputProduct}
                  loadOptions={searchItem}
                  className="w-full text-2xl focus:outline-none"
                  placeholder="Pesquise o produto..."
                  isLoading={loadingSearch}
                  autoFocus
                  isSearchable
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  noOptionsMessage={(obj: { inputValue: string }) =>
                    obj.inputValue.length < 3 ? "Digite 3 caracteres para pesquisar" : "Item não existe"
                  }
                  loadingMessage={() => "Carregando..."}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "none",
                      background: "transparent",
                      borderColor: state.isFocused ? "green" : "red",
                      boxShadow: "none",
                    }),
                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "white",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: theme.colors.tertiary,
                      color: "red",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      // '& div:hover': {
                      //   backgroundColor: 'red',
                      // },
                      color: theme.colors.warning,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                    multiValue: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                  }}
                  onChange={(e: any) =>
                    setOrderItem({
                      ...orderItem,
                      product: e.product,
                      priceSale: e.price,
                      setor: e.setor,
                    })
                  }
                  onKeyDown={eventCaptureTecla}
                  value={orderItem.product}
                />
              </div>
            </div>
            <div className="linha-vertical h-14 m-2"></div>
            <div className="p-1">
              <label htmlFor="" className="text-sm">
                QUANTIDADE
              </label>
              <form autoComplete="off">
                <NumericFormat
                  id="digite-quant"
                  getInputRef={(inputElement: any) => {
                    inputQuant.current = inputElement;
                  }}
                  className="w-32 text-4xl focus:outline-none"
                  style={{ background: "transparent", border: "none" }}
                  type={"text"}
                  thousandSeparator={false}
                  decimalSeparator={","}
                  prefix={""}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  onChange={(e) => {
                    setOrderItem({ ...orderItem, quantitySale: Number(e.target.value.replaceAll(",", ".")) });
                  }}
                  value={orderItem.quantitySale == 0 ? "" : orderItem.quantitySale}
                  onKeyDown={(event) => event.key == "Enter" && saleItem()}
                />
              </form>
            </div>
          </div>
          <ContainerProduto>
            <DataGridDefault
              dataSource={orderSale.products}
              allowSorting={false}
              showColumnLines
              rowAlternationEnabled
              paginar={false}
            >
              <Column
                dataField="item"
                caption="ITEM"
                alignment="center"
                dataType=""
                width={70}
                cssClass="font-bold column-1"
                cellRender={(e) => <span>{e.rowIndex + 1}</span>}
              />
              <Column dataField="product.name" caption="DESCRIÇÃO" cssClass="font-bold" />
              <Column dataField="product.measure" caption="MED" cssClass="font-bold" width={50} alignment="center" />
              <Column
                dataField="quantitySale"
                caption="QUANTIDADE"
                alignment="center"
                dataType="number"
                format={{ type: "fixedPoint", precision: 3 }}
                width={110}
              />
              <Column
                dataField="priceSale"
                caption="VALOR"
                alignment="center"
                dataType="number"
                format={{ type: "fixedPoint", precision: 2 }}
                width={110}
              />
              <Column
                dataField=""
                caption="TOTAL"
                alignment="right"
                dataType="number"
                cssClass="font-bold"
                format={{ type: "fixedPoint", precision: 2 }}
                width={120}
                cellRender={(e) => {
                  return (
                    <span>
                      {UtilsConvert.formatCurrency(e.data.quantitySale * e.data.priceSale).replaceAll("R$", "")}
                    </span>
                  );
                }}
              />
            </DataGridDefault>
          </ContainerProduto>
          <footer
            className="flex h-22 p-2"
            style={{ backgroundColor: "#B4B8C5", borderTop: "2px solid " + theme.colors.primary }}
          >
            <div className="w-32 text-left mr-10">
              <p className="text-xs text-black">ITEMS</p>
              <p className="text-3xl" style={{ color: theme.colors.info }}>
                {orderSale.products.length < 9 ? "0" + orderSale.products.length : orderSale.products.length}
              </p>
            </div>
            <div className="w-full text-right">
              <p className="text-xs text-black">TOTAL A PAGAR</p>
              <p className="text-6xl" style={{ color: theme.colors.error }}>
                {UtilsConvert.formatCurrency(orderSale.valorTotal)}
              </p>
            </div>
          </footer>
        </ContainerLeft>

        {/* =======================================divisor=============== */}

        <ContainerRight>
          <header className="h-12" style={{ backgroundColor: theme.colors.info }}>
            <div className="w-full flex items-center justify-between">
              <span>SALDO À PAGAR</span>
              <span className="text-2xl">{UtilsConvert.formatCurrency(orderSale.valorTotal)}</span>
            </div>
          </header>
          <div className="shadow-lg">
            <ContainerMenu className="">
              <div className="w-full text-center mb-2">
                <label className="text-xs">ESCOLHA A FORMA DE PAGAMENTO</label>
              </div>
              <div className="max-h-max lg:grid lg:grid-cols-3 lg:gap-3 font-bold mb-3">
                <ButtonPdv
                  labelSuperior="F2"
                  icon={<FaHandHoldingUsd className="text-2xl" />}
                  labelInferior="DINHEIRO"
                  onClick={handleF2}
                />
                <ButtonPdv
                  labelSuperior="F4"
                  icon={<MdAttachMoney className="text-xl" />}
                  labelInferior="PIX"
                  onClick={handleF4}
                />
                <ButtonPdv
                  labelSuperior="F8"
                  icon={<FaMoneyCheck className="text-xl" />}
                  labelInferior="Finalizar"
                  onClick={handleF8}
                />
                <ButtonPdv
                  labelSuperior="F10"
                  icon={<FaFileInvoice className="text-xl" />}
                  labelInferior="VENDAS"
                  onClick={handleF10}
                />
                <ButtonPdv
                  labelSuperior="DEL"
                  icon={<FaMinusCircle className="text-xl" />}
                  labelInferior="CANCELAR PRODUTOS"
                  onClick={handleDel}
                />
                <ButtonPdv
                  labelSuperior="ESC"
                  icon={<FaLongArrowAltLeft className="text-xl" />}
                  labelInferior="SAIR"
                  onClick={handleESC}
                />
              </div>
            </ContainerMenu>
          </div>
          <footer className="flex h-16">
            <div className="w-3/5 p-2" style={{ backgroundColor: theme.colors.info }}>
              {/* {tipoPagamento !== -1 && tipoPagamento !== 3 ? (
                <>
                  <p className="text-xs lg:text-lg">
                    {tipoPagamento === 0 ? "DINHEIRO" : tipoPagamento === 2 ? "VALE" : "CARTÃO"}
                  </p>
                  <p className="text-xs lg:text-2xl" style={{ marginTop: "-.5rem" }}>
                    {UtilsConvert.formatCurrency(ultimoPagamento)}
                  </p>
                </>
              ) : (
                <></>
              )} */}
            </div>
            <button className="w-2/5 font-bold button-pagamento" style={{ backgroundColor: theme.colors.success }}>
              <p className="text-xs lg:text-lg">CONFIRMAR</p>
              <p className="text-xs lg:text-xs" style={{ marginTop: "-.5rem" }}>
                PAGAMENTO
              </p>
            </button>
          </footer>
        </ContainerRight>
      </div>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoup}
        onRequestClose={() => setShowPopup(false)}
        onClickSim={() => {
          setShowPopup(false);
          navigate("/");
          document.getElementById("#digite-produto")?.focus();
        }}
      >
        <p className="font-bold text-2xl">Tem certeza que deseja sair da venda? </p>
        <p className="font-bold" style={{ color: theme.colors.error }}>
          Esta venda será perdida ao sair da tela!
        </p>
      </DialogPopupConfirme>

      <ModalVenda
        showModal={showModalVenda}
        closeModal={() => {
          setFocusInputProduct();
          setShowModalVenda(false);
        }}
        loadData={loadOrder}
        sales={sales}
      />
      <ModalCancelamento
        isOpen={showModalCancel}
        onClose={() => setShowModalCancel(false)}
        orderSale={orderSale}
        setOrderSale={setOrderSale}
        onSave={saveOrder}
      />

      {/* modal de pagamento */}
      <ModalPayment
        isOpen={showPoupFechamento}
        onClose={() => setShowPoupFechamento(false)}
        orderSale={orderSale}
        setOrderSale={setOrderSale}
        onSave={saveOrder}
      />
    </Container>
  );
}
export default Pdv;
