import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    padding: 1rem;
    color:red !important;
    overflow-y:scroll;
    max-height: calc(100vh - 60px);
    

    #treeview .dx-treeview-item{
        color:${color=> color.theme.colors.white};
        font-size: 14px;
        font-weight:bold;
        margin-left: 5px;
        margin-top: 0.5rem;
    }

    #treeview .dx-treeview-item .dx-state-hover li{
        color:${color=> color.theme.colors.dns_error};
        background-color: red !important;
    } 
    

    #treeview .dx-treeview-toggle-item-visibility.dx-treeview-toggle-item-visibility-opened{
        color:${color=> color.theme.colors.white};
    }
    #treeview .dx-treeview-toggle-item-visibility::before{
        color:${color=> (color.title ==='dark'? color.theme.colors.white : color.theme.colors.primary )};
        font-size: 30px;
        left:11rem;
        /* display: none; */
       
    } 

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const MenuItem  = styled.div`

    //adicionar stylos
    display: flex;
    align-items: center;
    cursor: pointer;

    .btn-menu{
        cursor: pointer;
        color: ${color => color.theme.colors.primary};
        font-size: 28px;
        border:0 ;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

