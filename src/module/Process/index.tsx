import { Column } from "devextreme-react/data-grid";
import React from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { useSelector } from "react-redux";
import { ButtonIcon, DataGridDefault, DialogPopupConfirme } from "../../components";
import { DicColorStatus, DicProcessStatus } from "../../constants/dicProcessStatus";
import { EstabelecimentoType } from "../../domain";
import { Cargo, EnumStatusProcess } from "../../domain/enums";
import UseProcess from "../../hooks/useProcess";
import { selectStateEstabelecimentos } from "../../store/slices/estabelecimentos.slice";
import { UtilsDate } from "../../utils/utils_date";
import ModalProcess from "./ModalProcess";

const Process: React.FC = () => {
  const {
    colors,

    dataSource,
    process,
    setProcess,
    feedstock,
    setFeedstock,
    product,
    setProduct,
    products,
    setProducts,
    actualUser,
    showModal,
    setShowModal,
    loadFeedstockName,
    loadProductName,
    addProductDerivado,
    optionsFeed,
    setOptionsFeed,
    optionsProducts,
    setOptionsProducts,
    saveProcess,
    editProcess,
    deleteProcess,
    dialog,
    setDialog,
    onNovoProcess,
  } = UseProcess();

  const setores = useSelector(selectStateEstabelecimentos);

  const customStatus = (element: any) => (
    <div
      className="font-bold rounded"
      style={{ color: DicColorStatus[element.value], border: `1px solid ${DicColorStatus[element.value]}` }}
    >
      <span>{DicProcessStatus[element.value]}</span>
    </div>
  );

  return (
    <>
      <div className="card-local p-2 h-full">
        <div style={{ height: "calc(100vh - 140px)" }}>
          <DataGridDefault
            isSearch
            cssSearch="w-11/12"
            headerChildren={
              actualUser.cargo !== Cargo.VENDEDOR && (
                <div className="w-32">
                  <ButtonIcon
                    borderColor={colors.primary}
                    label="Novo"
                    icon={<FaPlus />}
                    width={"100%"}
                    onClick={() => {
                      onNovoProcess();
                    }}
                  />
                </div>
              )
            }
            dataSource={dataSource}
            allowSorting={false}
            paginar={false}
            // showRowLines
            rowAlternationEnabled
            showBorders
            hoverStateEnabled
            isSelectRow
            // onInitialized={(e) => setGridInstance(e.component)}
          >
            <Column
              dataField="id"
              caption="Código"
              alignment="center"
              dataType="string"
              width={100}
              cssClass="font-bold column-1"
              sortOrder={"asc"}
            />
            <Column
              dataField="setor"
              caption="Setor"
              alignment="center"
              dataType=""
              width={170}
              cellRender={(e) => {
                let setor = setores.find((setor: EstabelecimentoType) => setor.id === e.value);
                return setor ? <span>{setor.name}</span> : <span>-</span>;
              }}
              allowSearch={false}
            />
            <Column
              dataField="feedstock.name"
              caption="Materia prima"
              alignment="left"
              dataType="string"
              cssClass="font-bold"
            />
            <Column
              dataField="feedstock.measure"
              caption="Med"
              alignment="center"
              dataType=""
              width={80}
              allowSearch={false}
            />
            {/* <Column dataField="feedstock.balance" caption="Saldo" alignment="center" dataType="string" width={120} /> */}
            <Column
              dataField="dateCreate"
              caption="Abertura"
              alignment="center"
              dataType="string"
              width={140}
              allowSearch={false}
              cellRender={(e) => UtilsDate.formatByDDMMYYYY(e.value ? e.value : null)}
            />
            <Column
              dataField="dateClose"
              caption="Finalizado"
              alignment="center"
              dataType="string"
              width={140}
              allowSearch={false}
              cellRender={(e) => (e.value ? UtilsDate.formatByDDMMYYYY(e.value) : "-")}
            />
            <Column
              dataField="status"
              caption="Status"
              alignment="center"
              dataType=""
              width={150}
              cellRender={customStatus}
              allowSearch={false}
            />
            <Column
              dataField=""
              caption=""
              alignment="center"
              dataType=""
              width={100}
              cellRender={(e) => {
                return (
                  <div className="flex justify-between px-5">
                    {[EnumStatusProcess.RASCUNHO, EnumStatusProcess.PENDENCIA].includes(e.key.status) &&
                      actualUser.cargo !== Cargo.VENDEDOR && (
                        <i className="btn cursor-pointer" title="Editar" onClick={() => editProcess(e.data)}>
                          <FaPencilAlt color={colors.primary} />
                        </i>
                      )}
                    {EnumStatusProcess.CAPITACAO === e.key.status && actualUser.cargo !== Cargo.CAPITADOR && (
                      <i className="cursor-pointer btn" title="Conferir" onClick={() => editProcess(e.data)}>
                        <TbListDetails size={18} color={colors.primary} />
                      </i>
                    )}
                    {![
                      EnumStatusProcess.FINALIZADO,
                      EnumStatusProcess.CONFERENCIA,
                      EnumStatusProcess.CAPITACAO,
                    ].includes(e.key.status) &&
                      actualUser.cargo !== Cargo.VENDEDOR && (
                        <i className="btn cursor-pointer" title="Excluir" onClick={() => setDialog(true)}>
                          <FaTrash color={colors.error} />
                        </i>
                      )}
                    {dialog && (
                      <DialogPopupConfirme
                        title="Confirme"
                        isOpen={dialog}
                        onRequestClose={() => setDialog(false)}
                        onClickSim={() => deleteProcess(e.key.id)}
                        children={
                          <div>
                            <span>Tem certeza que deseja deletar o processo?</span>
                            <p className="text-red-700 text-center font-bold">Esta ação não poderar ser desfeito!</p>
                          </div>
                        }
                      />
                    )}
                  </div>
                );
              }}
              allowSearch={false}
            />
          </DataGridDefault>
        </div>
      </div>

      <ModalProcess
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        feedstock={feedstock}
        process={process}
        setProcess={setProcess}
        product={product}
        products={products}
        setFeedstock={setFeedstock}
        setProduct={setProduct}
        setProducts={setProducts}
        loadFeedstockName={loadFeedstockName}
        loadProductName={loadProductName}
        addProductDerivado={addProductDerivado}
        optionsFeed={optionsFeed}
        setOptionsFeed={setOptionsFeed}
        optionsProducts={optionsProducts}
        setOptionsProducts={setOptionsProducts}
        saveProcess={saveProcess}
      />
    </>
  );
};

export default Process;
