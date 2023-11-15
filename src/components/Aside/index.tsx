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

export function Aside() {
  const dispatch = useDispatch();
  const userAplication = useSelector(selectStateUser);

  return (
    <Container
      onClick={() => {
        dispatch(reset());
      }}
    >
      <MenuContainer>
        {userAplication.cargo === Cargo.CAIXA ||
        userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ||
        userAplication.cargo === Cargo.GERENTE ? (
          <ButtonMenu
            link="/venda"
            icon={<FaCartArrowDown className="btn-menu" />}
            label="Venda"
          />
        ) : (
          ""
        )}
        {userAplication.cargo === Cargo.ESTOQUISTA ||
        userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ||
        userAplication.cargo === Cargo.GERENTE ? (
          <ButtonMenu
            link="/produto"
            icon={<FaShopify className="btn-menu" />}
            label="Estoque"
          />
        ) : (
          ""
        )}
        {userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ||
        userAplication.cargo === Cargo.GERENTE ? (
          <ButtonMenu
            link="/financeiro"
            icon={<FaSpeakap className="btn-menu" />}
            label="Financeiro"
          />
        ) : (
          ""
        )}
        {userAplication.cargo === Cargo.ESTOQUISTA ||
        userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ||
        userAplication.cargo === Cargo.GERENTE ? (
          <ButtonMenu
            link="/mde"
            icon={<FaSpeakap className="btn-menu" />}
            label="Processos"
          />
        ) : (
          ""
        )}
        {userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ? (
          <ButtonMenu
            link="/estabelecimento"
            icon={<FaStoreAlt className="btn-menu" />}
            label="Setores"
          />
        ) : (
          ""
        )}
        {userAplication.cargo === Cargo.ADMIN ||
        userAplication.cargo === Cargo.MASTER ||
        userAplication.cargo === Cargo.GERENTE ? (
          <ButtonMenu
            link="/usuario"
            icon={<FaUserFriends className="btn-menu" />}
            label="Usuários"
          />
        ) : (
          ""
        )}
      </MenuContainer>
    </Container>
  );
}
