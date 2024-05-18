import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { UsuarioService } from "../module/authenticate/pages/services/usuarioService";
import { selectStateUser } from "../store/slices/usuario.slice";
import { UtilsGeral } from "../utils/utils_geral";
import { UserAplicationType } from "./../domain/types/user_aplication";

function useUserAplication() {
  const url = "api/usuario";
  const initialState: UserAplicationType = {
    id: null,
    name: "",
    lastName: "",
    userName: "",
    email: "",
    acesso: null,
    status: "S",
    password: "",
    cargo: null,
    token: "",
    dateCreate: new Date(),
    dateUpdate: new Date(),
    setor: null,
  };
  const [user, setUser] = useState<UserAplicationType>(initialState);
  const { colors, title } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<Array<UserAplicationType>>([]);
  const actualUser = useSelector(selectStateUser);
  const service = new UsuarioService();
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [userSelect, setUserSelect] =
    useState<UserAplicationType>(initialState);

  async function loadData() {
    service
      .getUsuarios()
      .then((data) => setDataSource(data))
      .catch((error) =>
        toast.error(UtilsGeral.getEmoji(2) + error?.mensagemUsuario)
      );
  }

  async function setStatus(user: UserAplicationType) {
    service
      .setStatus(user.id ? user.id : 0, user.status == "S" ? "N" : "S")
      .then(() => {
        user.status == "N"
          ? toast.success(UtilsGeral.getEmoji(1) + "Usuário Ativo")
          : toast.success(UtilsGeral.getEmoji(1) + "Usuário Inativado");
        loadData();
        setShowConfirmed(false)
      })
      .catch((error) =>
        toast.error(UtilsGeral.getEmoji(2) + error?.mensagemUsuario)
      );
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    user,
    setUser,
    colors,
    title,
    actualUser,
    showModal,
    setShowModal,
    dataSource,
    setDataSource,
    initialState,
    setStatus,
    showConfirmed,
    setShowConfirmed,
    userSelect,
    setUserSelect,
  };
}

export default useUserAplication;
