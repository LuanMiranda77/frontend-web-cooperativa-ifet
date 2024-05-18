import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../config/api";
import { DashBoardType } from "../../domain";
import { initialDash } from "../../domain/types/dashboard";
type FilterDash = {
  dtIni: Date;
  dtFin: Date;
};

const initialFilter: FilterDash = {
  dtIni: moment().startOf("month").toDate(),
  dtFin: moment(new Date()).endOf("day").toDate(),
};

function useDashboard() {
  const [filter, setFilter] = useState<FilterDash>(initialFilter);
  const [dashboard, setDashboard] = useState<DashBoardType>(initialDash);
  const meses = [
    { name: "jan", value1: 0 },
    { name: "fev", value1: 0 },
    { name: "mar", value1: 0 },
    { name: "abr", value1: 0 },
    { name: "mar", value1: 0 },
    { name: "jun", value1: 0 },
    { name: "jul", value1: 0 },
    { name: "ago", value1: 0 },
    { name: "set", value1: 0 },
    { name: "out", value1: 0 },
    { name: "nov", value1: 0 },
    { name: "dez", value1: 0 },
  ];

  function onfilterExecute() {
    if (filter.dtIni > filter.dtFin) {
      return toast.warning("Data inicial não pode ser maior que a final");
    }
    api
      .get(
        `/api/pedido/dashboard-filter?dtIni=${moment(filter.dtIni).format("YYYY-MM-DD HH:mm:ss")}&dtFin=${moment(
          filter.dtFin
        ).format("YYYY-MM-DD HH:mm:ss")}`
      )
      .then((resp) => {
        meses.forEach((item, i) => (item.value1 = resp.data.arrayFaturamentoMensal[i]));
        let anoAtual = Number(moment().format("YYYY")) - 4;
        const ultimos5Anos: any[] = [];
        for (let i = 0; i < 5; i++) {
          ultimos5Anos.push({ name: anoAtual + i, value1: resp.data.arrayFaturamentoAnual[i] });
        }
        setDashboard({ ...resp.data, arrayFaturamentoMensal: meses, arrayFaturamentoAnual: ultimos5Anos });
      })
      .catch((e) => toast.error("Error:" + e));
  }

  useEffect(() => {
    onfilterExecute();
  }, []);
  return {
    filter,
    setFilter,
    onfilterExecute,
    dashboard,
  };
}

export default useDashboard;
