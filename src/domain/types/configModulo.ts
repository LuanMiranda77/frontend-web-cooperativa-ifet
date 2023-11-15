
export type ConfigModuloType = {
    // geral
    orcamento: "S" | "N",
    pedido: "S" | "N",
    filial: "S" | "N",
    prevenda:"S" | "N",

    // modo fiscal
    nfe:"S" | "N",
    nfce: "S" | "N",
    mdfe:"S" | "N",
    sat: "S" | "N",
    mde: "S" | "N",

    // modo financeiro
    contas:"S" | "N",
    planoContas:"S" | "N",
    controleCaixa:"S" | "N",

    // modo estoque
    transferenciaEstoque:"S" | "N",

    // integrações
    balanca:"S" | "N",

    numCasaDecimais: number,
}