import { useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { OrderItemType, initialOrderItem } from "../../domain/types/OrderItem";
import { OrderSaleType, initialOrderSales } from "../../domain/types/OrderSalesType";
import { ProductType } from "../../domain/types/productType";
import { UtilsUserLocal } from "../../utils/utils_userLocal";

export function usePDV() {
  const navigate = useNavigate();
  const [showPoup, setShowPopup] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [sales, setSales] = useState<Array<OrderSaleType>>();
  //   const [orderItems, setOrderItems] = useState<Array<OrderItemType>>([]);
  const [orderSale, setOrderSale] = useState<OrderSaleType>(initialOrderSales);
  const [orderItem, setOrderItem] = useState<OrderItemType>(initialOrderItem);
  const [showModalProd, setShowModalProd] = useState(false);
  const [showModalVenda, setShowModalVenda] = useState(false);
  const [showPoupFechamento, setShowPoupFechamento] = useState(false);
  const [totalVenda, setTotalVenda] = useState(0);
  const actualUser = UtilsUserLocal.getTokenLogin();

  async function loadOrder() {
    return [];
  }

  const searchItem = (inputValue: string, callback: (options: ProductType[]) => void) => {
    if (inputValue.length < 3) {
      callback([]);
    }
    setLoadingSearch(true);
    api.get(`api/pedido/search-product?name=${inputValue}`).then((res) => {
      callback(
        res.data.map((e: any) => {
          return { label: `${e.name} - preço: ${e.price}`, product: e, value: e.id, price: e.price, setor: e.setor };
        })
      );
      setLoadingSearch(false);
    });
  };

  async function saveOrder() {}

  async function saleItem() {
    console.log("Item vendido", orderItem);

    setOrderSale({ ...orderSale, products: [...orderSale.products, orderItem] });
    setOrderItem({ ...initialOrderItem });
    document.getElementById("#digite-produto")?.focus();
    let d = document.getElementById("digite-quant") as HTMLInputElement | null;
    if (d) {
      d.value = "";
    }
  }

  const handleF2 = () => {
    console.log("F1 pressionada");
  };

  // Função para lidar com a tecla F2
  const handleF4 = () => {
    console.log("F2 pressionada");
  };

  // Função para lidar com a tecla F3
  const handleF8 = () => {
    console.log("F3 pressionada");
  };
  const handleF10 = () => {
    setShowModalVenda(true);
  };
  const handleESC = () => {
    // setShowPopup(false);
    // navigate("/");
    // document.getElementById("#digite-produto")?.focus();
    orderSale.products.length > 0 ? setShowPopup(true) : navigate("/");
  };
  const handleDel = () => {
    console.log("F3 pressionada");
  };

  const eventCaptureTecla = (event: any) => {
    let key = event.key;
    switch (key) {
      case "F2":
        handleF2();
        break;
      case "F4":
        handleF4();
        break;
      case "F8":
        handleF8();
        break;
      case "F10":
        handleF10();
        break;
      case "Delete":
        handleDel();
        break;
      case "Escape":
        handleESC();
        break;
      case "Enter":
        document.getElementById("#digite-quant")?.focus();
        break;
    }
  };

  // Configuração dos eventos de tecla usando useHotkeys
  useHotkeys("F2", handleF2);
  useHotkeys("F4", handleF4);
  useHotkeys("F8", handleF8);
  useHotkeys("F10", handleF10);
  useHotkeys("ESC", handleESC);
  useHotkeys("DEL", handleDel);

  function totalizeOrderSale() {
    const total = orderSale.products.reduce((total, produto) => {
      let subtotalProduto = 0;
      if (produto.quantitySale) {
        subtotalProduto = produto.quantitySale * produto.priceSale;
      }
      return total + subtotalProduto;
    }, 0);
    setOrderSale({ ...orderSale, valorTotal: total });
  }

  useMemo(() => totalizeOrderSale(), [orderSale.products]);

  return {
    showPoup,
    setShowPopup,
    showModalVenda,
    setShowModalVenda,
    showPoupFechamento,
    setShowPoupFechamento,
    totalVenda,
    setTotalVenda,
    sales,
    setSales,
    orderSale,
    setOrderSale,
    showModalProd,
    setShowModalProd,
    actualUser,
    handleF2,
    handleF4,
    handleF8,
    handleF10,
    handleESC,
    handleDel,
    eventCaptureTecla,
    searchItem,
    loadingSearch,
    saleItem,
    orderItem,
    setOrderItem,
  };
}
