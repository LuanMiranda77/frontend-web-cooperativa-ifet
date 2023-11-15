import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isAuthenticated } from '../config/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

// import { Container } from './styles';

interface Props {
  setDefaultTheme(): void;
}

const Routes: React.FC<Props> = ({ setDefaultTheme }) => {
  let logado = isAuthenticated();
  return <BrowserRouter>
    {logado ?
      <AppRoutes setDefaultTheme={setDefaultTheme} />
      :
      <AuthRoutes />
    }
  </BrowserRouter>;
}

export default Routes;