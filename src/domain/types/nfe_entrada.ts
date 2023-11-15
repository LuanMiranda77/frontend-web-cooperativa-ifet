
export type MdeType = {
    id: number | undefined;
    codigo: number;
    estabelecimento: number;
    serie: number;
    numNota:string ;
    chaveAcesso:string ;
    dataEmissao:Date;
    dataManifesto:Date | null ;
    dataEntrada:Date | null ;
    cnpjCpf:string ;
    fornecedor:string ;
    valorTotalNota:number ; //vProd
    valorDesc:number ;
    valorTotalNotaLiquido:number ;
    valorBaseIcms:number ;
    valorIcms:number ;
    valorBaseSubTributa:number ;
    valorSubTributa:number ;
    valorPis:number ;
    valorIpi:number ;
    valorCofins:number ;
    valorFrete:number ;
    valorOutros:number ;
    numProtocolo:string ;
    numNSU: string ;
    status: "M" | "N" | "A"; //M = manifesta  & N = a manifesta & A = nota avulsa
    incluida:"S" | "N";
}

export const mdeInitialState = {
    estabelecimento:0,
    numNota: "",
    serie:1,
    chaveAcesso:"",
    dataEmissao: new Date(),
    dataManifesto: null,
    dataEntrada: null,
    cnpjCpf:'',
    fornecedor:"",
    valorTotalNota:0, //vProd
    valorDesc:0,
    valorTotalNotaLiquido:0,
    valorBaseIcms:0,
    valorIcms:0,
    valorBaseSubTributa:0,
    valorSubTributa: 0,
    valorPis:0,
    valorIpi:0,
    valorCofins:0,
    valorFrete:0,
    valorOutros:0,
    numProtocolo:"",
    numNSU: "",
    status: "N",
    incluida:"N",

} as MdeType