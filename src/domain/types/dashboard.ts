export type DashBoardType = {
  ticketMedio: number;
  totalPedidoFinalizado: number;
  totalPedidoCancelado: number;
  totalGeralMes: number;
  totalGeralMesPassado: number;
  totalCardDebito: number;
  totalCardCredito: number;
  totalPix: number;
  totalBoleto: number;
  totalDinheiro: number;
  totalDesconto: number;
  totalLiquido: number;
  totalBruto: number;
  arrayVendaPorHoras: Array<number>;
  arrayFormasPagamentos: Array<number>;
  arrayFaturamentoAnual: Array<any>;
  arrayFaturamentoMensal: Array<any>;
  arrayProductTop10: Array<any>;
};

export const initialDash: DashBoardType = {
  ticketMedio: 0,
  totalPedidoFinalizado: 0,
  totalPedidoCancelado: 0,
  totalGeralMes: 0,
  totalGeralMesPassado: 0,
  totalCardDebito: 0,
  totalCardCredito: 0,
  totalPix: 0,
  totalBoleto: 0,
  totalDinheiro: 0,
  totalDesconto: 0,
  totalLiquido: 0,
  totalBruto: 0,
  arrayVendaPorHoras: [],
  arrayFormasPagamentos: [],
  arrayFaturamentoAnual: [],
  arrayFaturamentoMensal: [],
  arrayProductTop10: [],
};
