import { EnumTypePayment } from "../enums";
import { EnumStatusOrder } from "./../enums/index";
import { OrderItemType } from "./OrderItem";
import { UserAplicationType } from "./user_aplication";
export type OrderSaleType = {
  id: number | null;
  pagamento: EnumTypePayment;
  valorTotal: number;
  valorDesconto: number;
  status: EnumStatusOrder;
  userAplication: UserAplicationType | number;
  products: Array<OrderItemType>;
  dateCreate?: Date;
  dateClose?: Date;
};

export const initialOrderSales: OrderSaleType = {
  id: null,
  pagamento: EnumTypePayment.DINHEIRO,
  valorTotal: 0,
  valorDesconto: 0,
  status: EnumStatusOrder.PENDENTE,
  products: [],
  userAplication: 0,
};
