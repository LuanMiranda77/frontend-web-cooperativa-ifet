import React, { useContext } from "react";
import { FaFileSignature, FaPen, FaTrashAlt } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import { ProductType } from "../../../domain/types/productType";
import { UtilsConvert } from "../../../utils/utils_convert";
interface Props {
  products: Array<ProductType>;
  setProducts: Function;
  height?: string;
  type: "pd" | "cf";
}
const ListProductConf: React.FC<Props> = (props) => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <div
      style={{
        height: `calc(100vh - ${props.height ? props.height : "600px"})`,
        overflowY: "auto",
      }}
    >
      {props.products.map((e) => (
        <div
          className="w-100 h-16 my-2 rounded-xl flex items-center px-4"
          style={{ background: colors.gray }}
        >
          <div className="font-bold w-8/12">
            <p>Nome</p>
            <span>{e.name}</span>
          </div>
          <div className="font-bold w-1/12">
            <p>Med</p>
            <span>{e.measure}</span>
          </div>
          <div className="font-bold w-2/12">
            <p>Quant.</p>
            <span>{UtilsConvert.NumberToDecimal(e.balance)}</span>
          </div>
          <div className="flex items-center justify-between text-center font-bold w-16">
            {props.type == "pd" ? (
              <>
                <FaPen
                  className="cursor-pointer"
                  title="Editar item"
                  color={colors.info}
                />
                <FaTrashAlt
                  className="cursor-pointer"
                  title="Apagar item"
                  color={colors.error}
                />
              </> 
            ) : (
              <FaFileSignature
                title="Adicionar descrepancias"
                className="cursor-pointer"
                color={colors.info}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductConf;
