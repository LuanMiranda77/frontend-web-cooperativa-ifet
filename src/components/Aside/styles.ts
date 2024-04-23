import styled from "styled-components";

export const Container  = styled.div`
    //adicionar stylos
    grid-area: AS;
    background-color:${props => props.theme.colors.tertiary};
    border-right: 1px solid ${props => props.theme.colors.gray};
    transition: grid-template-columns 0.9ms;
    height: calc(100vh - 50px);

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const Header = styled.header`
    display: flex;
    align-items:center;
    justify-content:center;
    height:50px;
`;

export const MenuContainer = styled.nav`
    /* margin-top:1px; */
    padding: 0.5rem;
    height: 100%;
    cursor: pointer;

    .btn-menu{
        color: ${color => color.theme.title==='dark' ? 
        color.theme.colors.textLabel: color.theme.colors.primary
        };
        font-size: 45px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        margin-left:3px ;
        transition: all 0.5s;
        transform: translateY(0px);
        & :hover{
            transform: translateY(-2px);
        }
    }
`;
