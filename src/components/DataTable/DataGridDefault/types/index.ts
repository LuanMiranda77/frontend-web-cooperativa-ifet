import { string } from "prop-types"

export type ColumnsDataGridType  = {
    dataField:string;
    caption: string;
    dataType: string | 'string';
    format?: string | Object ;
    alignment?:string;
    allowGrouping?: boolean;
    allowSearch?:boolean;
    cssClass?:string;
    width?:number ;
    visible?:boolean;
    styleCell?:(e:any)=>React.ReactNode;
    defaultSortOrder?:'asc' | 'desc';
}