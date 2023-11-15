import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import * as yup from "yup";
import icon from "../../../../assets/Logo/icon.svg";
import eclipse from "../../../../assets/eclipse.svg";
import senha from "../../../../assets/img-senha.svg";
import { ButtonBase, InputDefault } from "../../../../components";
import { UsuarioService } from "../services/usuarioService";
import { Container } from "./styles";
/**
 *@Author
 *@Issue
 */

function RecuperaSenha() {
  const [email, setEmail] = useState<string>("");
  const service = new UsuarioService();
  const { colors, title } = useContext(ThemeContext);

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email("O e-mail não é válido")
        .required("O campo é obrigatório"),
      // confirmePass: yup.string().oneOf([yup.ref("password")]).required('Digite a senha')
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSend = (form: FieldValues) => {
    service
      .recuperarSenha({ email: form.email, password: "" })
      .then((response) => {
        toast.success(
          "Sua solicitação vou enviada, verifique sua caixa de e-mail"
        );
      })
      .catch((err) => {
        toast.error(err.mensagemUsuario);
      });
  };

  return (
    <Container>
      <div className="div-left p-5 text-center">
        <div className="w-full" style={{marginLeft:'-20px', marginTop:'-20px', maxWidth:'150px', width:'calc(100px + 5vw)'}}>
          <img src={eclipse} alt="icon" />
        </div>
        <small className="font-bold text-sm">
          <p className="mt-9">
            Caso não tenha acesso ao e-mail cadastrado por favor entre em
            contato com o nosso Direção.
          </p>
        </small>
        <div className="w-full" style={{marginLeft:'-18px', position:'absolute', bottom:'0', maxWidth:'637px', width:'calc(450px + 5vw)'}}>
        <img src={senha} alt="icon" />
        </div>
      </div>
      <div className="div-right">
        <div className="card-local p-6">
          <img className="col-start-3 col-span-4" src={icon} alt="" />
          <br />
          <p className="font-bold text-xl" style={{ color: colors.tertiary }}>
            Opa! esqueceu sua senha?
          </p>
          <small
            className="p-4 font-bold text-md"
            style={{ color: colors.gray }}
          >
            <p>Para recuperar seu acesso preencha o campo com o e-mail</p>
            <p>cadastrado em sua conta do nosso app.</p>
          </small>
          <form onSubmit={handleSubmit(onSend)}>
            <>
              <InputDefault
                className="w-full mb-9"
                label="E-mail"
                type="email"
                register={register("email")}
                // value={email}
                // onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite o e-mail"
                errorMessage={errors.email?.message}
              />
              {errors.email?.message}
              <ButtonBase
                model="btn_base"
                label="Enviar"
                className="primary-color my-2"
                size="small"
                type="submit"
              />
            </>
          </form>
        </div>
      </div>
    </Container>
  );
}
export default RecuperaSenha;
