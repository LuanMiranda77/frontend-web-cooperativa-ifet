import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    height: 100%;
    width: 100%;

    .dx-datagrid .dx-header-row > td {
        color: ${color => color.theme.colors.white};
        font-weight: bold;
        background-color: ${color => color.theme.colors.primary};;
        /* border-top-right-radius: 5px;
        border-top-left-radius: 5px; */
    }
   .dx-row.dx-data-row.dx-column-lines.dx-state-hover td {  
        background:  ${color => color.theme.colors.dns_info} !important;
        /* cursor: pointer;   */
    } 
    .dx-row.dx-data-row td {  
        background:  ${color => (color.theme.title === 'dark'?color.theme.colors.secondary:color.theme.colors.tertiary)} !important;
        color: ${color => (color.theme.title === 'dark'?color.theme.colors.textLabel:color.theme.colors.textLabel)};
        /* cursor: pointer;   */
    } 

        .dx-rtl .dx-datagrid-rowsview .dx-selection.dx-row > td:not(.dx-focused).dx-datagrid-group-space,  
    .dx-rtl .dx-datagrid-rowsview .dx-selection.dx-row:hover > td:not(.dx-focused).dx-datagrid-group-space {  
        border-left-color: ${color => color.theme.colors.dns_info} !important;  
    }  

    .dx-datagrid-rowsview .dx-selection.dx-row:not(.dx-row-lines) > td,  
    .dx-datagrid-rowsview .dx-selection.dx-row:hover:not(.dx-row-lines) > td {  
        border-bottom: 1px solid ${color => color.theme.colors.dns_info} !important;  
        border-top: 1px solid ${color => color.theme.colors.dns_info} !important;  
    }  

    .dx-datagrid-rowsview .dx-selection.dx-row > td.dx-datagrid-group-space,  
    .dx-datagrid-rowsview .dx-selection.dx-row:hover > td.dx-datagrid-group-space {  
        border-right-color: ${color => color.theme.colors.dns_info} !important;  
    }  

    .dx-datagrid-rowsview .dx-selection.dx-row > td,  
    .dx-datagrid-rowsview .dx-selection.dx-row:hover > td {  
        background-color: ${color => color.theme.colors.dns_info} !important;  
        color: #232323;  
    }  

    .dx-datagrid-table .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row) > td:not(.dx-focused) {  
    background-color: ${color => color.theme.colors.dns_info} !important;  
    color: #333;  
    }  

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const Header  = styled.div`
`;

