/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Column } from "devextreme-react/data-grid";
import { FaPlus } from "react-icons/fa";
import {
  ButtonIcon,
  DataGridDefault,
  DialogPopupConfirme,
  InputDefault,
  InputMask,
  ModalDefault,
} from "../../../../../../components";
import { UtilsConvert } from "../../../../../../utils/utils_convert";
import { TableContainer } from "./styles";

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashSharp } from "react-icons/io5";
import useSetor from "../../../../../../hooks/useSetor";

function ListEstabelecimentos() {
  const {
    colors,
    dataSource,
    showModal,
    setor,
    showAlert,
    setAlert,
    setSetor,
    onNovo,
    onEdit,
    onSave,
    setShowModal,
    handelDelete,
  } = useSetor();

  const renderCell = (element: any) => {
    if (element.columnIndex === 1) {
      return (
        <span className="font-bold">
          {UtilsConvert.setMaskCpfCnpj(element.value)}
        </span>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <i className="text-2xl cursor-pointer  mr-5">
            <BsPencilSquare
              color={colors.primary}
              size={20}
              title="Editar"
              onClick={() => onEdit(element.data)}
            />
          </i>
          <i className="text-2xl cursor-pointer">
            <IoTrashSharp
              color={colors.error}
              size={25}
              title="Excluir"
              onClick={() => {setSetor(element.data); setAlert(true)}}
            />
          </i>
        </div>
      );
    }
  };

  return (
    <div className="card-local p-2 h-full">
      <TableContainer>
        <DataGridDefault
          isSearch
          cssSearch="w-11/12"
          headerChildren={
            <div className="w-1/12">
              <ButtonIcon
                background={colors.primary}
                label="Novo"
                icon={<FaPlus />}
                width={"100%"}
                onClick={onNovo}
              />
            </div>
          }
          dataSource={dataSource}
          allowSorting={false}
          paginar={false}
          showRowLines
          rowAlternationEnabled
          showBorders
          showColumnLines
          hoverStateEnabled
          isSelectRow
        >
          <Column
            dataField="id"
            caption="CÓDIGO"
            alignment="center"
            dataType="string"
            width={100}
            cssClass="font-bold column-1"
            sortOrder={"asc"}
          />
          <Column
            dataField="cnpj"
            caption="CPF/CNPJ"
            alignment="left"
            dataType=""
            width={150}
            cellRender={renderCell}
          />
          <Column
            dataField="name"
            caption="NOME"
            alignment="left"
            dataType="string"
            cssClass="font-bold"
          />
          <Column
            dataField=""
            caption=""
            alignment="center"
            dataType=""
            width={150}
            cellRender={renderCell}
            allowSearch={false}
          />
        </DataGridDefault>
      </TableContainer>

      <ModalDefault
        key={"modalEstab"}
        title={"Ficha Cetores"}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onClickAction={onSave}
      >
        <InputMask
          className="mb-5 w-6/12"
          label={"CNPJ"}
          mask={"99.999.999/9999-99"}
          onChange={(e) => setSetor({ ...setor, cnpj: e.target.value })}
          value={setor.cnpj}
        />
        <InputDefault
          label="Nome"
          type="text"
          onChange={(e) => setSetor({ ...setor, name: e.target.value })}
          value={setor.name}
        />
      </ModalDefault>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showAlert}
        onRequestClose={() => setAlert(false)}
        onClickSim={() => handelDelete(setor.id ? setor.id : 0)}
      >
        <div className="w-full">
          <p>Tem certeza que quer excluir?</p>
        </div>
      </DialogPopupConfirme>
    </div>
  );
}
export default ListEstabelecimentos;
