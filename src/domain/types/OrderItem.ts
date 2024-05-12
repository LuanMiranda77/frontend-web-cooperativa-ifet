import { OrderSaleType } from "./OrderSalesType";
import { ProductType } from "./productType";
import { SetorType } from "./setor";

export type OrderItemType = {
  id: number | null;
  order: OrderSaleType | number;
  product: ProductType | number;
  priceSale: number;
  quantitySale: number;
  setor: SetorType | number;
};

export const initialOrderItem: OrderItemType = {
  id: null,
  order: 0,
  product: 0,
  priceSale: 0,
  quantitySale: 0,
  setor: 0,
};
