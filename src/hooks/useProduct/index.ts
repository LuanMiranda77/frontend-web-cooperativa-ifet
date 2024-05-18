import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import * as yup from "yup";
import { Cargo } from "../../domain/enums";
import { ProductType, initialProduct } from "../../domain/types/productType";
import { UtilsUserLocal } from "../../utils/utils_userLocal";
import { ProductService } from "./../../module/estoque/pages/services/ProdutoService";
import { selectStateEstab } from "./../../store/slices/estabelecimento.slice";

export default function useProduct() {
  const [dataSource, setDataSource] = useState<Array<ProductType>>([]);
  const estabelecimento = useSelector(selectStateEstab);
  const { title, colors } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [produto, setProduto] = useState<ProductType>(initialProduct);
  const [showPoupAtivo, setShowPopupAtivo] = useState(false);
  const [showPoupInativo, setShowPopupInativo] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [isAtado, setIsAtacado] = useState(false);
  const actualUser = UtilsUserLocal.getTokenLogin();
  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    measure: yup.string().required("O Medida é obrigatório"),
    price: yup.number().required("O Preço é obrigatório"),
  });
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
    resolver: yupResolver(schema),
  });

  const tableHeaders = [
    { dataField: "id", caption: "Código", dataType: "number", with: 90 },
    { dataField: "ean", caption: "Cod. Barras", dataType: "string", with: 100 },
    { dataField: "name", caption: "Descrição", dataType: "string" },
    { dataField: "measure", caption: "Med", dataType: "string", with: 50 },
    { dataField: "balance", caption: "Saldo", dataType: "number", with: 100 },
    { dataField: "price", caption: "P. Venda", dataType: "number", with: 100 },
    { dataField: "", caption: "", with: 70 },
  ];

  const onAtive = (produto: ProductType) => {
    const index = dataSource.findIndex((item) => item.id === produto.id);
    produto.status = "S";
    ProductService.setStatus(produto)
      .then(() => {
        toast.success("Produto ativo com sucesso!");
        Object.assign(dataSource[index], produto);
        setShowPopupAtivo(false);
      })
      .catch((e) => {
        setShowPopupAtivo(false);
        toast.error("Erro:" + e);
      });
  };

  const onInative = (produto: ProductType) => {
    const index = dataSource.findIndex((item) => item.id === produto.id);
    produto.status = "N";
    ProductService.setStatus(produto)
      .then(() => {
        toast.success("Produto inativo com sucesso!");
        Object.assign(dataSource[index], produto);
        setShowPopupInativo(false);
      })
      .catch((e) => {
        setShowPopupInativo(false);
        toast.error("Erro:" + e);
      });
  };

  async function onLoadData() {
    let setor_id = 0;
    if (actualUser.cargo !== Cargo.MASTER && actualUser.setor) {
      setor_id = actualUser.setor;
    }
    ProductService.findAll(setor_id)
      .then((resp) => {
        console.log(resp);
        setDataSource(resp);
      })
      .catch((error) => {
        toast.error(error.mensagemUsuario);
      });
  }

  async function onSave() {
    ProductService.save(produto)
      .then((res) => {
        setShowModal(false);
        toast.success("Produto Atualizado com sucesso!");
        onLoadData();
      })
      .catch((e) => toast.error("Erro:" + e));
  }

  useEffect(() => {
    onLoadData();
  }, []);

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
    onSave,
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
