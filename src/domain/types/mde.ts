import { ProdutoType } from './produto';

export type MdeType = {
    id: number;
    numDoc: string;
    chaveAcesso: string | null | undefined;
    tipo: "A" | "E";
    dtEmisao: Date | null | undefined;
    dtEntrada: Date | null | undefined;
    cnpj: string | null | undefined;
    cpf:string | null | undefined;
    fornecedor: string;
    frete:number;
    desconto:number;
    totalProd:number;
    totalNota:number;
    produtos: Array<ProdutoType>;

     // impostos
     cstICMSSub:string | null| undefined;
     pICMSSub:string | null| undefined;
     vICMSSub:string | null| undefined;
 
     cstICMS:string | null| undefined;
     pICMS:string | null| undefined;
     vICMS:string | null| undefined;

     cstIPI:string | null| undefined;
     pIPI:string | null| undefined;
     vIPI:string | null| undefined;
 
     cstPIS:string | null| undefined;
     pPIS:string | null| undefined;
     vPIS:string | null| undefined;
 
     cstCOFINS:string | null| undefined;
     pCOFINS:string | null| undefined;
     vCOFINS:string | null| undefined;


    
}