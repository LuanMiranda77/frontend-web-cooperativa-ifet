import { Column } from "devextreme-react/data-grid";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { ButtonIcon, DataGridDefault } from "../../components";
import UseProcess from "../../hooks/useProcess";
import { UtilsDate } from "../../utils/utils_date";
import ModalProcess from "./ModalProcess";

const Process: React.FC = () => {
  const {
    title,
    colors,
    initialProcess,
    initialFeedstock,
    initialProduct,
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
    loadData,
    showModal,
    setShowModal,
    loadFeedstockName,
    loadProductName,
  } = UseProcess();

  const renderCell = (element: any) => {
    console.log(element);
    if (element.columnIndex === 1) {
      return (
        <span>{`${element.value} ${
          Boolean(element.data.lastName) ? element.data.lastName : ""
        }`}</span>
      );
    }
    if (element.value === "S") {
      return (
        <div
          className="rounded-full h-6 text-center p-1"
          style={{ backgroundColor: colors.success }}
        >
          <span className="font-bold text-white">ATIVO</span>
        </div>
      );
    } else if (element.value === "N") {
      return (
        <div
          className="rounded-full  h-6 text-center p-1"
          style={{ backgroundColor: colors.error }}
        >
          <span className="font-bold text-white">INATIVO</span>
        </div>
      );
    } else if (element.columnIndex === 2) {
      <span className="font-bold" style={{ color: colors.info }}></span>;
    } else if (element.columnIndex === 5) {
      return <div className="flex text-lg justify-between px-3"></div>;
    }
  };

  return (
    <>
      <div className="card-local p-2 h-full">
        <div style={{ height: "calc(100vh - 140px)" }}>
          <DataGridDefault
            isSearch
            cssSearch="w-11/12"
            headerChildren={
              <div className="w-1/12 mr-2">
                <ButtonIcon
                  borderColor={colors.primary}
                  label="Novo"
                  icon={<FaPlus />}
                  width={"100%"}
                  onClick={() => {
                    setProcess(initialProcess);
                    setShowModal(true);
                  }}
                />
              </div>
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
              dataField="setor.name"
              caption="Setor"
              alignment="center"
              dataType=""
              width={170}
              cellRender={renderCell}
              allowSearch={false}
            />
            <Column
              dataField="name"
              caption="Materia prima"
              alignment="left"
              dataType="string"
              cssClass="font-bold"
              cellRender={renderCell}
            />
            <Column
              dataField="mensure"
              caption="Med"
              alignment="center"
              dataType=""
              width={80}
              cellRender={renderCell}
              allowSearch={false}
            />
            <Column
              dataField="balance"
              caption="Saldo"
              alignment="left"
              dataType="string"
              width={120}
            />
            <Column
              dataField="dateCreate"
              caption="Abertura"
              alignment="center"
              dataType="string"
              width={140}
              allowSearch={false}
              cellRender={(e) =>
                UtilsDate.formatByDDMMYYYY(e.value ? e.value : null)
              }
            />
             <Column
              dataField="dateClose"
              caption="Finalizado"
              alignment="center"
              dataType="string"
              width={140}
              allowSearch={false}
              cellRender={(e) =>
                UtilsDate.formatByDDMMYYYY(e.value ? e.value : null)
              }
            />
            <Column
              dataField="status"
              caption="Status"
              alignment="center"
              dataType=""
              width={150}
              cellRender={renderCell}
              allowSearch={false}
            />
            <Column
              dataField=""
              caption=""
              alignment="center"
              dataType=""
              width={100}
              cellRender={renderCell}
              allowSearch={false}
            />
          </DataGridDefault>
        </div>
      </div>
      <ModalProcess
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        feedstock={feedstock}
        product={product}
        products={products}
        setFeedstock={setFeedstock}
        setProduct={setProduct}
        setProducts={setProducts}
        loadFeedstockName={loadFeedstockName}
        loadProductName={loadProductName}
      />
    </>
  );
};

export default Process;
