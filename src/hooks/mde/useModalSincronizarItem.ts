import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { UtilsConvert } from "../..//utils/utils_convert";
import { ProdutoType } from "../../domain";
import { ProdutoXml } from "../../domain/types/produtoXml";

export default function useModalSincronizarItem({ ...props }) {
  const theme = useContext(ThemeContext);
  const [isAtacado, setIsAtacado] = useState(false);
  const [isShowImpost, setIsShowImpost] = useState(false);
  const [produtoXml, setProdutoXml] = useState<ProdutoXml>({
    ...props.produto,
  });
  const [produto, setProduto] = useState<ProdutoType>(
    UtilsConvert.convertProdutoXmlToProduto({ ...props.produto })
  );

  useEffect(() => {
    let produto = UtilsConvert.convertProdutoXmlToProduto({ ...props.produto });
    let produtoXml = { ...props.produto };
    produto.saldo = 1 * produtoXml.quantCom;
    setProdutoXml(produtoXml);
    setProduto(produto);
  }, [props.produto]);

  const onConversaoMedida = (valorDigitado: number) => {
    let prod = produto;
    prod.saldo = valorDigitado * produtoXml.quantCom;
    prod.fatorConversao = valorDigitado;
    setProduto({ ...prod });
  };

  
  return {
    theme,
    isAtacado,
    setIsAtacado,
    produtoXml,
    setProdutoXml,
    produto,
    setProduto,
    isShowImpost, 
    setIsShowImpost,
    onConversaoMedida,
  };
}
