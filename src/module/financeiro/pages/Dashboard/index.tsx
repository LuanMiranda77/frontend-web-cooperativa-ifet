import { useContext } from "react";
import { FaCreditCard, FaDollarSign, FaFunnelDollar, FaMoneyCheckAlt } from "react-icons/fa";
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

import moment from "moment";
import { FaPix } from "react-icons/fa6";
import useDashboard from "../../../../hooks/useDashboard";
import FaturamentoTotal from "./components/faturamentoTotal";
import { Container } from "./styles";

function Dashboard() {
  const theme = useContext(ThemeContext);
  const { filter, setFilter, onfilterExecute, dashboard } = useDashboard();

  const cardProdutoMaisVendido = (
    <BarraChart
      isLegend={false}
      label="Top 10 dos produtos mais vendidos"
      colorBar1={theme.colors.info}
      tipo1="Venda"
      data={dashboard.arrayProductTop10}
    />
  );

  const cardFaturamentoMes = (
    <LinhaChart
      isLegend={true}
      label="Faturamento Mensal"
      colorLine1={theme.colors.primary}
      colorLine2={theme.colors.error}
      tipo1="Venda"
      // tipo2="Comprar"
      data={dashboard.arrayFaturamentoMensal}
    />
  );

  const cardFaturamentoAno = (
    <BarraChart
      isLegend={true}
      label="Faturamento anual dos ultimos 5 anos"
      colorBar1={theme.colors.primary}
      colorBar2={theme.colors.error}
      tipo1="Venda"
      // tipo2="Comprar"
      data={dashboard.arrayFaturamentoAnual}
    />
  );

  const cardPizza = (
    <PizzaChart
      label="Gráfico das vendas"
      data={[
        {
          name: "Dinheiro",
          percent: (dashboard.arrayFormasPagamentos[0] / dashboard.totalLiquido) * 100,
          color: theme.colors.success,
        },
        {
          name: "Cartão crédito",
          percent: (dashboard.arrayFormasPagamentos[3] / dashboard.totalLiquido) * 100,
          color: theme.colors.warning,
        },
        {
          name: "Cartão débito",
          percent: (dashboard.arrayFormasPagamentos[2] / dashboard.totalLiquido) * 100,
          color: theme.colors.info,
        },
        {
          name: "Pix",
          percent: (dashboard.arrayFormasPagamentos[1] / dashboard.totalLiquido) * 100,
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
          backgroundColor: theme.title === "dark" ? theme.colors.tertiary : theme.colors.background,
          borderRadius: "8px",
        }}
      >
        <div className="card-local shadow-lg w-full ali grid justify-items-end lg:flex lg:justify-end mb-5 p-2">
          <InputDate
            className="w-full lg:mr-5 lg:w-40"
            label="Data inicio"
            value={moment(filter.dtIni).format("YYYY-MM-DD")}
            onChange={(e) => setFilter({ ...filter, dtIni: moment(e.target.value).startOf("days").toDate() })}
          />
          <InputDate
            className="w-full lg:mr-5 lg:w-40"
            label="Data final"
            value={moment(filter.dtFin).format("YYYY-MM-DD")}
            onChange={(e) => setFilter({ ...filter, dtFin: moment(e.target.value).endOf("days").toDate() })}
          />
          <div className="w-32 mt-3">
            <ButtonIcon
              className=""
              icon={<FaFunnelDollar />}
              label="Filtrar"
              width="80%"
              background={theme.colors.primary}
              onClick={onfilterExecute}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 gap-2 mb-5">
          <SummaryDefault
            label="Dinheiro"
            montante={dashboard.totalDinheiro}
            icon={<FaDollarSign style={{ fontSize: "30px", color: theme.colors.success }} />}
            colorBorder={theme.colors.success}
          />
          <SummaryDefault
            label="Cartão Crédito"
            montante={dashboard.totalCardCredito}
            icon={<FaCreditCard style={{ fontSize: "30px", color: theme.colors.warning }} />}
            colorBorder={theme.colors.warning}
          />
          <SummaryDefault
            label="Cartão Débito"
            montante={dashboard.totalCardDebito}
            icon={<FaMoneyCheckAlt style={{ fontSize: "30px", color: theme.colors.info }} />}
            colorBorder={theme.colors.info}
          />
          <SummaryDefault
            label="PIX"
            montante={dashboard.totalPix}
            icon={<FaPix style={{ fontSize: "30px", color: theme.colors.error }} />}
            colorBorder={theme.colors.error}
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-2 h-max lg:grid-cols-3 gap-2 lg:h-max h-96 mb-5">
          <SummaryCustom
            className="mb-2 lg:mb-0 h-80 lg:col-start-1 lg:col-span-2 "
            id="total-dinheiro"
            children={<FaturamentoTotal colors={theme.colors} dashboard={dashboard} />}
            colorBorder={theme.colors.primary}
          />
          <SummaryCustom className="h-80" id="total-dinheiro" children={cardPizza} colorBorder={theme.colors.primary} />
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
