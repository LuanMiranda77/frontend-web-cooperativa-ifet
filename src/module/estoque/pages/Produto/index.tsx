import { Column } from "devextreme-react/data-grid";
import { useState } from "react";
import { FaCheck, FaPen } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import { DataGridDefault, DialogPopupConfirme } from "../../../../components";
import useProduct from "../../../../hooks/useProduct";
import ModalProduct from "./modal";
import { Container } from "./styles";

function Produto() {
  const {
    dataSource,
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
    tableHeaders,
    onInative,
    onAtive,
    reset,
    onSave,
  } = useProduct();

  const renderCell = (element: any) => {
    if (element.value === "S") {
      return (
        <div className="rounded-full h-6 text-center p-1" style={{ backgroundColor: colors.success }}>
          <span className="font-bold text-white">ATIVO</span>
        </div>
      );
    } else if (element.value === "N") {
      return (
        <div className="rounded-full  h-6 text-center p-1" style={{ backgroundColor: colors.error }}>
          <span className="font-bold text-white">INATIVO</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          {element.data.status === "N" ? (
            <i className="text-2xl cursor-pointer mr-6" style={{ color: colors.error }}>
              <GoCircleSlash
                id="buttonAtive"
                className=""
                title="Ativar usuário"
                onClick={() => showPopupConfirmeAction(element.data, 1)}
                size={18}
              />
            </i>
          ) : (
            <i className="text-2xl cursor-pointer mr-6" style={{ color: colors.success }}>
              <FaCheck
                id="buttonInative"
                className=""
                title="Desativar usuário"
                onClick={() => showPopupConfirmeAction(element.data, 2)}
                size={15}
              />
            </i>
          )}
          <i className="text-2xl cursor-pointer" style={{ color: colors.primary }}>
            <FaPen
              id="buttonAction"
              className=""
              title="Editar usuário"
              onClick={() => onEdit(element.data)}
              size={18}
            />
          </i>
        </div>
      );
    }
  };

  const onEdit = (produto: any) => {
    console.log("aqui");
    reset(produto);
    setProduto(produto);
    setShowModal(true);
  };

  const showPopupConfirmeAction = (produto: any, tipo: number) => {
    setProduto(produto);
    tipo === 1 ? setShowPopupAtivo(true) : setShowPopupInativo(true);
  };

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container className="card-local p-2">
      <DataGridDefault
        dataSource={dataSource}
        allowSorting
        paginar={false}
        // showRowLines
        rowAlternationEnabled
        showBorders
        showColumnLines
        hoverStateEnabled
        isSelectRow
        moduloSeletion="single"
        isSearch
        cssSearch="w-8/12"
      >
        {tableHeaders.map((item, i) => {
          return (
            <Column
              key={i}
              caption={item.caption}
              dataField={item.dataField}
              dataType={item.dataType}
              width={item.with}
              cssClass={`font-bold ${i === 0 ? "column-1" : ""}`}
              alignment={i === 0 || i === 1 ? "center" : i >= 4 && i <= 7 ? "right" : ""}
              format={
                i === 5
                  ? {
                      type: "fixedPoint",
                      precision: 2,
                    }
                  : i === 4 || (i > 5 && i <= 7)
                  ? { type: "fixedPoint", precision: 3 }
                  : ""
              }
              sortOrder={i === 0 ? "asc" : ""}
              cellRender={i === tableHeaders.length - 1 ? renderCell : undefined}
            />
          );
        })}
      </DataGridDefault>

      {/* ===============================MOdal================ */}
      <ModalProduct
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={produto}
        setProduct={setProduto}
        onSave={onSave}
      />

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupInativo}
        onRequestClose={() => setShowPopupInativo(false)}
        onClickSim={() => onInative(produto)}
      >
        <p className="font-bold text-xl">Você quer bloquear o produto? </p>
        <p className="font-bold text-xl">{produto.name}</p>
        <p className="font-bold" style={{ color: colors.error }}>
          O mesmo não poderar ser vendido!
        </p>
      </DialogPopupConfirme>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupAtivo}
        onRequestClose={() => setShowPopupAtivo(false)}
        onClickSim={() => onAtive(produto)}
      >
        <p className="font-bold text-xl">Você quer desbloquear o produto? </p>
        <p className="font-bold text-xl">{produto.name}</p>
        <p className="font-bold" style={{ color: colors.error }}>
          O mesmo poderar ser vendido!
        </p>
      </DialogPopupConfirme>
    </Container>
  );
}
export default Produto;
