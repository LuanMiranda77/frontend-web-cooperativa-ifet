import { useMemo } from "react";
import {
  FaFileDownload,
  FaFileImport,
  FaFileSignature,
  FaFileUpload,
  FaFunnelDollar,
  FaPlus,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";

import { Column } from "devextreme-react/data-grid";
import moment from "moment";
import CountUp from "react-countup";
import { TbDatabaseExport } from "react-icons/tb";
import {
  ButtonBase,
  ButtonIcon,
  ButtonUpload,
  DataGridDefault,
  Divider,
  InputDate,
  InputDefault,
  InputMask,
  InputSelectDefault,
  ModalDefault,
} from "../../../../components";
import useEntradaNota from "../../../../hooks/mde/useEntradaNota";
import { UtilsConvert } from "../../../../utils/utils_convert";
import { status, tiposFiltroData } from "./__mooks";
import { ModalEntrada } from "./modalEntrada";
import {
  Body,
  ButtonFilter,
  Container,
  ContainerFiltro,
  ContainerTable,
  StatusNota,
} from "./styles";

function Mde() {
  const {
    estabelecimento,
    title,
    colors,
    showModalEntrada,
    setShowModalEntrada,
    showPopupInfo,
    setShowPopupInfo,
    showModalFiltro,
    setShowModalFiltro,
    tamanhoIpuntCnpjCpf,
    setTamanhoIpuntCnpjCpf,
    tipoNota,
    setTipoNota,
    notaSelect,
    setNotaSelect,
    selectRow,
    setSelectRow,
    arrayErro,
    setArrayErro,
    dataSource,
    setDataSource,
    dataSourceCopy,
    setDataSourceCopy,
    uploadXml,
    onManifestar,
    filterStatus,
    actionNota,
    onEntadaMde,
    onNovo,
  } = useEntradaNota();

  const renderCell = (element: any) => {
    // console.log(element);
    if (element.columnIndex === 5 && element.value === "M") {
      return (
        <StatusNota color={colors.success} backgroundColor={colors.dns_success}>
          MANIFESTA
        </StatusNota>
      );
    } else if (element.columnIndex === 5 && element.value === "N") {
      return (
        <StatusNota color={colors.error} backgroundColor={colors.dns_error}>
          A MANIFESTAR
        </StatusNota>
      );
    } else if (element.columnIndex === 5 && element.value === "A") {
      return (
        <StatusNota color={colors.warning} backgroundColor={colors.dns_warning}>
          AVULSA
        </StatusNota>
      );
    } else if (element.columnIndex === 8 && element.value === "S") {
      return (
        <i className="text-lg cursor-pointer" style={{ color: colors.primary }}>
          <FaRegCheckCircle className="ml-5" title="Nota incluida no sistema" />
        </i>
      );
    } else if (element.columnIndex === 8 && element.value === "N") {
      return (
        <i className="text-lg cursor-pointer" style={{ color: colors.error }}>
          <FaRegTimesCircle
            id="buttonAction"
            className="ml-5"
            title="Nota não incluida no sistema"
          />
        </i>
      );
    } else {
      return (
        <i
          className="text-lg cursor-pointer"
          style={{ color: colors.primary }}
          onClick={() => onEntadaMde(element.row.data)}
        >
          <FaFileImport
            id="buttonAction"
            className="ml-3"
            title="Realizar entrada da nota"
          />
        </i>
      );
    }
  };

  // const search = (desc: any) => {
  //   if (desc !== "") {
  //     let notas = dataSourceCopy;
  //     if (!isNaN(parseFloat(desc)) && isFinite(desc)) {
  //       notas = dataSourceCopy.filter((produto) => {
  //         return produto.numNota.includes(desc);
  //       });
  //     } else {
  //       notas = dataSourceCopy.filter((produto) => {
  //         return produto.fornecedor.includes(desc.toUpperCase());
  //       });
  //     }
  //     setDataSource(notas);
  //   } else {
  //     setDataSource(dataSourceCopy);
  //   }
  // };

  const listaErros = (
    <div className="overflow-y-auto" style={{ height: "calc(100vh - 110px)" }}>
      {arrayErro.map((error, key) => {
        return (
          <div key={key}>
            <div className="text-left">
              <p>
                <strong className="mr-1">Erro:</strong>
                <strong className="text-red-700">{error.error}</strong>
              </p>
              <p>
                <strong className="mr-1">Chave:</strong>
                <label>{error.chave}</label>
              </p>
              <p>
                <strong className="mr-1">Emissão:</strong>
                <label>{moment(error.dateEmisao).format("DD/MM/YYYY")}</label>
              </p>
              <p>
                <strong className="mr-1">Fornecedor:</strong>
                <label>
                  {UtilsConvert.setMaskCpfCnpj(error.cnpjCpf)} - {error.nome}
                </label>
              </p>
              <p>
                <strong className="mr-1">Valor:</strong>
                <label>
                  {UtilsConvert.formatCurrency(Number(error.valor))}
                </label>
              </p>
            </div>
            <hr className="mb-5" />
          </div>
        );
      })}
    </div>
  );

  const lista = useMemo(() => listaErros, [arrayErro]);

  return (
    <Container
      className="card-local w-full h-full p-3 font-bold"
      style={{
        backgroundColor: title === "dark" ? colors.tertiary : colors.white,
      }}
    >
      <header
        className="flex text-xl font-bold items-center justify-between mb-3 h-8"
        style={{ color: colors.primary }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            backgroundColor: title === "dark" ? colors.tertiary : colors.white,
            borderRadius: "8px",
          }}
        >
          <i className="mr-1">
            <FaFileUpload />
          </i>
          <label htmlFor="">Notas de entrada</label>
        </div>
        {/* <div className="text-sm text-center">
          <b className="mr-2">Certificado: fskksiiskkaii</b>
          <b style={{ color: colors.error }}>Vencimento:12/05/2022</b>
        </div> */}

        <div className="flex items-center justify-between">
          <ButtonIcon
            className=" mr-4"
            label="Entrada avulso"
            icon={<FaPlus />}
            width={"160px"}
            style={{ marginTop: "-3px" }}
            onClick={onNovo}
            background={colors.primary}
          />
          <ButtonUpload
            className="mr-4"
            label="Importar XML"
            color={colors.primary}
            boderColor={colors.primary}
            width={"150px"}
            style={{ marginTop: "-3px" }}
            multiple
            upload={(e) => uploadXml(e.target.files)}
          />
          <ButtonIcon
            className="mr-4"
            label="Manifestar nota"
            icon={<FaFileSignature />}
            width={"170px"}
            style={{ marginTop: "-3px" }}
            onClick={onManifestar}
            background={colors.primary}
          />
          <ButtonIcon
            className="text-sm mr-3 mb-1"
            label="Atualizar Notas"
            icon={<FaFileDownload />}
            width=""
            style={{ backgroundColor: colors.success }}
            background={colors.success}
          />
          <ButtonFilter
            onClick={() => setShowModalFiltro(true)}
            title="Filtro avançado"
          >
            <FaFunnelDollar className="mr-1" />
            <p style={{ fontSize: "15px" }}>Filtro Avançado</p>
          </ButtonFilter>
        </div>
      </header>
      <hr className="mb-5" />
      <Body>
        <ContainerTable>
          <DataGridDefault
            dataSource={dataSource}
            paginar={false}
            showBorders
            showColumnLines
            hoverStateEnabled
            rowAlternationEnabled
            isSelectRow
            moduloSeletion="single"
            onSelectionChanged={(e) =>
              setSelectRow({ ...e.currentSelectedRowKeys[0] })
            }
            onRowDblClick={(e) => onEntadaMde(e.data)}
            isSearch
            headerChildren={
              <div className="w-8/12 flex h-8 justify-between">
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="w-30 text-xs font-bold text-left">
                  <p>Última consulta</p>
                  <span className="font-normal">12/12/2022 19:09:35</span>
                </div>
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="w-30 text-xs font-bold text-center">
                  <p>Tempo restante</p>
                  <span
                    className="font-bold"
                    style={{ color: colors.error, fontSize: "15px" }}
                  >
                    09:06
                  </span>
                </div>
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="w-30 text-xs font-bold text-center">
                  <p>Quantidade</p>
                  <CountUp
                    end={dataSource.length}
                    prefix=""
                    separator=""
                    decimal=""
                    decimals={0}
                  />
                </div>
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="w-3/12 text-xs font-bold text-right">
                  <p>Valor total</p>
                  <CountUp
                    end={dataSource.reduce((total, item) => total + item.valorTotalNota, 0)}
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                  />
                </div>
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="w-3/12" style={{ marginTop: "0px" }}>
                  <p
                    className="text-xs"
                    style={{ marginBottom: "-3px", color: colors.primary }}
                  >
                    Status
                  </p>
                  <InputSelectDefault
                    label=""
                    options={status}
                    autoFocus
                    placeholder="Selecione..."
                    onChange={(e) => filterStatus(e.value)}
                    defaultValue={status[0]}
                    fontSize="12px"
                    height={20}
                  />
                </div>
                <Divider
                  tipo="vertical"
                  className="h-8 m-2"
                  size={2}
                  style={{ marginTop: "-8px" }}
                  color={colors.tertiary}
                />
                <div className="ml-2">
                  <TbDatabaseExport
                    title="Exportar xmls das notas"
                    className="text-3xl cursor-pointer"
                    style={{ color: colors.error }}
                  />
                </div>
              </div>
            }
            cssSearch="w-4/12"
          >
            <Column
              dataField="numNota"
              caption="Número"
              alignment="left"
              dataType="string"
              width={100}
              cssClass="font-bold column-1"
            />
            <Column
              dataField="dataEmissao"
              caption="Emissão"
              alignment="center"
              dataType="date"
              width={95}
              cssClass="font-bold"
            />
            <Column
              dataField="cnpjCpf"
              caption="CNPJ/CPF"
              alignment=""
              dataType="string"
              width={150}
            />
            <Column
              dataField="fornecedor"
              caption="Fornecedor"
              alignment="left"
              dataType="number"
            />
            <Column
              dataField="valorTotalNota"
              caption="Valor bruto"
              alignment="right"
              dataType="number"
              format={{ type: "fixedPoint", precision: 2 }}
              width={110}
              cssClass="font-bold"
            />
            {/* <Column dataField= 'valorIcms' caption= 'VLR.ICMS' alignment= 'center' dataType= 'number' allowSearch={false} format={{type:'fixedPoint', precision:2}} width={110} />
          <Column dataField= 'valorDesc' caption= 'VLR.DESCONTO' alignment= 'right' dataType= 'number' cssClass= 'font-bold' allowSearch={false} format={{type:'fixedPoint', precision:2}} width={150} />
          <Column dataField= 'valorTotalNotaLiquido' caption= 'VLR.LÍQUIDO' alignment= 'right' dataType= 'number' cssClass= 'font-bold' allowSearch={false} format={{type:'fixedPoint', precision:2}} width={150} /> */}
            <Column
              dataField="status"
              caption="Status"
              alignment="center"
              dataType="number"
              cssClass="font-bold text-sx"
              allowSearch={false}
              width={120}
              cellRender={renderCell}
            />
            <Column
              dataField="dataManifesto"
              caption="Manifesto"
              alignment="center"
              dataType="date"
              allowSearch={false}
              width={100}
            />
            <Column
              dataField="dataEntrada"
              caption="Entrada"
              alignment="center"
              dataType="date"
              cssClass="font-bold"
              allowSearch={false}
              width={95}
            />
            <Column
              dataField="incluida"
              caption="Incluida"
              alignment="center"
              dataType="number"
              cssClass="font-bold"
              allowSearch={false}
              width={90}
              cellRender={renderCell}
            />
            <Column
              dataField=""
              caption=""
              alignment="center"
              dataType=""
              cssClass=""
              allowSearch={false}
              format={{ type: "fixedPoint", precision: 2 }}
              width={50}
              cellRender={renderCell}
            />
          </DataGridDefault>
        </ContainerTable>
      </Body>

      <ModalDefault
        isOpen={showModalFiltro}
        title="FILTRAR NOTAS"
        onRequestClose={() => setShowModalFiltro(false)}
        width="50%"
        left="22%"
        height="75%"
        margin="5%"
        onClickAction={()=>{}}
        textBtnAction="Filtrar"
      >
        <ContainerFiltro className="bg-white w-full p-3">
          <div className="text-left font-bold mb-5">
            <p className="text-xs">Filtro por data</p>
            <hr
              className="mb-2"
              style={{ border: "1px solid" + colors.gray }}
            />
            <div className="flex items-center mt-3">
              <div className="w-full mr-5">
                <InputSelectDefault
                  label="Tipo"
                  options={tiposFiltroData}
                  defaultValue={tiposFiltroData[0]}
                />
              </div>
              <InputDate className="text-ms w-40 mr-5" label="Data inicial" />
              <InputDate className="text-ms w-40" label="Data final" />
            </div>
          </div>

          <div className="text-left text-xs font-bold">
            <p>Informações diversas</p>
            <hr
              className="mb-5"
              style={{ border: "1px solid" + colors.gray }}
            />
            <div className="w-full">
              <InputDefault
                className="w-3/12 mr-5 mb-5"
                label="Número da nota"
                type="number"
              />
              <div className="flex w-full">
                {tamanhoIpuntCnpjCpf < 11 ? (
                  <InputMask
                    className="w-6/12 mr-5 "
                    label="CNPJ"
                    type="number"
                    mask={"99.999.999/9999-99"}
                  />
                ) : (
                  <InputMask
                    className="w-6/12 mr-5 "
                    label="CPF"
                    type="number"
                    mask={"999.999.999-99"}
                  />
                )}
                <InputDefault
                  className="w-full"
                  label="Fornnecedor"
                  type="text"
                />
              </div>
            </div>
          </div>
        </ContainerFiltro>
      </ModalDefault>

      <ModalEntrada
        showModal={showModalEntrada}
        closeModal={() => setShowModalEntrada(false)}
        tipo={tipoNota}
        nota={notaSelect}
      />

      <ModalDefault
        title="Aviso de erros na importação"
        isOpen={showPopupInfo}
        onRequestClose={() => setShowPopupInfo(false)}
        width="50vw"
        left="24vw"
        margin="1rem"
        height="95vh"
      >
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {arrayErro.map((error) => {
            return (
              <>
                <div className="text-left">
                  <p>
                    <strong className="mr-1">Erro:</strong>
                    <strong className="text-red-700">{error.error}</strong>
                  </p>
                  <p>
                    <strong className="mr-1">Chave:</strong>
                    <label>{error.chave}</label>
                  </p>
                  <p>
                    <strong className="mr-1">Emissão:</strong>
                    <label>
                      {moment(error.dateEmisao).format("DD/MM/YYYY")}
                    </label>
                  </p>
                  <p>
                    <strong className="mr-1">Fornecedor:</strong>
                    <label>
                      {UtilsConvert.setMaskCpfCnpj(error.cnpjCpf)} -{" "}
                      {error.nome}
                    </label>
                  </p>
                  <p>
                    <strong className="mr-1">Valor:</strong>
                    <label>
                      {UtilsConvert.formatCurrency(Number(error.valor))}
                    </label>
                  </p>
                </div>
                <hr className="mb-5" />
              </>
            );
          })}
        </div>
        {lista}
      </ModalDefault>
    </Container>
  );
}
export default Mde;
