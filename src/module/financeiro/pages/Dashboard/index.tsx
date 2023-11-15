import { useContext } from "react";
import CountUp from "react-countup";
import {
  FaCreditCard,
  FaDollarSign,
  FaFunnelDollar,
  FaIdCard,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { ThemeContext } from "styled-components";
import {
  BarraChart,
  ButtonIcon,
  InputDate,
  LinhaChart,
  PizzaChart,
  SummaryCustom,
  SummaryDefault,
} from "../../../../components";
import { UtilsGeral } from "../../../../utils/utils_geral";

import { Container } from "./styles";

/**
 *@Author
 *@Issue
 */

function Dashboard() {
  const theme = useContext(ThemeContext);

  const cardFaturamentoTotal = (
    <div className="p-2">
      <header className="w-full">
        <p className="lg:text-4xl title-responsive">
          Faturamento Total {UtilsGeral.getEmoji(0)}
        </p>
        <p className="subtitle-responsive">
          Fique de olho na sua empresa! {UtilsGeral.getEmoji(2)}
        </p>
      </header>
      <div className="h-full text-right">
        <div>
          <p className="subtitle-responsive">Total geral</p>
          <div
            id="total-geral"
            className="w-full "
            style={{ color: theme.colors.success }}
          >
            <CountUp
              className="font-bold lg:text-4xl"
              end={205500.36}
              prefix="R$ "
              separator="."
              decimal=","
              decimals={2}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="h-full text-right">
        <div>
          <p className="subtitle-responsive">Total de taxa</p>
          <div
            id="total-taxa"
            className="w-full"
            style={{ color: theme.colors.warning }}
          >
            <CountUp
              className="font-bold lg:text-2xl"
              end={5500.36}
              prefix="+ R$ "
              separator="."
              decimal=","
              decimals={2}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="h-full text-right">
        <div>
          <p className="subtitle-responsive">Total de desconto</p>
          <div
            id="total-desconto"
            className="w-full"
            style={{ color: theme.colors.error }}
          >
            <CountUp
              className="font-bold lg:text-2xl"
              end={1100.0}
              prefix="- R$ "
              separator="."
              decimal=","
              decimals={2}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="h-full">
        <div>
          <p className="font-bold">Total Líquido</p>
          <div
            id="total-liquido"
            className="w-full text-right"
            style={{ color: theme.colors.info }}
          >
            <CountUp
              className="font-bold lg:text-4xl"
              end={209000.0}
              prefix="R$ "
              separator="."
              decimal=","
              decimals={2}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const cardProdutoMaisVendido = (
    <BarraChart
      isLegend={false}
      label="Top 10 dos produtos mais vendidos"
      colorBar1={theme.colors.info}
      tipo1="Venda"
      data={[
        { name: "casa", value1: 1900, value2: 1000 },
        { name: "costela", value1: 1100, value2: 2000 },
        { name: "cupuaço", value1: 1500, value2: 500 },
        { name: "refire", value1: 2200, value2: 2200 },
        { name: "picanha", value1: 1900, value2: 2200 },
        { name: "casa", value1: 1900, value2: 1000 },
        { name: "costela", value1: 1100, value2: 2000 },
        { name: "cupuaço", value1: 1500, value2: 500 },
        { name: "refire", value1: 2200, value2: 2200 },
        { name: "picanha", value1: 1900, value2: 2200 },
        // { name: 'fev', value2: 35, propriedade: 'value2', colorLine: 'blue', tipo:'entrada' }
      ]}
    />
  );

  const cardFaturamentoMes = (
    <LinhaChart
      isLegend={true}
      label="Faturamento Mensal Compra x Venda"
      colorLine1={theme.colors.primary}
      colorLine2={theme.colors.error}
      tipo1="Venda"
      tipo2="Comprar"
      data={[
        { name: "jan", value1: 30000.0, value2: 15000.6 },
        { name: "fev", value1: 45780.65, value2: 20000.6 },
        { name: "mar", value1: 15780.65, value2: 35000.6 },
        { name: "abr", value1: 5780.65, value2: 45000.6 },
        { name: "mar", value1: 12780.65, value2: 25000.6 },
        { name: "jun", value1: 18780.65, value2: 5000.6 },
        { name: "jul", value1: 19780.65, value2: 85000.6 },
        { name: "ago", value1: 25780.65, value2: 75000.6 },
        { name: "set", value1: 90780.65, value2: 95000.6 },
        { name: "out", value1: 10780.65, value2: 5000.6 },
        { name: "nov", value1: 15780.65, value2: 25000.6 },
        { name: "dez", value1: 15780.65, value2: 22000 },

        // { name: 'fev', value2: 35, propriedade: 'value2', colorLine: 'blue', tipo:'entrada' }
      ]}
    />
  );

  const cardFaturamentoAno = (
    <BarraChart
      isLegend={true}
      label="Faturamento anual dos ultimos 5 anos Compra x Venda "
      colorBar1={theme.colors.primary}
      colorBar2={theme.colors.error}
      tipo1="Venda"
      tipo2="Comprar"
      data={[
        { name: "2016", value1: 1900, value2: 1000 },
        { name: "2017", value1: 1100, value2: 2000 },
        { name: "2018", value1: 1500, value2: 500 },
        { name: "2019", value1: 2200, value2: 2200 },
        { name: "2020", value1: 1900, value2: 2200 },
        // { name: 'fev', value2: 35, propriedade: 'value2', colorLine: 'blue', tipo:'entrada' }
      ]}
    />
  );

  const cardPizza = (
    <PizzaChart
      label="Gráfico das vendas"
      data={[
        {
          name: "Dinheiro",
          percent: 15,
          color: theme.colors.success,
        },
        {
          name: "Cartão crédito",
          percent: 45,
          color: theme.colors.warning,
        },
        {
          name: "Cartão débito",
          percent: 45,
          color: theme.colors.info,
        },
        {
          name: "Vale",
          percent: 15,
          color: theme.colors.error,
        },
      ]}
    />
  );

  return (
    <Container>
      <div
        className="p-3"
        style={{
          backgroundColor:
            theme.title === "dark" ? theme.colors.tertiary : theme.colors.background,
          borderRadius: "8px",
        }}
      >
        <div className="card-local shadow-lg w-full ali grid justify-items-end lg:flex lg:justify-end mb-5 p-2">
          <InputDate
            className="w-full lg:mr-5 lg:w-40"
            label="Data inicio"
          />
          <InputDate className="w-full lg:mr-5 lg:w-40" label="Data final" />
          <div className="w-32 mt-3">
            <ButtonIcon
              className=""
              icon={<FaFunnelDollar />}
              label="Filtrar"
              width="80%"
              background={theme.colors.primary}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 gap-2 mb-5">
          <SummaryDefault
            label="Dinheiro"
            montante={180}
            icon={
              <FaDollarSign
                style={{ fontSize: "30px", color: theme.colors.success }}
              />
            }
            colorBorder={theme.colors.success}
           
          />
          <SummaryDefault
            label="Cartão Crédito"
            montante={180}
            icon={
              <FaCreditCard
                style={{ fontSize: "30px", color: theme.colors.warning }}
              />
            }
            colorBorder={theme.colors.warning}
           
          />
          <SummaryDefault
            label="Cartão Débito"
            montante={180}
            icon={
              <FaMoneyCheckAlt
                style={{ fontSize: "30px", color: theme.colors.info }}
              />
            }
            colorBorder={theme.colors.info}
           
          />
          <SummaryDefault
            label="Vale"
            montante={180}
            icon={
              <FaIdCard
                style={{ fontSize: "30px", color: theme.colors.error }}
              />
            }
            colorBorder={theme.colors.error}
           
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-2 h-max lg:grid-cols-3 gap-2 lg:h-max h-96 mb-5">
          <SummaryCustom
            className="mb-2 lg:mb-0 h-80 lg:col-start-1 lg:col-span-2 "
            id="total-dinheiro"
            children={cardFaturamentoTotal}
            colorBorder={theme.colors.primary}
           
            
          />
          <SummaryCustom
            className="h-80"
            id="total-dinheiro"
            children={cardPizza}
            colorBorder={theme.colors.primary}
           
          />
        </div>
        <SummaryCustom
          className="h-72 mb-5"
          id="total-dinheiro"
          children={cardProdutoMaisVendido}
          colorBorder={theme.colors.primary}
         
        />
        <SummaryCustom
          className="h-72 mb-5"
          id="total-dinheiro"
          children={cardFaturamentoMes}
          colorBorder={theme.colors.primary}
         
        />
        <SummaryCustom
          className="h-72 mb-5"
          id="total-dinheiro"
          children={cardFaturamentoAno}
          colorBorder={theme.colors.primary}
         
        />
      </div>
    </Container>
  );
}
export default Dashboard;
