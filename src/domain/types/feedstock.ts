import { ProductType } from "./productType";

export type FeedstockType = {
  id: number | null;
  codeBar: string;
  name: string;
  balance: number;
  measure: string;
  dateCreate: Date;
  dateUpdate: null;
  deleted: number;
  products: Array<ProductType>;
};

export const initialFeedstock: FeedstockType = {
  id: null,
  codeBar: "",
  name: "",
  balance: 0.0,
  measure: "",
  dateCreate: new Date(),
  dateUpdate: null,
  deleted: 0,
  products: new Array<ProductType>(),
};
