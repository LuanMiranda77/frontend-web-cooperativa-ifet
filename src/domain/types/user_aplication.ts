import { Cargo } from './../enums/index';
import { EstabelecimentoType } from './estabelecimento';
export type UserAplicationType = {
  id: number | undefined | null;
  codigo: number;
  cpf: string;
  nome: string;
  email: string;
  dataCriacao: null | Date;
  dataAtualizacao: null | Date;
  acesso: null | Date;
  status: 'S' | 'N';
  password: string;
  celular: string;
  cargo: Cargo | null;
  roles: string;
  token: string;
  estabelecimento: number | null | undefined | EstabelecimentoType
}