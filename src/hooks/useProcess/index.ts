/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { api } from "../../config/api";
import { FeedstockType, initialFeedstock } from "../../domain/types/feedstock";
import { ProcessType, initialProcess } from "../../domain/types/processType";
import { ProductType, initialProduct } from "../../domain/types/productType";
import { selectStateUser } from "../../store/slices/usuario.slice";

export default function UseProcess() {
  const { title, colors } = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState(new Array<ProcessType>());
  const [optionsFeed, setOptionsFeed] = useState(new Array<any>());
  const [optionsProducts, setOptionsProducts] = useState(new Array<any>());
  const [feedstock, setFeedstock] = useState(initialFeedstock);
  const [product, setProduct] = useState(initialProduct);
  const [products, setProducts] = useState(new Array<ProductType>());
  const responsibleUser = useSelector(selectStateUser);
  const [showModal, setShowModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [process, setProcess] = useState<ProcessType>(initialProcess);
  const url = "api/process";

  function hanldeSave() {}

  function loadData() {
    api
      .get(url)
      .then((e) => {
        setDataSource(e.data);
      })
      .catch((e) => toast.error("Erro:" + e));
  }

  async function loadFeedstockName() {
    const data = (await api.get("/api/feedstock")).data;
    const dt = data.map((item: FeedstockType) => {
      return { value: item?.id, label: item.name, measure: item.measure, balance: item.balance, setor: item.setor.id };
    });
    setOptionsFeed(dt);
  }

  async function loadProductName() {
    const data = (await api.get(`/api/produto/setor?pID=${process.setor}`)).data;
    const dt = data.map((item: ProductType) => {
      return {
        value: item?.id,
        label: item.name,
        measure: item.measure,
        balance: item.balance,
        price: item.price,
        setor: item.setor.id,
      };
    });
    setOptionsProducts(dt);
  }

  function addProductDerivado() {
    if (!Boolean(product.name) || !Boolean(product.measure)) {
      return toast.error("Existe campo em branco");
    }
    if (product.balance === 0) {
      return toast.error("Peso/Litro não pode ser zero");
    }

    let index = products.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      Object.assign(products[index], product);
    } else {
      setProducts([...products, product]);
    }
    setProduct({ ...initialProduct });
  }

  function saveProcess(status: string) {
    let feed = { ...feedstock } as any;
    delete feed.label;
    delete feed.value;
    delete feed.setor;
    process.feedstock = feed;
    process.products = products.map((p) => {
      let product = { ...p } as any;
      delete product.value;
      delete product.label;
      product.setor = { id: process.setor };
      return product;
    });
    process.status = status;
    process.responsibleUser = responsibleUser.id ? responsibleUser.id : 0;

    if (process.id == null) {
      api
        .post(url, process)
        .then(() => {
          setShowModal(false);
          toast.success("Processo Salvo!");
          loadData();
        })
        .catch((e) => toast.error("Erro:" + e));
    } else {
      api
        .put(url, process)
        .then(() => {
          setShowModal(false);
          toast.success("Processo Atualizado!");
          loadData();
        })
        .catch((e) => toast.error("Erro:" + e));
    }
  }

  function editProcess(process: any) {
    const feed = {
      ...process.feedstock,
      label: process.feedstock.name,
      value: process.feedstock.id,
    };
    setProcess({ ...process });
    setFeedstock(feed);
    findProductsByProcess(process.id);
    setShowModal(true);
  }

  function findProductsByProcess(id: number) {
    api
      .get(`api/process/products?pID=${id}`)
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((e) => toast.error("Erro:" + e));
  }

  async function deleteProcess(pID: number) {
    api
      .delete(`api/process?pID=${pID}`)
      .then((resp) => {
        setDialog(false);
        loadData();
        toast.success("Processo Deletado com sucesso!");
      })
      .catch((e) => toast.error("Erro:" + e));
  }

  useEffect(() => {
    loadFeedstockName();
    loadData();
  }, []);

  useEffect(() => {
    loadProductName();
  }, [process.setor]);

  return {
    initialProcess,
    initialFeedstock,
    initialProduct,
    title,
    colors,
    dataSource,
    setDataSource,
    process,
    setProcess,
    feedstock,
    setFeedstock,
    product,
    setProduct,
    products,
    setProducts,
    responsibleUser,
    hanldeSave,
    showModal,
    setShowModal,
    loadData,
    loadFeedstockName,
    loadProductName,
    addProductDerivado,
    optionsFeed,
    setOptionsFeed,
    optionsProducts,
    setOptionsProducts,
    saveProcess,
    editProcess,
    findProductsByProcess,
    deleteProcess,
    dialog,
    setDialog,
  };
}
