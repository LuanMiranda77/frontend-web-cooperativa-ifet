import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { ProdutoType } from "../../domain";
import { ProductService } from "./../../module/estoque/pages/services/ProdutoService";
import { selectStateEstab } from "./../../store/slices/estabelecimento.slice";

export default function useProduct() {
  const [dataSource, setDataSource] = useState<Array<ProdutoType>>([]);
  const estabelecimento = useSelector(selectStateEstab);
  const { title, colors } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [produto, setProduto] = useState<any>();
  const [showPoupAtivo, setShowPopupAtivo] = useState(false);
  const [showPoupInativo, setShowPopupInativo] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [isAtado, setIsAtacado] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema)
  });

  const tableHeaders = [
    { dataField: "codigo", caption: "Código" },
    { dataField: "ean", caption: "Cod. Barras" },
    { dataField: "nome", caption: "Descrição" },
    { dataField: "unid", caption: "Med" },
    { dataField: "precoCusto", caption: "P. Custo" },
    { dataField: "saldo", caption: "Estoque" },
    { dataField: "precoVenda", caption: "P. Venda" },
    { dataField: "precoAtacado", caption: "P. Atacado" },
    { dataField: "dtUltimaCompra", caption: "Ult.Compra" },
    { dataField: "nomeForn", caption: "Fornecedor" },
    { dataField: "ncm", caption: "NCM" },
    { dataField: "cstIcms", caption: "CIT" },
    { dataField: "", caption: "" },
  ];

  useEffect(() => {
    if (estabelecimento.id) {
      ProductService.findAll(estabelecimento.id)
        .then((resp) => {
          console.log(resp);
          setDataSource(resp);
        })
        .catch((error) => {
          toast.error(error.mensagemUsuario);
        });
    }
  }, [estabelecimento]);

  const onAtive = (produto: ProdutoType) => {
    // let data = _.map(dataSource, (value) => {
    //   if (produto.codigo === value.codigo) {
    //     value.status = "S";
    //   }
    //   return value;
    // });
    // setDataSource([...data]);
    const index = dataSource.findIndex((item) => item.id === produto.id);
    produto.status = "S";
    Object.assign(dataSource[index], produto);
    setShowPopupAtivo(false);
  };

  const onInative = (produto: ProdutoType) => {
    const index = dataSource.findIndex((item) => item.id === produto.id);
    produto.status = "N";
    Object.assign(dataSource[index], produto);
    setShowPopupInativo(false);
  };

  return {
    dataSource,
    setDataSource,
    estabelecimento,
    title,
    colors,
    showModal,
    setShowModal,
    produto,
    setProduto,
    showPoupAtivo,
    setShowPopupAtivo,
    showPoupInativo,
    setShowPopupInativo,
    showModalCategoria,
    setShowModalCategoria,
    isAtado,
    setIsAtacado,
    tableHeaders,

    // function
    onInative,
    onAtive,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    errors,
    control,
  };
}
