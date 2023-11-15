import styled from 'styled-components';

export const Container = styled.header`
  
  .espacamento{
    padding: 0.5rem;
  }
  

  .divider{
    @media (max-width: 720px){
      visibility: hidden;
      margin-top: -20px;
    }

  }


  /* para celular */
  @media (max-width: 720px){
        width:100%;
        margin: 0 auto;
        
  }
`


