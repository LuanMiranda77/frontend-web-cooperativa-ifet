import React, {useContext} from 'react';
import { Container } from './styles';
// import logo from '../../assets/logo.svg';

// import { Container } from './styles';
import {ThemeContext} from 'styled-components';

export function Notfound() {
  const theme = useContext(ThemeContext);
  return <Container>
      <div className="text-center">
        {/* <img src={logo} alt="" /> */}
        <h1 className='mb-10 text-2xl lg:text-4xl'>Erro: Pagina não encontrada</h1>
        <label className='sm:text-2xl lg:text-4xl'>😅404</label>
      </div>
  </Container>;
}


