import { useContext, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import icon from "../../../../assets/Logo/icon.svg";
import caixa from "../../../../assets/Logo/img_chart.svg";
import { InputDefault } from "../../../../components";
import { ButtonBase } from "../../../../components/Buttons/ButtonBase";
import { Logo } from "../../../../components/Logo";
import { SizeLogo } from "../../../../domain/enums";
import { RootState } from "../../../../store/index.store";
import { UsuarioService } from "../services/usuarioService";
import { Container } from "./styles";

function Login() {
  const theme = useContext(ThemeContext);
  const navegate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [user, setUser] = useState<Object>({ email: "", password: "" });
  const dispatch = useDispatch();
  const userAplication = useSelector(
    (state: RootState) => state.userAplication
  );

  const service = new UsuarioService();
  const login = () => {
    service
      .login(user)
      .then((response) => {
        if (response.status !== "S") {
          toast.error(
            "Seu usuario foi desativado! fale com administrador do sistema"
          );
          return;
        }
        // console.log(response);
        // dispatch(load(response));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.mensagemUsuario);
      });
  };
  return (
    <>
      <Container>
        <div className="div-left">
          <div className='w-full flex items-center justify-center h-80'>
            <Logo size={SizeLogo.LARGE}></Logo>
          </div>
          <img className="caixa-imge" src={caixa} alt="logo" />
        </div>
        <div className="div-right">
          <div
            className="card-local w-full"
            style={{
              maxWidth: "400px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h3
              style={{
                color:
                  theme.title === "light"
                    ? theme.colors.tertiary
                    : theme.colors.textLabel,
              }}
            >
              <img className="w-28 h-28 logo" src={icon} alt="logo" />
              Seu negócio na palma de sua mão!
            </h3>
            <div style={{ margin: "2rem" }}>
              <InputDefault
                className="w-full mb-9"
                label="E-mail ou nome"
                type="text"
                placeholder="Digite aqui"
                onChange={(event) =>
                  setUser({
                    ...user,
                    email: event.target.value,
                  })
                }
              />
              <InputDefault
                className="w-full"
                label="Senha"
                type={showPass ? "text" : "password"}
                placeholder="Digite a senha"
                onChange={(event) =>
                  setUser({
                    ...user,
                    password: event.target.value,
                  })
                }
              />
              {showPass === true ? (
                <FaEye className="olho" onClick={() => setShowPass(false)} />
              ) : (
                <FaEyeSlash
                  className="olho"
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>
            <div
              className="mb-9"
              style={{ width: "100%", textAlign: "center" }}
            >
              <ButtonBase
                label="ENTRAR"
                model="btn_base"
                className="primary-color mb-3"
                size="small"
                onClick={login}
              />
              <Link to={"/recupera-senha"}>
                <label
                  htmlFor="entrar"
                  className="font-bold label-senha"
                  style={{
                    color:
                      theme.title === "light"
                        ? theme.colors.primary
                        : theme.colors.black,
                  }}
                >
                  Esqueci a senha?
                </label>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
