import { Column, IColumnProps } from "devextreme-react/data-grid";
import moment from "moment";
import { FieldValues } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import { ButtonIcon, DataGridDefault } from "../../../../components";
import { Cargo } from "../../../../domain/enums";
import useUserAplication from "../../../../hooks/useUser";
import { selectStateEstab } from "../../../../store/slices/estabelecimento.slice";
import { selectStateUser } from "../../../../store/slices/usuario.slice";
import ModalUser from "./modal";
import { Container, TableContainer } from "./styles";

function Usuario() {
  const userAplication = useSelector(selectStateUser);
  const estabelecimento = useSelector(selectStateEstab);
  const {
    colors,
    handleSave,
    setShowModal,
    showModal,
    title,
    user,
    setUser,
    dataSource,
    setDataSource,
    initialState,
    actualUser,
  } = useUserAplication();

  // useEffect(() => {
  //   if (userAplication.cargo !== Cargo.MASTER) {
  //     let lista = cargos.filter(cargo => cargo.value !== Cargo.MASTER)
  //     setListCargos(lista);
  //   }
  //   if (estabelecimento.id) {
  //     console.log(estabelecimento);
  //     service.getUsuarios(estabelecimento.id).then(response => {
  //       setDataSource(response);
  //       setDataSourceCopy(response);
  //     }).catch(error => {
  //       toast.error(error.mensagemUsuario);
  //     });
  //   }
  // }, [estabelecimento]);

  const renderCell = (element: any) => {
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
            <FaRegCheckCircle className="cursor-pointer" title="Usuário ativo" color={colors.info} />
          ) : (
            <MdBlock className="cursor-pointer" title="Usuário inativo" color={colors.error} />
          )}
          <BsPencilSquare title="Editar" className="cursor-pointer" color={colors.primary} onClick={()=>{setUser(element.data); setShowModal(true)}} />
        </div>
      );
    }
  };

  const columns = new Array<IColumnProps>();

  const closeModal = () => {
    setShowModal(false);
  };

  const onSave = (form: FieldValues) => {
    // if (user.cargo == null) {
    //   toast.error(UtilsGeral.getEmoji(2)+ 'Você esqueceu de selecionar o cargo.');
    //   return
    // }
    // let userData = user;
    // userData = {
    //   ...user,
    //   nome: form.nome,
    //   email: form.email,
    //   password: form.password,
    //   estabelecimento: user.cargo !== Cargo.MASTER && user.cargo !== Cargo.REVENDA ? estabelecimento.id : 1
    // }
    //   if (!userData.id) {
    //     service.save(userData).then(response => {
    //       let array = [...dataSource];
    //       array.push(response);
    //       setDataSource(array);
    //       setShowModal(false);
    //       toast.success(UtilsGeral.getEmoji(1) + " Cadastrado com sucesso.");
    //     }).catch(error => {
    //       toast.error(UtilsGeral.getEmoji(2)+ error.mensagemUsuario);
    //     });
    //   } else {
    //     userData.dataCriacao = moment(userData.dataCriacao).toDate();
    //     userData.dataAtualizacao = moment(userData.dataAtualizacao).toDate();
    //     service.update(userData).then(response => {
    //       console.log(response);
    //       let array = _.map(dataSource, (user) => {
    //         if (user.id === response.id) {
    //           user = { ...response }
    //         }
    //         return user;
    //       });
    //       setDataSource(array);
    //       setShowModal(false);
    //       toast.success(UtilsGeral.getEmoji(1) + " Atualizado com sucesso.");
    //     }).catch(error => {
    //       toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario);
    //     });
    //   }
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
    <Container className="card-local p-3">
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
                  setShowModal(true);
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
    </Container>
  );
}
export default Usuario;
