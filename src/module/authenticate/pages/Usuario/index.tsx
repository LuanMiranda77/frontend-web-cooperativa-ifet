import { Column, IColumnProps } from "devextreme-react/data-grid";
import moment from "moment";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonIcon,
  DataGridDefault,
  DialogPopupConfirme,
} from "../../../../components";
import { Cargo } from "../../../../domain/enums";
import useUserAplication from "../../../../hooks/useUser";
import { selectStateEstab } from "../../../../store/slices/estabelecimento.slice";
import {
  selectStateUser
} from "../../../../store/slices/usuario.slice";
import ModalUser from "./modal";
import { Container, TableContainer } from "./styles";

function Usuario() {
  const userAplication = useSelector(selectStateUser);
  const estabelecimento = useSelector(selectStateEstab);
  const dispatch = useDispatch();
  const {
    colors,
    setShowModal,
    showModal,
    title,
    user,
    setUser,
    dataSource,
    setDataSource,
    initialState,
    actualUser,
    setStatus,
    showConfirmed,
    setShowConfirmed,
    userSelect, setUserSelect
  } = useUserAplication();

  const renderCell = (element: any) => {
    console.log(element);
    if (element.columnIndex === 1) {
      return (
        <span>{`${element.value} ${
          Boolean(element.data.lastName) ? element.data.lastName : ""
        }`}</span>
      );
    }
    if (element.value === "S") {
      return (
        <div
          className="rounded-full h-6 text-center p-1"
          style={{ backgroundColor: colors.success }}
        >
          <span className="font-bold text-white">ATIVO</span>
        </div>
      );
    } else if (element.value === "N") {
      return (
        <div
          className="rounded-full  h-6 text-center p-1"
          style={{ backgroundColor: colors.error }}
        >
          <span className="font-bold text-white">INATIVO</span>
        </div>
      );
    } else if (element.columnIndex === 2) {
      let cargo = "";
      if (element.value === Cargo.MASTER) {
        cargo = "MASTER";
      } else if (element.value === Cargo.VENDEDOR) {
        cargo = "Vendedor";
      } else {
        cargo = "Capitador";
      }
      return (
        <span className="font-bold" style={{ color: colors.info }}>
          {cargo}
        </span>
      );
    } else if (element.columnIndex === 5) {
      return (
        <div className="flex text-lg justify-between px-3">
          {element.data.status === "S" ? (
            <FaRegCheckCircle
              className="cursor-pointer"
              title="Usuário ativo"
              color={colors.info}
              onClick={() => {setShowConfirmed(true);setUserSelect(element.data)}}
            />
          ) : (
            <MdBlock
              className="cursor-pointer"
              title="Usuário inativo"
              color={colors.error}
              onClick={() => {setShowConfirmed(true);setUserSelect(element.data)}}
            />
          )}
          <BsPencilSquare
            title="Editar"
            className="cursor-pointer"
            color={colors.primary}
            onClick={() => {
              setUser(element.data);
              openModal();
            }}
          />
        </div>
      );
    }
  };

  const columns = new Array<IColumnProps>();

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const formatDate = (date: any) => {
    if (date.value) {
      return (
        <p>
          {moment(date.value, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </p>
      );
    }
  };

  return (
    <Container className="card-local p-2">
      <TableContainer>
        <DataGridDefault
          isSearch
          cssSearch="w-11/12"
          headerChildren={
            <div className="w-1/12 mr-2">
              <ButtonIcon
                borderColor={colors.primary}
                label="Novo"
                icon={<FaPlus />}
                width={"100%"}
                onClick={() => {
                  setUser(initialState);
                  // setShowModal(true);
                  openModal();
                }}
              />
            </div>
          }
          columns={columns}
          dataSource={dataSource}
          allowSorting={false}
          paginar={false}
          // showRowLines
          rowAlternationEnabled
          showBorders
          hoverStateEnabled
          isSelectRow
          // onInitialized={(e) => setGridInstance(e.component)}
        >
          <Column
            dataField="id"
            caption="Código"
            alignment="center"
            dataType="string"
            width={100}
            cssClass="font-bold column-1"
            sortOrder={"asc"}
          />
          <Column
            dataField="name"
            caption="Nome"
            alignment="left"
            dataType="string"
            cssClass="font-bold"
            cellRender={renderCell}
          />
          <Column
            dataField="cargo"
            caption="Cargo"
            alignment="center"
            dataType=""
            width={120}
            cellRender={renderCell}
            allowSearch={false}
          />
          <Column
            dataField="email"
            caption="E-mail"
            alignment="left"
            dataType="string"
            width={250}
          />
          <Column
            dataField="dateCreate"
            caption="Criado"
            alignment="center"
            dataType="string"
            width={140}
            allowSearch={false}
            cellRender={formatDate}
          />
          {/* <Column
            dataField="status"
            caption="STATUS"
            alignment="center"
            dataType="number"
            width={100}
            cellRender={renderCell}
            allowSearch={false}
          /> */}
          <Column
            dataField=""
            caption=""
            alignment="center"
            dataType=""
            width={100}
            cellRender={renderCell}
            allowSearch={false}
          />
        </DataGridDefault>
      </TableContainer>

      {/* =============modal =========================== */}
      <ModalUser
        showModal={showModal}
        closeModal={closeModal}
        user={user}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />

      <DialogPopupConfirme
        isOpen={showConfirmed}
        onRequestClose={() => setShowConfirmed(false)}
        title="Confirme"
        onClickSim={()=>setStatus(userSelect)}
      >
        <div>
          <p className="font-bold text-xl">{`Realmente deseja ${userSelect.status == 'S'?'bloquear':'desbloquear'} o usuário?`}</p>
          <p className="text-xl">Nome: {userSelect.name +' '+userSelect.lastName}</p>
        </div>
      </DialogPopupConfirme>
    </Container>
  );
}
export default Usuario;
