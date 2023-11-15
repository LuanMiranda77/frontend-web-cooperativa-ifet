import { Column } from "devextreme-react/data-grid";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import {
  ButtonIcon,
  DataGridDefault,
  DialogPopupConfirme,
  Divider,
  InputDefault,
  InputFileProduto,
  InputMook,
  InputSelectDefault,
  ModalDefault,
  NavTab,
} from "../../../../components";
import { TabItem } from "../../../../components/NavTab";
import useProduct from "../../../../hooks/useProduct";
import ModalCategoria from "./categoria";
import TabEstoque from "./components/TabEstoque";
import TabImposto from "./components/TabImposto";
import TabMovimentation from "./components/TabMovimentation";
import TabPromotion from "./components/TabPromotion";
import { Container, ContainerFoto } from "./styles";

/**
 *@Author
 *@Issue
 */

function Produto() {
  const {
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
  } = useProduct();

  const renderCell = (element: any) => {
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
    } else {
      return (
        <div className="flex items-center justify-center">
          {element.data.status === "N" ? (
            <i
              className="text-2xl cursor-pointer mr-6"
              style={{ color: colors.error }}
            >
              <GoCircleSlash
                id="buttonAtive"
                className=""
                title="Ativar usuário"
                onClick={() => showPopupConfirmeAction(element.data, 1)}
                size={18}
              />
            </i>
          ) : (
            <i
              className="text-2xl cursor-pointer mr-6"
              style={{ color: colors.error }}
            >
              <FaTrash
                id="buttonInative"
                className=""
                title="Desativar usuário"
                onClick={() => showPopupConfirmeAction(element.data, 2)}
                size={15}
              />
            </i>
          )}
          <i
            className="text-2xl cursor-pointer"
            style={{ color: colors.primary }}
          >
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

  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);

  const onEdit = (produto: any) => {
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
        headerChildren={
          <div className="flex w-4/12 justify-end">
            <ButtonIcon
              label="Novo"
              icon={<FaPlus />}
              width={"100px"}
              onClick={() => setShowModal(true)}
              background={colors.primary}
              className="mr-5"
            />
            <ButtonIcon
              label="Duplicar item"
              icon={<FaPlus />}
              width={"150px"}
              onClick={() => setShowModal(true)}
              color={colors.primary}
              background={colors.white}
              borderColor={colors.primary}
            />
          </div>
        }
        cssSearch="w-8/12"
      >
        {tableHeaders.map((item, i) => {
          return (
            <Column
              key={i}
              caption={item.caption}
              dataField={item.dataField}
              dataType={
                i === 8 ? "date" : i >= 4 && i <= 7 ? "number" : "string"
              }
              width={
                i === 0
                  ? 70
                  : i === 1
                  ? 100
                  : i === 2
                  ? 250
                  : i === 3
                  ? 40
                  : i > 3 && i < 9
                  ? 80
                  : i === 11
                  ? 50
                  : i === 10
                  ? 70
                  : i === tableHeaders.length - 1
                  ? 70
                  : null
              }
              cssClass={`font-bold ${i === 0 ? "column-1" : ""}`}
              alignment={
                i === 0 || i === 1 ? "center" : i >= 4 && i <= 7 ? "right" : ""
              }
              format={
                i === 5
                  ? {
                      type: "fixedPoint",
                      precision: estabelecimento?.config?.numCasaDecimais,
                    }
                  : i === 4 || (i > 5 && i <= 7)
                  ? { type: "fixedPoint", precision: 2 }
                  : ""
              }
              cellRender={
                i === tableHeaders.length - 1 ? renderCell : undefined
              }
            />
          );
        })}
      </DataGridDefault>

      {/* ===============================MOdal================ */}
      <ModalDefault
        isOpen={showModal}
        title="Ficha do produto"
        onRequestClose={() => setShowModal(false)}
        height="calc(100vh - 0px)"
      >
        <div className="p-1 flex">
          <div id="lado-left" className="w-4/12">
            <div className="flex items-center">
              <div className="w-9/12">
                <div className="flex items-center">
                  <InputMook
                    className="w-6/12 mb-5"
                    label="Código"
                    type="text"
                    register={register("codigo")}
                  />
                </div>
                <InputDefault
                  className="w-8/12 mb-5"
                  label="Código de Barras"
                  register={register("ean")}
                  type="text"
                />
              </div>
              <ContainerFoto className="">
                <div
                  className="rounded-full h-5 text-center w-8/12 mb-3 ml-9"
                  style={{ backgroundColor: colors.success }}
                >
                  <span className="font-bold text-white">ATIVO</span>
                </div>
                <InputFileProduto lado="left" setValue={() => {}} value={produto?.image} />
              </ContainerFoto>
            </div>
            <InputDefault
              className="mb-5"
              label="Descrição"
              type="text"
              register={register("nome")}
            />

            <div className="w-8/12 mb-5 flex justify-between items-center">
              <div className="w-full mr-2">
                <InputSelectDefault
                  label="Categoria"
                  options={[]}
                  placeholder="Selecione a categoria"
                  isClearable
                  isSearchable
                />
              </div>
              <BiPlus
                className="mt-6 cursor-pointer"
                style={{
                  fontSize: "25px",
                  color: title === "dark" ? colors.white : colors.primary,
                }}
                onClick={() => setShowModalCategoria(true)}
              />
            </div>
            <div id="dt-importantes">
              <div
                className="text-left font-bold"
                style={{
                  color: title === "dark" ? colors.white : colors.tertiary,
                }}
              >
                <p>Datas importantes:</p>
              </div>
              <div className="flex">
                <div className="font-bold text-left p-2">
                  <p
                    style={{
                      color: title === "dark" ? colors.white : colors.success,
                    }}
                  >
                    Criado em
                  </p>
                  <p
                    style={{
                      color: title === "dark" ? colors.white : colors.primary,
                    }}
                  >
                    {moment(getValues("dtCreate")).format("DD/MM/YYYY")}
                  </p>
                </div>
                <Divider
                  tipo="vertical"
                  className="ml-4 mr-4"
                  color={colors.tertiary}
                />
                <div className="font-bold text-left p-2">
                  <p
                    style={{
                      color: title === "dark" ? colors.white : colors.error,
                    }}
                  >
                    Ultima atualização
                  </p>
                  <p
                    style={{
                      color: title === "dark" ? colors.white : colors.primary,
                    }}
                  >
                    {moment(getValues("dtUpdate")).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Divider tipo="vertical" className="ml-4 mr-4" />

          <div id="lado-right" className="w-8/12">
            <NavTab
              tabs={[
                { label: "Estoque" },
                { label: "Promoções" },
                { label: "Movimentação" },
                { label: "Impostos" },
              ]}
              value={activeTab}
              setValue={setActiveTab}
            >
              <TabItem value={activeTab} index={0}>
                <TabEstoque
                  checked={isAtado}
                  setChecked={setIsAtacado}
                  product={produto}
                  setProduct={setProduto}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  control={control}
                />
              </TabItem>
              <TabItem value={activeTab} index={1}>
                <TabPromotion
                  dataSource={[]}
                  product={produto}
                  setProduct={setProduto}
                />
              </TabItem>
              <TabItem value={activeTab} index={2}>
                <TabMovimentation product={produto} setProduct={setProduto} />
              </TabItem>
              <TabItem value={activeTab} index={3}>
                <TabImposto product={produto} setProduct={setProduto} />
              </TabItem>
            </NavTab>
          </div>
        </div>
      </ModalDefault>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupInativo}
        onRequestClose={() => setShowPopupInativo(false)}
        onClickSim={() => onInative(produto)}
      >
        <p className="font-bold text-2xl">
          Tem certeza que deseja bloquear o usuário?{" "}
        </p>
        <p className="font-bold" style={{ color: colors.error }}>
          O mesmo não poderá acessar o sistema até ser liberado !
        </p>
      </DialogPopupConfirme>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupAtivo}
        onRequestClose={() => setShowPopupAtivo(false)}
        onClickSim={() => onAtive(produto)}
      >
        <p className="font-bold text-2xl">
          Tem certeza que deseja liberar o usuário?{" "}
        </p>
        <p className="font-bold" style={{ color: colors.error }}>
          O mesmo poderá acessar o sistema normalmente!
        </p>
      </DialogPopupConfirme>

      <ModalCategoria
        showModal={showModalCategoria}
        closeModal={() => setShowModalCategoria(false)}
      />
    </Container>
  );
}
export default Produto;
