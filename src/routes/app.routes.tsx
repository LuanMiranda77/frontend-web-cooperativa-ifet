import React, { Suspense } from "react";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
//nossos imports
import Produto from '../module/estoque/pages/Produto';
import Configuracao from '../module/config/pages/Configuracao';
import Usuario from '../module/authenticate/pages/Usuario';
import Mde from '../module/estoque/pages/Mde';
import FormEstabelecimento from '../module/config/pages/estabelecimento/pages/Form';
import ListEstabelecimentos from '../module/config/pages/estabelecimento/pages/Listagem';
import Pdv from '../module/venda/pages/Pdv';
import { Layout } from "../components/Layout";
import Dashboard from "../module/financeiro/pages/Dashboard";
import { Notfound } from "../module/Notfound";
import { EmConstrucao } from "../module/telaConstrucao";

interface Props {
  setDefaultTheme(): void;
}

const AppRoutes: React.FC<Props> = ({ setDefaultTheme }) => {
  return (
      <Layout alterTheme={setDefaultTheme}>
        <Suspense
          fallback={<div className="">Carregando....</div>}
        >
          <Routes>
            <Route path="/" />
            {/* nossas rotas */}
            <Route path="/produto" element={<Produto />} />
            <Route path="/configurar" element={<Configuracao />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/mde" element={<Mde />} />
            <Route path="/estabelecimento" element={<FormEstabelecimento showModal={true} tipo={2} closeModal={()=>{}} />} />
            <Route path="/estabelecimentos" element={<ListEstabelecimentos />} />
            <Route path="/venda" element={<Pdv />} />
            <Route path="/financeiro" element={<Dashboard />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/contas" element={<EmConstrucao />} />
            <Route path="/plano-contas" element={<EmConstrucao />} />
            <Route path="/dre" element={<EmConstrucao />} />
            <Route path="/curva-abc" element={<EmConstrucao />} />
            <Route path="/estoque-critico" element={<EmConstrucao />} />
            <Route path="/sped" element={<EmConstrucao />} />
          </Routes>
        </Suspense>
      </Layout>
  );
};
export default AppRoutes;
