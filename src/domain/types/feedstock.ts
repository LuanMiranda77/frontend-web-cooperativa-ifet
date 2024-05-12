import { SetorType, initialSetor } from "./setor";

export type FeedstockType = {
  id: number;
  codeBar: string;
  name: string;
  balance: number;
  measure: string;
  dateCreate: Date;
  dateUpdate: null;
  deleted: number;
  setor: SetorType;
};

export const initialFeedstock: FeedstockType = {
  id: 0,
  codeBar: "",
  name: "",
  balance: 0.0,
  measure: "",
  dateCreate: new Date(),
  dateUpdate: null,
  deleted: 0,
  setor: initialSetor,
};
