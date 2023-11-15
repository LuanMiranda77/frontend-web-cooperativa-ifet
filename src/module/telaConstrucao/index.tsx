import React, { useContext } from 'react';
import { Container } from './styles';
import construcao from '../../assets/construcao.gif';

// import { Container } from './styles';
import { ThemeContext } from 'styled-components';

export function EmConstrucao() {
  const theme = useContext(ThemeContext);
  return <Container>
    <div className="text-center w-full">
      <div className='flex justify-center mt-14'>
        <img src={construcao} alt="logo" />
      </div>
      {/* <h1 className='mb-10 text-2xl lg:text-4xl'>TELA EM CONSTRUÇÃO</h1> */}
      <label className='sm:text-2xl lg:text-4xl mt-2'>EM BREVE SERÁ LIBERADA</label><br /><br />
      <label className='text-4xl'>AGUARDE....</label>
    </div>
  </Container>;
}


