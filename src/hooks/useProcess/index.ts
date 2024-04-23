import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { FeedstockType, initialFeedstock } from "../../domain/types/feedstock";
import { ProcessType, initialProcess } from "../../domain/types/processType";
import { ProductType, initialProduct } from "../../domain/types/productType";
import { selectStateUser } from "../../store/slices/usuario.slice";

export default function UseProcess() {
  const { title, colors } = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState(new Array<ProcessType>());
  const [process, setProcess] = useState(initialProcess);
  const [feedstock, setFeedstock] = useState(initialFeedstock);
  const [product, setProduct] = useState(initialProduct);
  const [products, setProducts] = useState(new Array<ProductType>());
  const responsibleUser = useSelector(selectStateUser);
  const [showModal, setShowModal] = useState(false);

  function hanldeSave() {}

  function loadData() {}

  function loadFeedstockName(
    inputValue: string,
    callback: (options: FeedstockType[]) => void
  ) {
    return callback([]);
  }
  function loadProductName(name: string) {}

  useEffect(() => {
    let prod = initialProduct;
    let i = 0;
    while (i < 10) {
      prod.name = "test" + i;
      prod.id = i + 1;
      prod.balance = 0.5;
      prod.measure = "KG";
      setProducts((old) => {
        old.push(prod);
        return old;
      });
      i++;
    }
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
  };
}
