import { FeedstockType } from "./feedstock";
import { ProductType } from "./productType";

export type ProcessType = {
  id: number | null;
  codeBar: string;
  status: string;
  dateOpen: Date;
  dateClose: Date | null;
  responsibleUser: number;
  feedstock: FeedstockType;
  products: Array<ProductType>;
  setor: number;
  deleted: number;
};

export const initialProcess: ProcessType = {
  id: null,
  codeBar: "",
  status: "Rascunho",
  dateOpen: new Date(),
  dateClose: null,
  responsibleUser: 0,
  feedstock: { name: "", measure: "", codeBar: "", balance: 0 } as FeedstockType,
  products: new Array<ProductType>(),
  setor: 0,
  deleted: 0,
};
