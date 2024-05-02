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
  const [process, setProcess] = useState<ProcessType>(initialProcess);

  function hanldeSave() {}

  function loadData() {}

  async function loadFeedstockName() {
    const data = (await api.get("/api/feedstock")).data;
    const dt = data.map((item: FeedstockType) => {
      return { value: item?.id, label: item.name, measure: item.measure, balance: item.balance };
    });
    setOptionsFeed(dt);
  }

  function loadProductName(name: string) {}

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
    setProduct({...initialProduct});
  }

  function saveProcess(status: string) {
    process.feedstock = feedstock;
    process.products = products;
    process.status = status;
    process.responsibleUser = responsibleUser.codigo;

    if (process.id) {
      api
        .post("process", process)
        .then(() => {
          setShowModal(false);
          toast.success("Processo Salvo!");
        })
        .catch((e) => toast.error("Erro:" + e));
    } else {
      api
        .put("process", process)
        .then(() => {
          setShowModal(false);
          toast.success("Processo Atualizado!");
        })
        .catch((e) => toast.error("Erro:" + e));
    }
  }

  useEffect(() => {
    let prod = initialProduct;
    let i = 0;
    // while (i < 10) {
    //   prod.name = "test" + i;
    //   prod.id = i + 1;
    //   prod.balance = 0.5;
    //   prod.measure = "KG";
    //   setProducts((old) => {
    //     old.push(prod);
    //     return old;
    //   });
    //   i++;
    // }
    loadFeedstockName();
  }, []);

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
  };
}
