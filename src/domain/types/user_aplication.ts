import { Cargo } from './../enums/index';
import { EstabelecimentoType } from './estabelecimento';
import { SetorType } from './setor';
export type UserAplicationType = {
  id: number | undefined | null;
  name: string;
  lastName: string;
  userName:string;
  email: string;
  acesso: null | Date;
  status: 'S' | 'N';
  password: string;
  cargo: Cargo | null;
  token: string;
  dateCreate: null | Date;
  dateUpdate: null | Date;
  setor: number | null | undefined | SetorType;
}