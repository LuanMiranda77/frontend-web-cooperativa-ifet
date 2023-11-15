import React, { Suspense } from "react";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
//nossos imports
import Login from "../module/authenticate/pages/Login";
import RecuperaSenha from "../module/authenticate/pages/RecuperaSenha";
import { Notfound } from "../module/Notfound";

const AuthRoutes: React.FC = () => {
  return (
      <Suspense fallback={<div className="">Carregando....</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recupera-senha" element={<RecuperaSenha/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
  );
};
export default AuthRoutes;
