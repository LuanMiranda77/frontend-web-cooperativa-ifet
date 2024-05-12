import { Card, Dialog, StepIconProps } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { ButtonBase, InputNumber, InputSelectDefault, ModalDefault } from "../../../components";
import { CreateAsyncSelect } from "../../../components/Inputs/CreateAsyncSelect";
import TabContent from "../../../components/TabContent";
import TitleDivider from "../../../components/TitleDivider";
import { unidadeMedidas } from "../../../constants/constMedidas";
import { EstabelecimentoType } from "../../../domain";
import { Cargo, EnumStatusProcess } from "../../../domain/enums";
import { FeedstockType, initialFeedstock } from "../../../domain/types/feedstock";
import { ProcessType } from "../../../domain/types/processType";
import { ProductType, initialProduct } from "../../../domain/types/productType";
import { selectStateEstabelecimentos } from "../../../store/slices/estabelecimentos.slice";
import { selectStateUser } from "../../../store/slices/usuario.slice";
import { UtilsConvert } from "../../../utils/utils_convert";
import ListProductConf from "./lista";
import "./style.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  feedstock: FeedstockType;
  setFeedstock: Function;
  product: ProductType;
  setProduct: Function;
  products: Array<ProductType>;
  setProducts: Function;
  loadFeedstockName: any;
  loadProductName: Function;
  addProductDerivado: Function;
  optionsFeed: Array<any>;
  optionsProducts: Array<any>;
  setOptionsFeed: Function;
  setOptionsProducts: Function;
  saveProcess: Function;
  process: ProcessType;
  setProcess: Function;
}
const ModalProcess: React.FC<Props> = (props) => {
  const steps = ["Materia prima", "Produtos derivado", "Conferência"];
  const [activeStep, setActiveStep] = useState(0);
  const { title, colors } = useContext(ThemeContext);
  const actualUser = useSelector(selectStateUser);
  const setores = useSelector(selectStateEstabelecimentos);
  const [optionSetores, setOptionSetores] = useState<any[]>([]);
  const [optionFeeds, setOptionFedds] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const alterStep = (type: number) => {
    if (type === 1) {
      if (activeStep < 1) {
        if (props.process.setor === 0) {
          return toast.error("O campo setor é obrigatório");
        } else if (!Boolean(props.feedstock.name)) {
          return toast.error("Campo da materia prima está vazio");
        } else if (!Boolean(props.feedstock.measure)) {
          return toast.error("Medida vazia");
        } else if (props.feedstock.balance === 0) {
          return toast.error("Peso/Litro não pode ser zero");
        }

        setActiveStep(activeStep + 1);
      } else {
        if (activeStep < 2 && props.products.length > 0) {
          actualUser.cargo !== Cargo.CAPITADOR && setActiveStep(activeStep + 1);
          props.saveProcess(EnumStatusProcess.CAPITACAO);
        } else {
          toast.error("Adicione um ou mais produto derivado!");
        }
      }
    } else {
      activeStep >= 1 ? setActiveStep(activeStep - 1) : setActiveStep(0);
    }
  };

  const saveRascunho = () => {
    props.saveProcess(EnumStatusProcess.RASCUNHO);
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: colors.primary,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: colors.primary,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#A1A1A1",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: colors.white,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: colors.white,
      zIndex: 1,
      fontSize: 18,
      background: colors.primary,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      // backgroundColor: "currentColor"
      background: colors.primary,
    },
  }));

  function QontoStepIcon(props: StepIconProps, index: number) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <div className="rounded-full w-6 h-6 flex items-center justify-center" style={{ background: colors.primary }}>
            {index + 1}
          </div>
        ) : (
          <div
            className="rounded-full w-6 h-6 flex items-center justify-center"
            style={{ border: "2px solid " + colors.primary }}
          >
            {index + 1}
          </div>
        )}
      </QontoStepIconRoot>
    );
  }

  useEffect(() => {
    let list = setores.map((item: EstabelecimentoType) => {
      return { label: item.name, value: item.id };
    });

    setOptionSetores(list);
    props.process.status === EnumStatusProcess.CAPITACAO ? setActiveStep(2) : setActiveStep(0);
  }, [props.isOpen]);

  useEffect(() => {
    const options = props.optionsFeed.filter((e: any) => e.setor?.id == props.process.setor);
    setOptionFedds(options);
  }, [props.process.setor]);

  return (
    <Dialog
      className="m-9 rounded-t-xl"
      open={props.isOpen}
      // onClose={props.onRequestClose}
      fullScreen={true}
      style={{ background: "transparent" }}
    >
      <div className="rounded-t-xl">
        <Box
          className="p-10 rounded-t-xl"
          sx={{
            width: "100%",
            background: "#2C2C2C",
            height: "129px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel sx={{ color: "red" }} StepIconComponent={(e) => QontoStepIcon(e, index)}>
                  <span style={{ color: colors.white }}>{label}</span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Card className="w-full" sx={{ height: "calc(100vh - 201px)" }}>
          <TabContent index={0} value={activeStep}>
            <div className="w-full p-8">
              <div className="w-4/12 mb-5 mt-0">
                <InputSelectDefault
                  label="Setor"
                  options={optionSetores}
                  name="setor"
                  isSearchable={false}
                  placeholder="Selecione..."
                  value={optionSetores.find((e: any) => e.value === props.process.setor)}
                  onChange={(e) => props.setProcess({ ...props.process, setor: e.value })}
                  required
                />
              </div>
              <TitleDivider className="pt-10 " title="Dados da matéria prima" />
              <div className="flex mt-10">
                <CreateAsyncSelect
                  label="Materia Prima"
                  className={"input font-14-responsive mt-1 w-6/12"}
                  loadOptions={props.optionsFeed.filter((e: any) => e.setor === props.process.setor)}
                  placeholder="Pesquisar..."
                  onChangeCreate={(e) => {
                    const obj = { ...props.feedstock, name: e };
                    const option = { value: 0, label: obj.name, ...obj };
                    props.setOptionsFeed([...props.optionsFeed, option]);
                    props.setFeedstock(option);
                  }}
                  noOptionsMessage="Selecione um setor primeiro."
                  isClearable
                  onChange={(e) => {
                    if (e == null) {
                      props.setFeedstock(initialFeedstock);
                    } else {
                      const obj = {
                        id: e.value,
                        name: e.label,
                        ...e,
                      } as FeedstockType;
                      props.setFeedstock(obj);
                    }
                  }}
                  value={props.feedstock}
                  required
                />
                <InputSelectDefault
                  className="w-3/12 mr-5"
                  label="Medida"
                  options={unidadeMedidas}
                  name="setor"
                  height={24}
                  isSearchable={false}
                  placeholder="Selecione..."
                  required
                  value={unidadeMedidas.find((e) => e.label === props.feedstock.measure)}
                  onChange={(e) => props.setFeedstock({ ...props.feedstock, measure: e.value })}
                />
                <InputNumber
                  label="Peso/Litro"
                  casaDecimal={3}
                  separadorDecimal=","
                  prefixo=""
                  placeholder="0,000"
                  value={props.feedstock.balance}
                  fixedZeroFinal
                  onChange={(e) => props.setFeedstock({ ...props.feedstock, balance: Number(e.target.value.replaceAll(',', '.')) })}
                />
              </div>
            </div>
          </TabContent>

          <TabContent index={1} value={activeStep}>
            <div className="w-full p-8">
              <TitleDivider className="pb-5" title="Produtos derivados" />
              <div className="flex mt-5">
                <CreateAsyncSelect
                  label="Pesquise o produto"
                  className={"input font-14-responsive w-5/12"}
                  loadOptions={props.optionsProducts}
                  placeholder="Pesquisar..."
                  isClearable
                  onChangeCreate={(e) => {
                    const obj = { ...props.product, name: e };
                    const option = { value: 0, label: obj.name, ...obj };
                    props.setOptionsProducts([...props.optionsProducts, option]);
                    props.setProduct(option);
                  }}
                  onChange={(e) => {
                    if (e == null) {
                      props.setProduct(initialProduct);
                    } else {
                      const obj = {
                        id: e.value,
                        name: e.label,
                        ...e,
                      } as ProductType;
                      props.setProduct(obj);
                    }
                  }}
                  value={props.product}
                />
                <InputSelectDefault
                  className="w-3/12 mr-5"
                  label="Medida"
                  options={unidadeMedidas}
                  name="setor"
                  height={24}
                  isSearchable={false}
                  placeholder="Selecione..."
                  required
                  value={unidadeMedidas.find((e) => e.value === props.product.measure)}
                  onChange={(e) => props.setProduct({ ...props.product, measure: e.value })}
                />
                <InputNumber
                  label="Peso/Litro"
                  casaDecimal={3}
                  separadorDecimal=","
                  prefixo=""
                  placeholder="0,000"
                  value={props.product.balance}
                  fixedZeroFinal
                  onChange={(e) => props.setProduct({ ...props.product, balance: Number(e.target.value.replaceAll(',', '.')) })}
                />
                <ButtonBase
                  label="Adicionar"
                  model="btn_base"
                  className="primary-color ml-4 mt-1 w-32"
                  size="large"
                  onClick={() => props.addProductDerivado()}
                />
              </div>
              <TitleDivider className="pb-2 pt-5" title={`Lista de produtos (${props.products.length})`} />
              <ListProductConf
                setProduct={props.setProduct}
                product={props.product}
                products={props.products}
                setProducts={props.setProducts}
                type="pd"
                height="450px"
                process={props.process}
              />
            </div>
          </TabContent>

          <TabContent index={2} value={activeStep}>
            <div className="w-full p-8">
              <TitleDivider className="pb-5" title="Material prima" />
              <div className="flex justify-around">
                <span>
                  <b>Nome:</b> {props.feedstock.name}
                </span>
                <span>
                  <b>Medida:</b> {props.feedstock.measure}
                </span>
                <span>
                  <b>Quantidade:</b> {UtilsConvert.NumberToDecimal(props.feedstock.balance)}
                </span>
              </div>
              <TitleDivider className="pb-5" title="Lista de produtos" />
              <ListProductConf
                setProduct={props.setProduct}
                product={props.product}
                products={props.products}
                setProducts={props.setProducts}
                height="420px"
                type="cf"
                process={props.process}
              />
            </div>
          </TabContent>

          <div className="absolute bottom-0 flex w-full justify-center pb-5">
            {activeStep === 2 && (
              <ButtonBase
                label={"Cancelar"}
                model="btn_line"
                className="primary-color mr-5  w-32"
                size="large"
                onClick={() => props.onRequestClose()}
              />
            )}
            {activeStep < 2 && (
              <ButtonBase
                label={activeStep === 0 ? "Cancelar" : "Voltar"}
                model="btn_line"
                className="primary-color mr-5  w-32"
                size="large"
                onClick={() => (activeStep === 0 ? props.onRequestClose() : alterStep(0))}
              />
            )}
            {activeStep === 1 && props.process.status === EnumStatusProcess.RASCUNHO && (
              <ButtonBase
                label={"Salvar Rascunho"}
                model="btn_line"
                className="primary-color mr-5  w-34 px-1"
                size="large"
                onClick={saveRascunho}
              />
            )}
            {activeStep === 2 && (
              <ButtonBase
                label={"Pendenciar Conferência"}
                model="btn_line"
                className="primary-color mr-5  w-34 px-1"
                size="large"
                onClick={() => props.saveProcess(EnumStatusProcess.PENDENCIA)}
              />
            )}
            <ButtonBase
              label={activeStep == 0 ? "Sequinte" : activeStep == 1 ? "Finalizar Capitação" : "Finalizar Conferência"}
              model="btn_base"
              className="primary-color mr-5  w-34 px-1"
              size="large"
              onClick={() => (activeStep === 2 ? setShow(true) : alterStep(1))}
            />
          </div>
        </Card>
      </div>
      {show && (
        <ModalDefault
          onClickAction={() => {
            props.saveProcess(EnumStatusProcess.FINALIZADO);
            setShow(false);
          }}
          isOpen={show}
          title="Confirme"
          onRequestClose={() => setShow(false)}
        >
          <span>Tem certeza que deseja finalizar a conferencia</span>
          <p className="text-red-700 text-center font-bold">O processo não poderar ser desfeito!</p>
        </ModalDefault>
      )}
    </Dialog>
  );
};
export default ModalProcess;
