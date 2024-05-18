import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import * as yup from "yup";
import {
  InputDefault,
  InputSelectDefault,
  ModalDefault,
} from "../../../../components";
import TitleDivider from "../../../../components/TitleDivider";
import { api } from "../../../../config/api";
import { UserAplicationType } from "../../../../domain";
import { selectStateEstabelecimentos } from "../../../../store/slices/estabelecimentos.slice";
import { selectStateUser } from "../../../../store/slices/usuario.slice";
import { UtilsGeral } from "../../../../utils/utils_geral";
import { cargos } from "./__mocks__";
import { FormContainer } from "./styles";
import { Cargo } from "../../../../domain/enums";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  user: any;
  setDataSource?: (array: Array<UserAplicationType>) => void;
  dataSource?: Array<UserAplicationType>;
}

const ModalUser: React.FC<Props> = ({ ...props }) => {
  const url = "api/usuario";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm({
    // defaultValues:props.user,
    resolver: yupResolver(schema),
  });

  const { colors, title } = useContext(ThemeContext);
  const setores = useSelector(selectStateEstabelecimentos);
  const userAplication = useSelector(selectStateUser);
  const isUserMaster = userAplication.cargo === Cargo.MASTER;

  useEffect(() => {
    Object.keys(props.user).forEach((campo) => {
      if (campo == "setor") {
        setValue(campo, props.user[campo]?.id);
      } else if (campo === "password") {
        setValue("password", props.user["password"]);
        setValue("confirmePass", props.user["password"]);
      } else {
        setValue(campo, props.user[campo]);
      }
    });
  }, [props.user]);

  async function handleSave() {
    console.log("aqui");
    let user = getValues();
    user.status = "S";
    delete user?.confirmePass;
    delete user?.token;
    delete user?.dateCreate;
    delete user?.token;
    await api
      .post(url, user)
      .then((resp) => {
        props.setDataSource &&
          props.dataSource &&
          props.setDataSource([...props.dataSource, resp.data]);
        props.closeModal();
        toast.success(UtilsGeral.getEmoji(1) + " Cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          UtilsGeral.getEmoji(2) + error.response.data[0].mensagemUsuario
        );
      });
  }

  return (
    <ModalDefault
      isOpen={props.showModal}
      title="Ficha do usúario"
      onRequestClose={props.closeModal}
      width="800px"
      onClickAction={handleSubmit(handleSave)}
    >
      <FormContainer>
        <div>
          <TitleDivider title="Principal" />
          <div className="flex flex-wrap my-5">
            <InputDefault
              className="w-6/12 mb-5"
              label="Nome"
              type="text"
              required
              name="name"
              register={register("name")}
              errorMessage={errors.name?.message}
            />
            <div className="w-4/12">
              <InputSelectDefault
                label="Cargo"
                options={cargos}
                name="cargo"
                isSearchable={false}
                placeholder="Selecione..."
                required
                control={control}
                disabled={isUserMaster ? false:Boolean(props.user.id)}
                errorMessage={errors.cargo?.message}
              />
            </div>
            <InputDefault
              name="lastName"
              className="w-6/12 mr-2"
              label="Sobrenome"
              type="text"
              required
              register={register("lastName")}
              errorMessage={errors.lastName?.message}
            />
            <div className="w-4/12">
              <InputSelectDefault
                label="Setor"
                options={setores.map((item) => {
                  return { label: item?.name, value: item?.id };
                })}
                name="setor"
                isSearchable={false}
                placeholder="Selecione..."
                required
                control={control}
                disabled={isUserMaster ? false:Boolean(props.user.id)}
                errorMessage={errors.setor?.message}
              />
            </div>
          </div>
        </div>

        <div className="text-left">
          <TitleDivider title="Acesso" />
          <div className="my-5 flex flex-wrap">
            <InputDefault
              className="w-5/12 mb-5"
              label="E-mail"
              type="email"
              required
              register={register("email")}
              errorMessage={errors.email?.message}
            />
            <InputDefault
              className="w-5/12 mb-5"
              label="Usuário do sistema"
              type="text"
              required
              register={register("userName")}
              errorMessage={errors.userName?.message}
            />
            <InputDefault
              className="w-5/12"
              label="Senha"
              type="password"
              required
              register={register("password")}
              errorMessage={errors.password?.message}
            />
            <InputDefault
              className="w-5/12"
              label="Confirme senha"
              type="password"
              required
              register={register("confirmePass")}
              errorMessage={errors.confirmePass?.message}
            />
          </div>
        </div>

        {props.user.id && (
          <div
            className="rounded-full mt-5 w-28 h-10 text-center p-2 font-bold text-white absolute top-16"
            style={{
              backgroundColor:
                props.user.status === "S" ? colors.success : colors.error,
              left: "calc(100% - 130px)",
            }}
          >
            <p>{props.user.status === "S" ? "ATIVO" : "INATIVO"}</p>
          </div>
        )}
        {/* <ButtonIcon
              className="mr-3 w-32 font-12"
              label={"Salvar"}
              icon={<FaSave />}
              type="submit"
              background={colors.primary}
            /> */}
      </FormContainer>
    </ModalDefault>
  );
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("O campo é obrigatório"),
    cargo: yup.string().required("O campo é obrigatório"),
    setor: yup.string().required("O campo é obrigatório"),
    lastName: yup.string().required("O campo é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O campo é obrigatório"),
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

export default ModalUser;
