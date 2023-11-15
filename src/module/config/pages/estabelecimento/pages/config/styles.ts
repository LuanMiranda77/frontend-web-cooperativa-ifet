import styled from "styled-components";

export const MenuContainer  = styled.div`

    //adicionar stylos
    padding: 1rem;
    color:red !important;
    /* overflow-y:scroll; */
    max-height: calc(100vh - 220px);
    

    #treeview .dx-treeview-item{
        color:${color=> color.theme.colors.tertiary};
        font-size: 15px;
        font-weight:bold;
        margin-left: 0px;
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