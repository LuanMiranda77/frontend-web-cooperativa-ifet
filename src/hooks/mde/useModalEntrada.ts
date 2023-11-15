import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { MdeType } from '../../domain/types/nfe_entrada';
import { ProdutoXml, produtoXmlInitial } from "../../domain/types/produtoXml";
import { MdeService } from "../../module/estoque/pages/services/MdeService";
import { selectStateEstab } from "../../store/slices/estabelecimento.slice";
import { ProdutoType } from "../../domain";
import { UtilsConvert } from "../../utils/utils_convert";
import { produtoinitial } from "../../domain/types/produto";

export default function useModalEntrada({ ...props }) {
  const theme = useContext(ThemeContext);
  const estabelecimento = useSelector(selectStateEstab);
  const [notaSelect, setNotaSelect] = useState<MdeType>(props.nota);
  const [showModalProd, setShowModalProd] = useState(false);
  const [showModalPromocao, setShowModalPromocao] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState(0);
  const [produtoselect, setProdutoSelect] = useState<ProdutoXml>(produtoXmlInitial);
  const [dataSource, setDataSource] = useState<Array<ProdutoXml>>([]);
  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);
  const [checkCPF, setCheckCPF] = useState(false);
  const [produto, setProduto] = useState<ProdutoType>(produtoinitial);
  const [isAtacado, setIsAtacado] = useState(true);

  useEffect(() => {
    let nota = { ...props.nota };

    if (!nota.dataEntrada) {
      nota.dataEntrada = new Date();
    }

    if (nota.cnpjCpf.length === 11) {
      setCheckCPF(true);
    }

    setNotaSelect(nota);

    if (estabelecimento.id) {
      MdeService.getListProdutXml(estabelecimento.id, nota.chaveAcesso)
        .then((response) => {
          setDataSource(response.data);
          setDataSourceCopy(response.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data);
        });
    }
  }, [props.nota]);

  const onCadastroNovo = () => {
    // if (!produtoselect) {
    //   toast.error("Selecione um produto para o cadastro.");
    //   return;
    // }
    setShowModalProd(true);
    setTipoCadastro(0);
  };

  const onCadastroSincronizar = () => {
    if (!produtoselect) {
      toast.error("Selecione um produto para sincronizar.");
      return;
    }
    setTipoCadastro(1);
    setShowModalProd(true);
  };

  const onCreatePromocao = () => {
    console.log(produtoselect);
    if (!produtoselect) {
      toast.error("Selecione um produto para criar a promoção.");
      return;
    } else if (produtoselect.codigo === "") {
      toast.error("O produto ainda não foi cadastrado, realize o cadastro.");
      return;
    }
    setShowModalPromocao(true);
  };

  const onConversaoMedida = (valorDigitado: number) => {
    let prod = produto;
    prod.saldo = valorDigitado * produtoselect.quantCom;
    prod.fatorConversao = valorDigitado;
    setProduto({ ...prod });
  };

  return {
    theme,
    notaSelect,
    dataSource, 
    setDataSource,
    setNotaSelect,
    showModalProd,
    setShowModalProd,
    showModalPromocao,
    setShowModalPromocao,
    tipoCadastro,
    setTipoCadastro,
    produtoselect,
    setProdutoSelect,
    dataSourceCopy,
    setDataSourceCopy,
    checkCPF,
    setCheckCPF,
    onCreatePromocao,
    onCadastroSincronizar,
    onCadastroNovo,
    produto, 
    setProduto,
    onConversaoMedida,
    isAtacado, 
    setIsAtacado,
  };
}
