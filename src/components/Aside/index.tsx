import {
  FaCartArrowDown,
  FaShopify,
  FaSpeakap,
  FaStoreAlt,
  FaUserFriends,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Cargo } from "../../domain/enums";
import { reset } from "../../store/slices/menuUser.slice";
import { selectStateUser } from "../../store/slices/usuario.slice";
import ButtonMenu from "../Buttons/ButtonMenu";
import { Container, MenuContainer } from "./styles";
import { UtilsUserLocal } from "../../utils/utils_userLocal";

export function Aside() {
  const dispatch = useDispatch();
  const userAplication = UtilsUserLocal.getTokenLogin();
  console.log(userAplication);
  return (
    <Container
      onClick={() => {
        dispatch(reset());
      }}
    >
      <MenuContainer>
        {["MASTER","VENDEDOR"].indexOf(userAplication.cargo) !== -1 && (
          <ButtonMenu
            link="/venda"
            icon={<FaCartArrowDown className="btn-menu" />}
            label="Venda"
          />
        )}
        {["MASTER","VENDEDOR","CAPITADOR"].indexOf(userAplication.cargo) !== -1 &&(
          <ButtonMenu
            link="/produto"
            icon={<FaShopify className="btn-menu" />}
            label="Estoque"
          />
        )}
        {["MASTER"].indexOf(userAplication.cargo) !== -1 && (
          <ButtonMenu
            link="/financeiro"
            icon={<FaSpeakap className="btn-menu" />}
            label="Financeiro"
          />
        )}
        {["MASTER","VENDEDOR","CAPITADOR"].indexOf(userAplication.cargo) !== -1 && (
          <ButtonMenu
            link="/mde"
            icon={<FaSpeakap className="btn-menu" />}
            label="Processos"
          />
        )}
        {["MASTER"].indexOf(userAplication.cargo) !== -1 &&(
          <ButtonMenu
            link="/estabelecimentos"
            icon={<FaStoreAlt className="btn-menu" />}
            label="Setores"
          />
        )}
        {["MASTER"].indexOf(userAplication.cargo) !== -1 && (
          <ButtonMenu
            link="/usuario"
            icon={<FaUserFriends className="btn-menu" />}
            label="Usuários"
          />
        )}
      </MenuContainer>
    </Container>
  );
}
