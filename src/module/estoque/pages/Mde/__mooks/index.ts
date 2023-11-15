
export const status =[
    {value:'',label:'Exibir todos'},
    {value:'M',label:'Notas manifesta'},
    {value:'N',label:'Notas a manifestar'},
    {value:'A',label:'Notas avulsa'},
    {value:'E',label:'Notas com entrada'},
];

export const tiposFiltroData =[
    {value:'1',label:'Emissão'},
    {value:'2',label:'Manifesto'},
    {value:'3',label:'Entrada'},
];

export type ErrorImport = {
    id: number;
    error: string,
    cnpjCpf: string,
    nome:string,
    chave:string,
    valor:string,
    dateEmisao:string,
}