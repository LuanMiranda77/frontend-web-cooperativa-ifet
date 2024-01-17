import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { api } from "../config/api";
import { UsuarioService } from "../module/authenticate/pages/services/usuarioService";
import { selectStateUser } from "../store/slices/usuario.slice";
import { UtilsGeral } from "../utils/utils_geral";
import { UserAplicationType } from "./../domain/types/user_aplication";
import { cargos } from "./../module/authenticate/pages/Usuario/__mocks__/index";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSave() {
    console.log('aqui');
    await api
      .post(url, user)
      .then((resp) => {
        // let array = [...dataSource];
        // array.push(resp.data);
        setDataSource([...dataSource, resp.data]);
        setShowModal(false);
        toast.success(UtilsGeral.getEmoji(1) + " Cadastrado com sucesso.");
      })
      .catch((error) => {
        toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario);
      });
  }

  async function loadData() {
    service
      .getUsuarios()
      .then((data) => setDataSource(data))
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
    handleSave,
    colors,
    title,
    actualUser,
    showModal,
    setShowModal,
    dataSource,
    setDataSource,
    initialState,
  };
}

export default useUserAplication;


const schema = yup
.object()
.shape({
  name: yup.string().required("O campo é obrigatório"),
  lastName: yup.string().required("O campo é obrigatório"),
  email: yup.string().email().required("O campo é obrigatório"),
  userName: yup.string().required("O campo é obrigatório"),
  password: yup
    .string()
    .min(6, "Digite no minímo 6 caracteres")
    .required("O campo é obrigatório"),
  confirmePass: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não são iguais")
    .required("O campo é obrigatório"),
})
.required();
