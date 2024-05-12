import { EnumStatusProcess } from "../enums";
import { FeedstockType, initialFeedstock } from "./feedstock";
import { ProductType } from "./productType";

export type ProcessType = {
  id: number | null;
  codeBar: string;
  status: string;
  responsibleUser: number;
  feedstock: FeedstockType;
  products: Array<ProductType>;
  setor: number;
  deleted: number;
};

export const initialProcess: ProcessType = {
  id: null,
  codeBar: "",
  status: EnumStatusProcess.RASCUNHO,
  responsibleUser: 0,
  feedstock: initialFeedstock,
  products: new Array<ProductType>(),
  setor: 0,
  deleted: 0,
};
