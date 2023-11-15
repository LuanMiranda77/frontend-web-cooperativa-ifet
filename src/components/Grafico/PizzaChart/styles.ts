import styled from "styled-components";

interface ILegendProps{
    color: string;
}

export const Container  = styled.div`

    //adicionar stylos
    width:100%;
    height: 100%;

@media screen and (max-width: 40em) {
    width:100%;
    height: 100%;
}

`;
export const SideLeft  = styled.aside``;
export const LegendContainer  = styled.ul`
list-style: none;
`;
export const Legend  = styled.li<ILegendProps>`
    align-items: center;
    >div{
        background-color: ${props => props.color};
        width: 20px;
        height: 20px;
        border-radius: 5px;
    }
    text-align: center;
    
`;
export const SideRight  = styled.main``;

