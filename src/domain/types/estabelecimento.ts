import { RegimeTributario } from "../enums";
import { ConfigModuloType } from "./configModulo";

export type EstabelecimentoType = {
  id: number | undefined;
  cnpjCpf: string;
  instEstadual: string | null;
  instMunicipal: string | null;
  razao: string;
  name: string | undefined;
  cep: string | undefined;
  logradouro: string | undefined;
  numero: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  uf: string | undefined;
  logo: string | undefined;
  codIbge: string | undefined;
  regime:
    | RegimeTributario.MEI
    | RegimeTributario.SIMPLES
    | RegimeTributario.PRESUMIDO
    | RegimeTributario.REAL;
  email: string;
  email2: string | undefined;
  foneFixo: string | undefined;
  celular1: string;
  celular2: string | undefined;
  matrizId: string | null | undefined;
  status: string;
  config: ConfigModuloType;
};
