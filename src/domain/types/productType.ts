import { SetorType, initialSetor } from "./setor";

export type ProductType = {
  id?: number | null;
  ean: string;
  name: string;
  balance: number;
  measure: string;
  price: number;
  deleted: number;
  status: "S" | "N";
  setor:SetorType;
  discrepancy?:string;
};

export const initialProduct: ProductType = {
  id: null,
  ean: "",
  name: "",
  balance: 0,
  measure: "",
  price: 0,
  deleted: 0,
  status: "S",
  setor:initialSetor
};
