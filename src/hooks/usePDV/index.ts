import { isNumber } from "lodash";
import { useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../config/api";
import { EnumStatusOrder, EnumTypePayment } from "../../domain/enums";
import { OrderItemType, initialOrderItem } from "../../domain/types/OrderItem";
import { OrderSaleType, initialOrderSale } from "../../domain/types/OrderSalesType";
import { ProductType } from "../../domain/types/productType";
import { UtilsConvert } from "../../utils/utils_convert";
import { UtilsUserLocal } from "../../utils/utils_userLocal";

export function usePDV() {
  const navigate = useNavigate();
  const actualUser = UtilsUserLocal.getTokenLogin();
  const [showPoup, setShowPopup] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [sales, setSales] = useState<OrderSaleType[]>([]);
  const [orderSale, setOrderSale] = useState<OrderSaleType>({ ...initialOrderSale });
  const [orderItem, setOrderItem] = useState<OrderItemType>(initialOrderItem);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalVenda, setShowModalVenda] = useState(false);
  // const [pagination, setPagination] = useState<Pagi>();
  const [showPoupFechamento, setShowPoupFechamento] = useState(false);
  const inputProduct = useRef<any>(null);
  const inputQuant = useRef<any>(null);

  async function loadOrder() {
    api
      .get("api/pedido/filter?limit=100")
      .then((resp) => {
        setSales(resp.data);
      })
      .catch((e) => toast.error("Erro:" + e));
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
          return {
            label: `${e.name} → Saldo: ${e.balance} | preço: ${UtilsConvert.NumberToDecimal(e.price, 2)}`,
            product: { ...e, label: e.name, value: e.id },
            value: e.id,
            price: e.price,
            setor: e.setor,
          };
        })
      );
      setLoadingSearch(false);
    });
  };

  async function saveOrder() {
    let order = { ...orderSale } as any;
    order.products.map((item: any) => {
      item.order = null;
      delete item.product.label;
      delete item.product.value;
      return item;
    });
    order.status = EnumStatusOrder.FINALIZADO;
    order.userAplication = { id: actualUser.id };
    api
      .post("api/pedido", order)
      .then((resp) => {
        setOrderSale(initialOrderSale);
        setShowPoupFechamento(false);
        toast.success("Venda Finalizada!");
      })
      .catch((e) => toast.error("Erro:" + e));
  }

  function setFocusInputProduct() {
    if (inputProduct.current) {
      inputProduct.current?.focus();
    }
  }

  async function saleItem() {
    if (orderItem.quantitySale === 0) {
      setOrderItem({ ...initialOrderItem });
      setFocusInputProduct();
      return toast.warning("Quantidade zerada!");
    }
    if (!isNumber(orderItem.product) && orderItem.product.balance <= 0) {
      setOrderItem({ ...initialOrderItem });
      setFocusInputProduct();
      return toast.warning("O Saldo do produto está zerado!");
    }
    if (!isNumber(orderItem.product) && orderItem.product.balance < orderItem.quantitySale) {
      setOrderItem({ ...initialOrderItem });
      setFocusInputProduct();
      return toast.warning("O Produto não tem saldo para vender está quantidade");
    }
    const existItemIndex = orderSale.products.findIndex(
      (item) => !isNumber(item.product) && !isNumber(orderItem.product) && item.product.id === orderItem.product.id
    );
    if (existItemIndex !== -1) {
      setOrderSale((old) => {
        let updatedProducts: any = {};
        updatedProducts = old.products.map((item, index) => {
          if (index === existItemIndex) {
            return {
              ...item,
              quantitySale: item.quantitySale + orderItem.quantitySale,
            };
          }
          return item;
        });
        return { ...old, products: updatedProducts };
      });
    } else {
      setOrderSale({ ...orderSale, products: [...orderSale.products, orderItem] });
    }
    setOrderItem({ ...initialOrderItem });
    setFocusInputProduct();
  }

  const handleF2 = () => {
    if (orderSale.products.length === 0) {
      setFocusInputProduct();
      return toast.warning("Não é possivel finalizar venda sem produtos");
    }
    setOrderSale({ ...orderSale, pagamento: EnumTypePayment.DINHEIRO, status: EnumStatusOrder.FINALIZADO });
    saveOrder();
  };

  // Função para lidar com a tecla F2
  const handleF4 = () => {
    if (orderSale.products.length === 0) {
      setFocusInputProduct();
      return toast.warning("Não é possivel finalizar venda sem produtos");
    }
    setOrderSale({ ...orderSale, pagamento: EnumTypePayment.PIX, status: EnumStatusOrder.FINALIZADO });
    saveOrder();
  };

  // Função para lidar com a tecla F3
  const handleF8 = () => {
    if (orderSale.products.length === 0) {
      setFocusInputProduct();
      return toast.warning("Não é possivel finalizar venda sem produtos");
    }
    setShowPoupFechamento(true);
  };
  const handleF10 = () => {
    loadOrder();
    setShowModalVenda(true);
  };
  const handleESC = () => {
    orderSale.products.length > 0 ? setShowPopup(true) : navigate("/");
  };
  const handleDel = () => {
    setShowModalCancel(true);
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
        document.getElementById("digite-quant")?.focus();
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
    setOrderSale({ ...orderSale, valorTotal: total, valorLiquido: total });
  }

  useMemo(() => totalizeOrderSale(), [orderSale.products]);

  return {
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
    loadingSearch,
    saleItem,
    orderItem,
    setOrderItem,
    inputProduct,
    inputQuant,
    saveOrder,
    setFocusInputProduct,
    loadOrder,
  };
}
