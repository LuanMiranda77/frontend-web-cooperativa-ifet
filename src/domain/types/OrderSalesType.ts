import { EnumTypePayment } from "../enums";
import { EnumStatusOrder } from "./../enums/index";
import { OrderItemType } from "./OrderItem";
import { UserAplicationType } from "./user_aplication";
export type OrderSaleType = {
  id: number | null;
  pagamento: EnumTypePayment;
  valorLiquido: number;
  valorTotal: number;
  valorDesconto: number;
  status: EnumStatusOrder;
  userAplication: UserAplicationType | number;
  products: Array<OrderItemType>;
  dateCreate?: Date;
  dateClose?: Date;
};

export const initialOrderSale: OrderSaleType = {
  id: null,
  pagamento: EnumTypePayment.DINHEIRO,
  valorLiquido: 0,
  valorTotal: 0,
  valorDesconto: 0,
  status: EnumStatusOrder.PENDENTE,
  products: [],
  userAplication: 0,
};
