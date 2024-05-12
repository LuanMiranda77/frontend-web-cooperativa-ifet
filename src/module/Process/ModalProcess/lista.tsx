import { TextareaAutosize } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaFileSignature, FaPen, FaRegSave, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { ModalDefault } from "../../../components";
import { api } from "../../../config/api";
import { unidadeMedidas } from "../../../constants/constMedidas";
import { ProcessType } from "../../../domain/types/processType";
import { ProductType, initialProduct } from "../../../domain/types/productType";
import { UtilsConvert } from "../../../utils/utils_convert";
interface Props {
  products: Array<ProductType>;
  setProducts: Function;
  height?: string;
  type: "pd" | "cf";
  product: ProductType;
  setProduct: Function;
  process?: ProcessType;
}
const ListProductConf: React.FC<Props> = (props) => {
  const { title, colors } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [discrepancy, setDiscrepancy] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const [productSelected, setProductSelect] = useState<ProductType>(initialProduct);

  function removeProductDerivado(index: number) {
    const p = [...props.products];
    p.splice(index, 1);
    props.setProducts([...p]);
    
    if (props.process?.id && p[index].id) {
      api
        .delete(`api/process/deleted-product?processId=${props.process?.id}&productId=${p[index].id}`)
        .then((resp) => {
          toast.success("Processo Deletado com sucesso!");
        })
        .catch((e) => toast.error("Erro:" + e));
    }
  }

  function editProductDerivado(index: number) {
    Object.assign(props.products[index], productSelected);
    setIsEdit(false);
  }

  function alterDiscrepancy(index: number) {
    const p = { ...props.products[index] };
    p.discrepancy = discrepancy;
    Object.assign(props.products[index], p);
    setShow(false);
  }

  return (
    <div
      style={{
        height: `calc(100vh - ${props.height ? props.height : "600px"})`,
        overflowY: "auto",
      }}
    >
      {props.products.map((e: ProductType, i) => (
        <div className="w-100 h-16 my-2 rounded-xl flex items-center px-4" style={{ background: colors.gray }}>
          <div className="w-6/12">
            <p className="font-bold">Nome</p>
            {isEdit ? (
              <input
                className="px-1"
                value={productSelected?.name}
                onChange={(e) => setProductSelect({ ...productSelected, name: e.target.value })}
              />
            ) : (
              <span>{e.name}</span>
            )}
          </div>
          <div className="w-1/12">
            <p className="font-bold">Med</p>
            {isEdit ? (
              <select
                className="w-16 h-6"
                value={productSelected.measure}
                onChange={(e) => setProductSelect({ ...productSelected, measure: e.target.value })}
              >
                {unidadeMedidas.map((e: any) => (
                  <option value={e.value}>{e?.label}</option>
                ))}
              </select>
            ) : (
              <span>{e.measure}</span>
            )}
          </div>
          <div className="w-2/12">
            <p className="font-bold">Quant.</p>
            {isEdit ? (
              <input
                type="number"
                className="w-20 px-1"
                value={productSelected.balance}
                onChange={(e) => setProductSelect({ ...productSelected, balance: Number(e.target.value) })}
              />
            ) : (
              <span>{UtilsConvert.NumberToDecimal(e.balance)}</span>
            )}
          </div>
          <div className="w-3/12">
            <p className="font-bold">Discrepância</p>
            <span>{e?.discrepancy ? e?.discrepancy : "-"}</span>
          </div>
          <div className="flex items-center justify-between text-center w-16">
            {props.type == "pd" ? (
              <>
                {isEdit ? (
                  <FaRegSave
                    className="btn cursor-pointer"
                    title="Salvar edição"
                    color={colors.info}
                    onClick={() => editProductDerivado(i)}
                    size={25}
                  />
                ) : (
                  <>
                    <FaPen
                      className="btn cursor-pointer"
                      title="Editar item"
                      color={colors.info}
                      onClick={() => {
                        setProductSelect(e);
                        setIsEdit(true);
                      }}
                      size={20}
                    />
                    <FaTrashAlt
                      className="btn cursor-pointer"
                      title="Apagar item"
                      color={colors.error}
                      onClick={() => removeProductDerivado(i)}
                      size={20}
                    />
                  </>
                )}
              </>
            ) : (
              <i
                title="Adicionar descrepancias"
                className="btn cursor-pointer"
                onClick={() => {
                  setDiscrepancy("");
                  setIndex(i);
                  setShow(true);
                }}
              >
                <FaFileSignature color={colors.info} size={20} />
              </i>
            )}
            {show && (
              <ModalDefault
                onClickAction={() => alterDiscrepancy(i)}
                isOpen={show}
                title="Confirme"
                onRequestClose={() => setShow(false)}
              >
                <p className="font-bold">Produto: {props.products[i].name}</p>
                <p className="font-bold">
                  Med.: {props.products[i].measure} / Quant.: {props.products[i].balance}
                </p>
                <span>Digite a discrepância</span>
                <TextareaAutosize
                  className="w-full border border-current rounded p-1"
                  value={discrepancy}
                  onChange={(e) => setDiscrepancy(e.target.value)}
                />
              </ModalDefault>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductConf;
