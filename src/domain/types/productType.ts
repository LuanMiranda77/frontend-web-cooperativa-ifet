export type ProductType = {
  id?: number | null;
  codeBar: string;
  name: string;
  balance: number;
  measure: string;
  price: number;
  dateCreate: Date;
  deleted: number;
  status: "S" | "N";
};

export const initialProduct: ProductType = {
  id: null,
  codeBar: "",
  name: "",
  balance: 0,
  measure: "",
  price: 0,
  dateCreate: new Date(),
  deleted: 0,
  status: "S",
};
