// import { Column } from "devextreme-react/data-grid";
import { Column } from "devextreme-react/data-grid";
import moment from "moment";
import React from "react";
import CountUp from "react-countup";
import { FaPlus, FaSave, FaSync } from "react-icons/fa";
import { GiStarProminences } from "react-icons/gi";
import {
  ButtonBase,
  ButtonIcon,
  DataGridDefault,
  InputCheck,
  InputDate,
  InputDefault,
  InputMask,
  InputNumber,
  InputRadio,
  ModalDefault,
} from "../../../../components";
import { MdeType } from "../../../../domain/types/nfe_entrada";
import { produtoXmlInitial } from "../../../../domain/types/produtoXml";
import useModalEntrada from "../../../../hooks/mde/useModalEntrada";
import { ModalSincronizarProduto } from "./modalSincronizarProduto";
import { ContainerEntradaNota, ContainerProdutoSync } from "./styles";

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
  } = useModalEntrada(props);

  return (
    <ModalDefault
      key={"#modalcaixa"}
      title={"Entrada de nota"}
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      width="105vw"
      height="110vh"
      margin="-30px"
    >
      <ContainerEntradaNota className="flex pt-1">
        <div className="left" style={{ width: "30%" }}>
          <div className="flex">
            <InputDefault
              className="w-6/12 mr-5 mb-3"
              label="Número da nota"
              type="number"
              value={notaSelect.numNota}
              onChange={(e) =>
                setNotaSelect({ ...notaSelect, numNota: e.target.value })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            <div className="text-left font-bold mt-1 text-xs">
              <p
                className="text-xs mb-1"
                style={{
                  color:
                    theme.title === "drak"
                      ? theme.colors.textLabel
                      : theme.colors.primary,
                }}
              >
                Tipo da entrada
              </p>
              <InputRadio
                label="Nota Eletronica"
                checked={props.tipo === 1 ? true : false}
                disabled={props.tipo === 1 ? false : true}
              />
              <InputRadio
                label="Nota Avulsa"
                checked={props.tipo === 1 ? false : true}
                disabled={props.tipo === 1 ? true : false}
              />
            </div>
          </div>
          <InputDefault
            className="mr-5 mb-5 text-xs"
            label={`Chave acesso`}
            type="number"
            value={notaSelect.chaveAcesso}
            onChange={(e) =>
              setNotaSelect({ ...notaSelect, chaveAcesso: e.target.value })
            }
            readOnly={props.tipo === 1 ? true : false}
          />
          <div className="flex" style={{ marginTop: "-10px" }}>
            <InputDate
              className="text-ms w-40 mr-5 text-left"
              label="Data emissão"
              value={moment(notaSelect.dataEmissao).format("YYYY-MM-DD")}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  dataEmissao: new Date(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
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
          <div
            className="flex items-center mt-3 mb-1"
            style={{ marginTop: "0px" }}
          >
            <InputMask
              className="w-6/12 mr-5 "
              label="CNPJ/CPF"
              mask={checkCPF ? "999.999.999-99" : "99.999.999/9999-99"}
              value={notaSelect.cnpjCpf}
              onChange={(e) =>
                setNotaSelect({ ...notaSelect, cnpjCpf: e.target.value })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            {/* <i><FaUserPlus style={{ fontSize: '40px', marginTop: '25px', color: theme.colors.primary }} /></i> */}
            {props.tipo === 0 ? (
              <InputCheck
                css="p-5 mt-4"
                label="usar CPF?"
                checked={checkCPF}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCheckCPF(event.currentTarget.checked)
                }
              />
            ) : (
              <></>
            )}
          </div>
          <InputDefault
            className=" mr-5 mb-2"
            label="Fornecedor"
            type="text"
            value={notaSelect.fornecedor}
            onChange={(e) =>
              setNotaSelect({ ...notaSelect, fornecedor: e.target.value })
            }
            readOnly={props.tipo === 1 ? true : false}
          />
          <p className="text-left text-xs font-bold mt-5">Cálculo do imposto</p>
          <div className="grid grid-cols-3 gap-2 w-11/12">
            {/* <InputNumber
              label="Base ICMS"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorBaseIcms}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorBaseIcms: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            /> */}
            <InputNumber
              label="Valor ICMS"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorIcms}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorIcms: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            {/* <InputNumber
              label="Base Substituição"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorBaseSubTributa}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorBaseSubTributa: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            /> */}
            <InputNumber
              label="Valor Substituição"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorSubTributa}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorSubTributa: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            <InputNumber
              label="Valor IPI"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorIpi}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorIpi: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            <InputNumber
              label="Valor COFINS"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorCofins}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorCofins: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            <InputNumber
              label="Frete"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorFrete}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorFrete: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
            <InputNumber
              label="Desconto"
              separadorDecimal=","
              casaDecimal={2}
              separadorMilhar="."
              prefixo=""
              fixedZeroFinal
              value={notaSelect.valorDesc}
              onChange={(e) =>
                setNotaSelect({
                  ...notaSelect,
                  valorDesc: Number(e.target.value),
                })
              }
              readOnly={props.tipo === 1 ? true : false}
            />
          </div>
        </div>
        <div className="right" style={{ width: "70%" }}>
          <div className="h-10 flex ">
            <div className="w-6/12">
              {/* <InputSearch onChange={(e) => search(e.currentTarget.value)} /> */}
            </div>
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
              onSelectionChanged={(e) =>
                setProdutoSelect({ ...e.currentSelectedRowKeys[0] })
              }
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
          <div className="text-left grid grid-cols-6 gap-2 mt-2">
            <div className="w-24 text-xs font-bold ">
              <p>Quantidade</p>
              <CountUp
                end={dataSourceCopy.length}
                prefix=""
                separator=""
                decimal=""
                decimals={0}
              />
            </div>
            <div className="w-24 text-xs font-bold">
              <p>Total produtos</p>
              <CountUp
                end={notaSelect.valorTotalNota}
                prefix="R$ "
                separator="."
                decimal=","
                decimals={2}
              />
            </div>
            <div className="w-24 text-xs font-bold ">
              <p>Total Nota fiscal</p>
              <CountUp
                end={notaSelect.valorTotalNotaLiquido}
                prefix="R$ "
                separator="."
                decimal=","
                decimals={2}
              />
            </div>
            <div className="col-span-3 text-xs font-bold bg-gray-400 text-center rounded">
              <p className="text-red-700">ATENÇÃO</p>
              <p className="flex items-center justify-center">
                <div className="bg-red-700 h-2 w-2 mr-2"></div>Items em vermelho
                não estão cadastrados ou sincronizados
              </p>
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
