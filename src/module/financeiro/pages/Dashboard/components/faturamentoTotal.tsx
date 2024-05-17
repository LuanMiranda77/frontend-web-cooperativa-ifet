import React from "react";
import CountUp from "react-countup";
import { DashBoardType } from "../../../../../domain";
import { UtilsGeral } from "../../../../../utils/utils_geral";
interface Props {
  colors: any;
  dashboard: DashBoardType;
}

const FaturamentoTotal: React.FC<Props> = ({ ...props }) => {
  const { dashboard } = props;
  return (
    <div className="p-2">
      <header className="w-full">
        <p className="lg:text-4xl title-responsive">Faturamento Total {UtilsGeral.getEmoji(0)}</p>
        <p className="subtitle-responsive">Fique de olho na sua empresa! {UtilsGeral.getEmoji(2)}</p>
      </header>
      <div className="h-full text-right">
        <div>
          <p className="subtitle-responsive">Total geral</p>
          <div id="total-geral" className="w-full " style={{ color: props.colors.success }}>
            <CountUp
              className="font-bold lg:text-4xl"
              end={dashboard.totalBruto}
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
          <p className="subtitle-responsive">TicketMedio</p>
          <div id="total-taxa" className="w-full" style={{ color: props.colors.warning }}>
            <CountUp
              className="font-bold lg:text-2xl"
              end={dashboard.ticketMedio}
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
          <div id="total-desconto" className="w-full" style={{ color: props.colors.error }}>
            <CountUp
              className="font-bold lg:text-2xl"
              end={dashboard.totalDesconto}
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
          <div id="total-liquido" className="w-full text-right" style={{ color: props.colors.info }}>
            <CountUp
              className="font-bold lg:text-4xl"
              end={dashboard.totalLiquido}
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
};

export default FaturamentoTotal;
