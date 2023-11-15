export type ProdutoXml = {
    codigo: number | string;
	nome: string;
	ean: string;
	ncm: string;
	cest: string;
	cfop: string;
	uniCom: string;
	quantCom: number;
    valorUnit: number;
	valorTotal: number;
	eanTrib: string;
	uniTrib: string;
	quantTrib: number;
	desc: number;
	outro: number;
	
//	impostos
	vTotTrib: number;
	
	cstIcms: string;
	porcIcms: number;
	valorIcms: number;
	porcIcmsSt: number;
	valorIcmsSt: number;
	
	cstIpi: string;
	porcIpi: number;
	valorIpi: number;
	
	cstPis: string;
	porcPis: number;
	valorPis: number;
	
	cstCofins: string;
	porcCofins: number;
	valorCofins: number;

    quantVend?: number;
    uniVend?: string;
    valorVend?: number;
    cstVend?: string;

}

export const produtoXmlInitial: ProdutoXml = {
    codigo: "",
    nome: "",
    ean: "",
    ncm: "",
    cest: "",
    cfop: "",
    uniCom: "",
    quantCom: 0,
    valorUnit: 0,
    valorTotal: 0,
    eanTrib: "",
    uniTrib: "",
    quantTrib: 0,
    desc: 0,
    outro: 0,
    vTotTrib: 0,
    cstIcms: "",
    porcIcms: 0,
    valorIcms: 0,
    porcIcmsSt: 0,
    valorIcmsSt: 0,
    cstIpi: "",
    porcIpi: 0,
    valorIpi: 0,
    cstPis: "",
    porcPis: 0,
    valorPis: 0,
    cstCofins: "",
    porcCofins: 0,
    valorCofins: 0
};