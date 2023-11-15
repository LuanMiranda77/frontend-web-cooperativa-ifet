// import { Column } from "devextreme-react/data-grid";
import { Column } from "devextreme-react/data-grid";
import moment from "moment";
import React from "react";
import { FaCamera, FaPlus, FaSave, FaSync, FaTasks } from "react-icons/fa";
import { GiStarProminences } from "react-icons/gi";
import {
  ButtonBase,
  ButtonIcon,
  DataGridDefault,
  Divider,
  InputDate,
  InputDefault,
  InputNumber,
  InputSelectDefault,
  ModalDefault,
} from "../../../../components";
import { MdeType } from "../../../../domain/types/nfe_entrada";
import { produtoXmlInitial } from "../../../../domain/types/produtoXml";
import useModalEntrada from "../../../../hooks/mde/useModalEntrada";
import { UtilsConvert } from "../../../../utils/utils_convert";
import { UtilsDate } from "../../../../utils/utils_date";
import { TitleMDe } from "./components";
import { ModalSincronizarProduto } from "./modalSincronizarProduto";
import {
  ContainerEntradaNota,
  ContainerProdutoSync,
  HeaderNota,
} from "./styles";

// import { Container } from './styles';
interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  tipo: number;
  nota: MdeType;
}

export const ModalEntrada: React.FC<ModalProps> = (props) => {
  const {
    theme,
    notaSelect,
    setNotaSelect,
    showModalProd,
    setShowModalProd,
    showModalPromocao,
    setShowModalPromocao,
    tipoCadastro,
    produtoselect,
    setProdutoSelect,
    dataSourceCopy,
    checkCPF,
    dataSource,
    setCheckCPF,
    onCreatePromocao,
    onCadastroSincronizar,
    onCadastroNovo,
    produto,
    setProduto,
    onConversaoMedida,
    isAtacado,
    setIsAtacado,
  } = useModalEntrada(props);

  return (
    <ModalDefault
      key={"#modalcaixa"}
      title={"Entrada de nota"}
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      isFullScreen
      textBtnAction="Finalizar"
    >
      <HeaderNota className="mb-5 rounded-md px-2 py-1" style={{background:'#f6f6f6'}}>
        <div className="flex justify-between">
          <div className="flex">
            <TitleMDe
              className="mr-5"
              text="Número da nota"
              value={notaSelect.numNota}
              color="color-error"
            />
            <TitleMDe
              className="mr-5"
              text="CNPJ/CPF"
              value={notaSelect.cnpjCpf}
            />
            <TitleMDe
              className="mr-5"
              text="Fornecedor"
              value={notaSelect.fornecedor}
            />
          </div>
          <div className="flex">
            <TitleMDe
              className="mr-5"
              text="Data de emissão"
              value={UtilsDate.formatByDDMMYYYYSemHora(notaSelect.dataEmissao)}
              color="color-error"
            />
            <div>
              <InputDate
                className="text-ms w-40 text-left"
                label="Data entrada"
                value={moment(notaSelect.dataEntrada).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setNotaSelect({
                    ...notaSelect,
                    dataEntrada: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex">
            <TitleMDe
              className="mr-5"
              text="Chave de acesso"
              value={notaSelect.chaveAcesso}
              color="color-error"
            />
          </div>
          <div className="flex text-right">
            <TitleMDe
              className="mr-5"
              text="Valor ICMS"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorIcms
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Valor Substitução"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorSubTributa
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Valor COFINS"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorCofins
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Valor IPI"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorIpi
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Frete"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorFrete
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Valor Produto"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorTotalNotaLiquido
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Desconto"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorDesc
              ).replaceAll("R$", "")}
            />
            <TitleMDe
              className="mr-5"
              text="Valor Total"
              color="color-error"
              value={UtilsConvert.formatCurrency(
                notaSelect.valorTotalNota
              ).replaceAll("R$", "")}
            />
          </div>
        </div>
      </HeaderNota>
      <ContainerEntradaNota className="flex">
        <div className="left" style={{ width: "70%" }}>
          {/* <hr className="mb-3" style={{ marginTop: "-5px" }} /> */}
          <ContainerProdutoSync>
            <DataGridDefault
              dataSource={dataSource}
              paginar={false}
              showBorders
              // showRowLines
              showColumnLines
              hoverStateEnabled
              rowAlternationEnabled
              isSelectRow
              moduloSeletion="single"
              isSearch
              headerChildren={
                <div className="h-10 flex ">
                  <ButtonIcon
                    className="green-color mr-5  w-40"
                    label="Criar Promoção"
                    icon={<GiStarProminences />}
                    width={"180px"}
                    style={{ marginTop: "-3px" }}
                    onClick={onCreatePromocao}
                    color={theme.colors.white}
                    background={theme.colors.success}
                    borderColor={theme.colors.primary}
                  />
                  <ButtonIcon
                    className="mr-5"
                    label="Novo"
                    icon={<FaPlus />}
                    width={"120px"}
                    style={{ marginTop: "-3px" }}
                    onClick={onCadastroNovo}
                    color={theme.colors.white}
                    background={theme.colors.primary}
                    borderColor={theme.colors.primary}
                  />
                  <ButtonIcon
                    className="line"
                    label="Sincronizar item"
                    icon={<FaSync />}
                    width={"180px"}
                    style={{ marginTop: "-3px" }}
                    onClick={onCadastroSincronizar}
                    color={theme.colors.primary}
                    background={theme.colors.white}
                    borderColor={theme.colors.primary}
                  />
                </div>
              }
              onSelectionChanged={(e) => {
                let selected = UtilsConvert.convertProdutoXmlToProduto({
                  ...e.currentSelectedRowKeys[0],
                });
                setProduto({ ...selected });
              }}
            >
              <Column
                dataField="codigo"
                caption="Código"
                alignment="left"
                dataType="string"
                width={60}
                cssClass="font-bold text-blue-800"
              />
              <Column
                dataField="ean"
                caption="Cod. Barras"
                alignment="center"
                dataType="string"
                width={100}
              />
              <Column
                dataField="nome"
                caption="Descrição"
                alignment=""
                dataType="string"
              />
              <Column
                dataField="quant"
                caption="Qtde"
                alignment="right"
                dataType="number"
                format={{ type: "fixedPoint", precision: 3 }}
                width={60}
              />
              <Column
                dataField="und"
                caption="UN"
                alignment="center"
                dataType="string"
                format={{ type: "fixedPoint", precision: 2 }}
                width={40}
              />
              <Column
                dataField="quantCom"
                caption="Qtde NF"
                alignment="right"
                dataType="number"
                cssClass="font-bold"
                format={{ type: "fixedPoint", precision: 3 }}
                width={60}
              />
              <Column
                dataField="uniCom"
                caption="UN NF"
                alignment="center"
                dataType="string"
                cssClass="font-bold"
                width={50}
              />
              <Column
                dataField="valorUnit"
                caption="Vlr. Custo"
                alignment="right"
                dataType="number"
                cssClass="font-bold"
                allowSearch={false}
                format={{ type: "fixedPoint", precision: 2 }}
                width={75}
              />
              <Column
                dataField="vlrvenda"
                caption="Vlr. Venda"
                alignment="right"
                dataType="number"
                allowSearch={false}
                format={{ type: "fixedPoint", precision: 2 }}
                width={75}
              />
              <Column
                dataField="valorTotal"
                caption="Vlr. Total"
                alignment="right"
                dataType="number"
                cssClass="font-bold"
                allowSearch={false}
                format={{ type: "fixedPoint", precision: 2 }}
                width={80}
              />
              <Column
                dataField="cstIcms"
                caption="CST NF"
                alignment="center"
                dataType="string"
                cssClass="font-bold text-sx"
                allowSearch={false}
                width={52}
              />
              <Column
                dataField="cst"
                caption="CST"
                alignment="center"
                dataType="string"
                allowSearch={false}
                width={50}
              />
            </DataGridDefault>
          </ContainerProdutoSync>
        </div>
        <div className="right ml-5" style={{ width: "30%" }}>
          <div
            className="rounded-md drop-shadow-md p-2"
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <div className="flex justify-between mb-3">
              <FaCamera
                className="color-error btn"
                title="Foto do produto"
                style={{ fontSize: "30px" }}
              />
              <FaTasks
                className="btn"
                title="Detalhes de impostos"
                style={{ fontSize: "30px", color: theme.colors.primary }}
              />
            </div>
            <InputDefault
              className="col-span-4"
              type="text"
              label="Descrição"
              value={produto?.nome}
              onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            />
            <div className="w-full flex justify-between">
              <InputSelectDefault
                label="Categoria"
                options={[]}
                placeholder="Selecione a categoria"
                isClearable
                isSearchable
              />
              <FaPlus
                className="mt-6 ml-3 drop-shadow-md btn"
                size={25}
                color={theme.colors.primary}
              />
            </div>
            <div className="text-left mb-3 px-2">
              <p className="text-xs font-bold ">Medidas do seu item</p>
              <div className="flex text-center w-full font-bold pt-2 align-items-center justifay-between">
                <InputNumber
                  placeholder="0,000"
                  label="Quantidade"
                  separadorDecimal=","
                  casaDecimal={3}
                  separadorMilhar="."
                  prefixo=""
                  fixedZeroFinal
                  value={produto.fatorConversao}
                  onChange={(e) =>
                    onConversaoMedida(
                      UtilsConvert.DecimalToNumber(e.target.value)
                    )
                  }
                />
                <InputDefault
                  label="Medida"
                  type="text"
                  placeholder="UND"
                  value={produto.unid}
                  onChange={(e) =>
                    setProduto({ ...produto, unid: e.target.value })
                  }
                />
                <InputNumber
                  placeholder="0,000"
                  color={theme.colors.error}
                  label="Saldo Estoque"
                  separadorDecimal=","
                  casaDecimal={3}
                  separadorMilhar="."
                  prefixo=""
                  fixedZeroFinal
                  value={produto.saldo}
                  onChange={(e) =>
                    setProduto({ ...produto, saldo: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex text-center w-full font-bold pt-2 align-items-center justifay-between">
                <InputNumber
                  placeholder="0,000"
                  label="Saldo mínimo"
                  separadorDecimal=","
                  casaDecimal={3}
                  separadorMilhar="."
                  prefixo=""
                  fixedZeroFinal
                  value={produto.saldoMinimo}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      saldoMinimo: Number(e.target.value),
                    })
                  }
                />
                <InputNumber
                  placeholder="0,000"
                  label="Quantidade mini p/atacado"
                  separadorDecimal=","
                  casaDecimal={3}
                  separadorMilhar="."
                  prefixo=""
                  fixedZeroFinal
                  value={produto.quantMinAtacado}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      quantMinAtacado: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="text-left">
                <p className="text-xs font-bold ">Preços unitários</p>
                <div className="flex text-center w-full pt-2 align-items-center justifay-between">
                  {/* <InputNumber
                    placeholder="00,00"
                    label="Valor com imposto"
                    separadorDecimal=","
                    casaDecimal={2}
                    separadorMilhar="."
                    prefixo=""
                    fixedZeroFinal
                    readOnly
                  /> */}
                  <InputNumber
                    placeholder="00,00"
                    label="Valor de custo"
                    separadorDecimal=","
                    casaDecimal={2}
                    separadorMilhar="."
                    prefixo=""
                    fixedZeroFinal
                    value={produto.precoCusto}
                    onChange={(e) =>
                      setProduto({
                        ...produto,
                        precoCusto: Number(e.target.value),
                      })
                    }
                  />
                  <InputNumber
                    placeholder="00,00"
                    label="% de Lucro"
                    separadorDecimal=","
                    casaDecimal={2}
                    separadorMilhar="."
                    prefixo=""
                    fixedZeroFinal
                    value={produto.precoVenda}
                    onChange={(e) =>
                      setProduto({
                        ...produto,
                        precoVenda: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex text-center w-full pt-2 align-items-center justifay-between">
                  {isAtacado && (
                    <>
                      <InputNumber
                        placeholder="00,00"
                        label="Preço de venda"
                        separadorDecimal=","
                        casaDecimal={2}
                        separadorMilhar="."
                        prefixo=""
                        fixedZeroFinal
                        color={theme.colors.success}
                        value={produto.precoVenda}
                        onChange={(e) =>
                          setProduto({
                            ...produto,
                            precoVenda: Number(e.target.value),
                          })
                        }
                      />
                      <InputNumber
                        placeholder="00,00"
                        label="Preço de atacado"
                        separadorDecimal=","
                        casaDecimal={2}
                        separadorMilhar="."
                        prefixo=""
                        fixedZeroFinal
                        color={theme.colors.success}
                        value={produto.precoAtacado}
                        onChange={(e) =>
                          setProduto({
                            ...produto,
                            precoAtacado: Number(e.target.value),
                          })
                        }
                      />
                    </>
                  )}
                </div>
                <div className="w-full flex justify-end">
                  <FaSave
                    className="drop-shadow-md btn"
                    size={30}
                    color={theme.colors.primary}
                    title="Salvar alterações"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerEntradaNota>

      <ModalDefault
        title="PROMOÇÃO"
        isOpen={showModalPromocao}
        onRequestClose={() => setShowModalPromocao(false)}
        width="40%"
        left="24%"
        margin="9%"
        height="45%"
      >
        <div className="card-local p-3" style={{ marginTop: "-10px" }}>
          <div className="mr-4  w-32 mb-5">
            <InputNumber
              placeholder="00,00"
              label="Desconto %"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
            />
          </div>
          <div className="flex mb-16">
            <InputDate
              className="text-ms w-40 mr-5 text-left"
              label="Data ininical"
            />
            <InputDate className="text-ms w-40 text-left" label="Data final" />
          </div>
          <div
            className="flex justify-end"
            style={{ bottom: 22, right: 15, position: "absolute" }}
          >
            <ButtonBase
              label="CANCELAR"
              model="btn_line"
              className="primary-color mr-5  w-32"
              size="large"
              onClick={props.closeModal}
            />
            <ButtonIcon
              className="mr-3"
              label="SALVAR"
              icon={<FaSave />}
              width={"50%"}
            />
          </div>
        </div>
      </ModalDefault>

      <ModalSincronizarProduto
        showModal={showModalProd}
        closeModal={() => setShowModalProd(false)}
        tipo={tipoCadastro}
        produto={produtoselect ? produtoselect : produtoXmlInitial}
      />

      {/* <ToastDefault /> */}
    </ModalDefault>
  );
};
