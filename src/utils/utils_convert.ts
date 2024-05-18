import { ProdutoType } from "../domain";
import { produtoinitial } from "../domain/types/produto";
import { ProdutoXml } from "../domain/types/produtoXml";

export class UtilsConvert {
  static fileConvertSizeByte = (bytes: number) => {
    const si = true,
      dp = 1;
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;
    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );
    return bytes.toFixed(dp) + " " + units[u];
  };

  static formatCurrency = (value: number) => {
    let valor = "";
    if (value !== undefined) {
      valor = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    }
    return valor;
  };

  static removeCaracterEspecial = (value: string): string => {
    let valor = "";
    if (value !== undefined) {
      valor = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return valor;
  };

  static convertArrayNumberToMoney(array: any[]) {
    let _array = array.map((valor) => this.formatCurrency(valor));
    return _array;
  }

  static setMaskCpfCnpj = (doc: string): string => {
    let valor = "";
    if (doc.length === 11) {
      valor = doc.substring(0, 3);
      valor += ".";
      valor += doc.substring(3, 6);
      valor += ".";
      valor += doc.substring(6, 9);
      valor += "-";
      valor += doc.substring(9, 11);
    } else if (doc.length === 14) {
      valor = doc.substring(0, 2);
      valor += ".";
      valor += doc.substring(2, 5);
      valor += ".";
      valor += doc.substring(5, 8);
      valor += "/";
      valor += doc.substring(8, 12);
      valor += "-";
      valor += doc.substring(12, 14);
    }
    return valor;
  };

  static setMaskFone = (doc: string): string => {
    let valor = "";
    if (doc.length === 10) {
      valor += "(";
      valor += doc.substring(0, 2);
      valor += ") ";
      valor += doc.substring(2, 6);
      valor += "-";
      valor += doc.substring(6, 10);
    } else if (doc.length === 11) {
      valor += "(";
      valor += doc.substring(0, 2);
      valor += ") ";
      valor += doc.substring(2, 3);
      valor += ".";
      valor += doc.substring(3, 7);
      valor += "-";
      valor += doc.substring(7, 11);
    }
    return valor;
  };

  static convertProdutoXmlToProduto(produtoXml: ProdutoXml): ProdutoType {
    let produto: ProdutoType = produtoinitial;
    produto.ean = produtoXml.ean;
    produto.name = produtoXml.nome;
    produto.unid = produtoXml.uniCom;
    produto.precoCusto = produtoXml.valorUnit;
    produto.fatorConversao = 1;
    produto.cfop = produtoXml.cfop;
    produto.ncm = produtoXml.ncm;
    produto.cest = produtoXml.cest;
    produto.cstIcms = produtoXml.cstIcms;
    produto.porcIcms = produtoXml.porcIcms;
    produto.valorIcms = produtoXml.valorIcms;
    produto.cstIpi = produtoXml.cstIpi;
    produto.porcIpi = produtoXml.porcIpi;
    produto.valorIpi = produtoXml.valorIpi;
    produto.cstPis = produtoXml.cstIpi;
    produto.porcPis = produtoXml.porcPis;
    produto.valorPis = produtoXml.valorPis;
    produto.cstCofins = produtoXml.cstCofins;
    produto.porcConfis = produtoXml.porcCofins;
    produto.valorCofins = produtoXml.valorCofins;
    return produto;
  }

  static DecimalToNumber(numero: string) {
    return Number(numero.replaceAll(",", "."));
  }

  static NumberToDecimal(numero: number, digitos:number=3) {
    const numeroFormatado = numero.toLocaleString("pt-BR", {
      minimumFractionDigits: digitos,
      maximumFractionDigits: digitos,
    });
    return numeroFormatado;
  }
}
