import { useSelector } from "react-redux";
import { FeedstockType } from "./feedstock";
import { ProdutoType } from "./produto";
import { SetorType } from "./setor";
import { UserAplicationType } from "./user_aplication";
import { selectStateUser } from "../../store/slices/usuario.slice";

export type ProcessType = {
  id: number | null;
  codeBar: string;
  status:
    | "Rascunho"
    | "Capitação"
    | "Pendencia Descrepancia"
    | "Conferencia"
    | "Finalizado";
  dateOpen: Date;
  dateClose: Date | null;
  responsibleUser: number;
  feedstock: number;
  setor: number;
  deleted: number;
};

export const initialProcess: ProcessType = {
    id:null,
    codeBar:'',
    status:'Rascunho',
    dateOpen: new Date(),
    dateClose: null,
    responsibleUser: 0,
    feedstock:0,
    setor:0,
    deleted:0,
};
