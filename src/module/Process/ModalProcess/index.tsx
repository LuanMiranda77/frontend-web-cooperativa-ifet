import { Card, Dialog, StepIconProps } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { ButtonBase, InputDefault, InputNumber, InputSelectDefault } from "../../../components";
import { InputAsyncSelect } from "../../../components/Inputs/InputAsyncSelect";
import TabContent from "../../../components/TabContent";
import TitleDivider from "../../../components/TitleDivider";
import { unidadeMedidas } from "../../../constants/constMedidas";
import { FeedstockType } from "../../../domain/types/feedstock";
import { ProductType } from "../../../domain/types/productType";
import { selectStateEstabelecimentos } from "../../../store/slices/estabelecimentos.slice";
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
}
const ModalProcess: React.FC<Props> = (props) => {
  const steps = ["Materia prima", "Produtos derivado", "Conferência"];
  const [activeStep, setActiveStep] = useState(0);
  const { title, colors } = useContext(ThemeContext);
  const setores = useSelector(selectStateEstabelecimentos);

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
                  options={setores.map((item) => {
                    return { label: item?.name, value: item?.id };
                  })}
                  name="setor"
                  isSearchable={false}
                  placeholder="Selecione..."
                  required
                />
              </div>
              <TitleDivider className="pb-5" title="Dados da matéria prima" />
              <InputAsyncSelect
                label="Materia Prima"
                className={"input font-14-responsive mt-1 w-5/12"}
                loadOptions={props.loadFeedstockName}
                placeholder="Pesquisar..."
                // isSearchable
                isClearable
                onChange={(e) => props.setFeedstock(e)}
                value={props.feedstock}
              />
              <div className="flex mt-10">
                <InputDefault
                  className="w-6/12 mr-5"
                  label="Nome"
                  type="text"
                  placeholder="Digite aqui"
                  value={props.feedstock.name}
                  onChange={(e) =>
                    props.setFeedstock({
                      ...props.feedstock,
                      name: e.target.value,
                    })
                  }
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
                />
                <InputNumber label="Peso/Litro" casaDecimal={3} separadorDecimal="," prefixo="" placeholder="0,000" />
              </div>
            </div>
          </TabContent>

          <TabContent index={1} value={activeStep}>
            <div className="w-full p-8">
              <TitleDivider className="pb-5" title="Produtos derivados" />
              {/* <InputAsyncSelect
                label="Pesquise o produtos"
                className={"input font-14-responsive mt-1 w-5/12"}
                loadOptions={props.loadProductName}
                placeholder="Pesquisar..."
                // isSearchable
                isClearable
                onChange={(e) => props.setFeedstock(e)}
                value={props.feedstock}
              /> */}
              <div className="flex mt-5">
                <InputAsyncSelect
                  label="Pesquise o produto"
                  className={"input font-14-responsive w-5/12"}
                  loadOptions={props.loadProductName}
                  placeholder="Pesquisar..."
                  // isSearchable
                  isClearable
                  onChange={(e) => props.setFeedstock(e)}
                  value={props.feedstock}
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
                />
                <InputNumber label="Peso/Litro" casaDecimal={3} separadorDecimal="," prefixo="" placeholder="0,000" />
                <ButtonBase
                  label="Adicionar"
                  model="btn_base"
                  className="primary-color ml-4 mt-1 w-32"
                  size="large"
                  onClick={() => setActiveStep(activeStep + 1)}
                />
              </div>
              <TitleDivider className="pb-2 pt-5" title={`Lista de produtos (${props.products.length})`} />
              <ListProductConf products={props.products} setProducts={props.setProducts} type="pd" height="450px"/>
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
              <ListProductConf products={props.products} setProducts={props.setProducts} height="420px" type="cf" />
            </div>
          </TabContent>

          <div className="absolute bottom-0 flex w-full justify-center pb-5">
            <ButtonBase
              label={activeStep === 0 ? "Cancelar" : "Voltar"}
              model="btn_line"
              className="primary-color mr-5  w-32"
              size="large"
              onClick={() => (activeStep === 0 ? props.onRequestClose() : setActiveStep(activeStep - 1))}
            />
            <ButtonBase
              label="Sequinte"
              model="btn_base"
              className="primary-color mr-5  w-32"
              size="large"
              onClick={() => setActiveStep(activeStep + 1)}
            />
          </div>
        </Card>
      </div>
    </Dialog>
  );
};
export default ModalProcess;
