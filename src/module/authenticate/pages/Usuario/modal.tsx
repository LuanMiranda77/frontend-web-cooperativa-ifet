import _ from "lodash";
import React, { useContext, useEffect } from "react";
import {
    ButtonIcon,
  InputDefault,
  InputSelectDefault,
  ModalDefault,
} from "../../../../components";
import TitleDivider from "../../../../components/TitleDivider";
import { UserAplicationType } from "../../../../domain";
import { cargos } from "./__mocks__";
import { FormContainer } from "./styles";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThemeContext } from "styled-components";
import { selectStateEstabelecimentos } from "../../../../store/slices/estabelecimentos.slice";
import { useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  user: UserAplicationType;
  setUser: (user: UserAplicationType) => void;
  handleSave:()=>void;
}

const ModalUser: React.FC<Props> = ({ ...props }) => {

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

  const { colors, title } = useContext(ThemeContext);
  const setores = useSelector(selectStateEstabelecimentos);
  useEffect(()=>{console.log(errors);},[errors]);

  return (
    <ModalDefault
      isOpen={props.showModal}
      title="Ficha do usúario"
      onRequestClose={props.closeModal}
      width="800px"
      onClickAction={()=>handleSubmit(props.handleSave)}
      
    >
      <FormContainer onSubmit={handleSubmit(props.handleSave)}>
        <div>
          <TitleDivider title="Principal" />
          <div className="flex flex-wrap my-5">
            <InputDefault
              className="w-6/12 mb-5"
              label="Nome"
              type="text"
              required
              name='name'
              register={register("name")}
              errorMessage={errors.name?.message}
            />
            <div className="w-4/12">
              <InputSelectDefault
                label="Cargo"
                options={cargos}
                name='cargo'
                // defaultValue={cargos[2]}
                // value={_.find(cargos, { value: props.user?.cargo })}
                // onChange={(e) =>
                //   props.setUser({ ...props.user, cargo: e.value })
                // }
                isSearchable={false}
                placeholder="Selecione..."
                required
                control={control}
                disabled={Boolean(props.user.id)}
              />
            </div>
            <InputDefault
              name='lastName'
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
                options={setores.map(item => {return {label: item?.name, value:item?.id}})}
                name='setor'
                // defaultValue={cargos[2]}
                // value={_.find(cargos, { value: props.user?.cargo })}
                // onChange={(e) =>
                //   props.setUser({ ...props.user, cargo: e.value })
                // }
                isSearchable={false}
                placeholder="Selecione..."
                required
                control={control}
                disabled={Boolean(props.user.id)}
              />
            </div>
          </div>
        </div>

        <div className="text-left">
          <TitleDivider title="Acesso" />
          <div className="my-5 flex flex-wrap">
            <InputDefault
              className="w-5/12 mb-5"
              label="Email"
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

        {props.user.id ? (
          <div
            className="rounded-full w-28 h-10 text-center p-2 font-bold text-white absolute top-16"
            style={{
              backgroundColor:
                props.user.status === "S"
                  ? colors.success
                  : colors.error,
              left: "calc(100% - 130px)",
            }}
          >
            <p>{props.user.status === "S" ? "ATIVO" : "INATIVO"}</p>
          </div>
        ) : (
          ""
        )}
        <ButtonIcon
              className="mr-3 w-32 font-12"
              label={"Salvar"}
              icon={<FaSave />}
              type="submit"
              background={colors.primary}
            />
      </FormContainer>
    </ModalDefault>
  );
};

const schema = yup
.object()
.shape({
  name: yup.string().required("O campo é obrigatório"),
  lastName: yup.string().required("O campo é obrigatório"),
  email: yup.string().email().required("O campo é obrigatório"),
  userName: yup.string().email().required("O campo é obrigatório"),
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
