import DataGrid, { GroupPanel, IColumnProps, Pager, Paging } from "devextreme-react/data-grid";
import { Selection } from "devextreme-react/tree-list";
import React, { useState } from "react";
import { InputSearch } from "../../Inputs/InputSearch";
import { Container, Header } from "./styles";

interface DataGridDefaultProps {
  //adicionar os props
  dataSource: Object[];
  columns?: IColumnProps[];
  showBorders?: boolean;
  showRowLines?: boolean;
  defaultPageSize?: number;
  pageSizes?: number[];
  isSearch?: boolean;
  isGroupPanel?: boolean;
  allowSorting?: boolean;
  columnGroup?: boolean;
  paginar?: boolean;
  isSelectRow?: boolean;
  cssSearch?: string;
  hoverStateEnabled?: boolean;
  rowAlternationEnabled?: boolean;
  showColumnLines?: boolean;
  moduloSeletion?: "single" | "multiple";
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
  onRowClick?: (element: any) => void;
  onSelectionChanged?: (element: any) => void;
  onRowDblClick?: (element: any) => void;
  onCellPrepared?: (element: any) => void;
  onInitialized?: (element: any) => void;
  onInitNewRow?: (element: any) => void;
  onEditorPrepared?: (element: any) => void;
  height?: string;

  // styleCellColumn?: (data: any)=> React.ReactNode;
}

export const DataGridDefault: React.FC<DataGridDefaultProps> = (props) => {
  // Specifying a currency globally
  const [gridInstance, setGridInstance] = useState<any>();
  const onSearch = (text: string) => {
    gridInstance?.option("searchPanel", { visible: false, text: text });
  };
  return (
    <Container style={{ height: props.height ? props.height : "100%" }}>
      {props.isSearch && (
        <Header className="flex bg-white justify-between items-center p-2">
          <div className={props.cssSearch}>
            <InputSearch onChange={(e) => onSearch(e.currentTarget.value)} autoFocus />
          </div>
          {props.headerChildren}
        </Header>
      )}

      <DataGrid
        id="gridContainer"
        dataSource={props.dataSource}
        allowColumnReordering={true}
        rowAlternationEnabled={props.rowAlternationEnabled}
        showBorders={props.showBorders}
        showRowLines={props.showRowLines}
        showColumnLines={props.showColumnLines}
        hoverStateEnabled={props.hoverStateEnabled}
        height={"100%"}
        onSelectionChanged={props.onSelectionChanged}
        onInitialized={(e) => setGridInstance(e.component)}
        onInitNewRow={props.onInitNewRow}
        onEditorPrepared={props.onEditorPrepared}
        onRowClick={props.onRowClick}
        onRowDblClick={props.onRowDblClick}
        onCellPrepared={props.onCellPrepared}
        noDataText={"Sem dados para carregar..."}
        // dateSerializationFormat='dd/MM/yyyyTHH:mm:ss'
      >
        {props.isSelectRow ? <Selection mode={props.moduloSeletion} /> : null}
        <GroupPanel visible={props.columnGroup} />
        {/* <SearchPanel visible={props.isSearch} /> */}
        {/* <Grouping autoExpandAll={true} /> */}
        {props.children}

        {/* {props.columns.map((column, key) => {
        return <Column
          key={key}
          dataField={column.dataField}
          caption={column.caption}
          dataType={column.dataType}
          format={column.format}
          alignment={column.alignment}
          allowGrouping={column.allowGrouping}
          allowSorting={props.allowSorting}
          cssClass={column.cssClass}
          width={column.width}
          cellRender={column.cellRender}
          allowSearch={column.allowSearch}
          visible={column.visible}
          sortOrder={column.defaultSortOrder}
          // groupIndex={0}
        />

      })} */}

        <Paging defaultPageSize={props.defaultPageSize} enabled={props.paginar} />
        <Pager allowedPageSizes={props.pageSizes} showPageSizeSelector={true} />
      </DataGrid>
    </Container>
  );
};
