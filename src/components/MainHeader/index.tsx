import React, { useContext, useEffect } from "react";
import 'react-dropdown/style.css';
import { BsDoorClosedFill } from "react-icons/bs";
import { FaBars, FaEllipsisV, FaTheaterMasks, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Cargo } from "../../domain/enums";
import { RootState } from "../../store/index.store";
import { reset, save } from '../../store/slices/menuUser.slice';
import { load } from "../../store/slices/usuario.slice";
import { loadEstabelecimentos } from "../../store/slices/estabelecimentos.slice";
import { persistLocalStorage } from "../../utils/persistLocalStorage";
import { UtilsGeral } from "../../utils/utils_geral";
import { UtilsUserLocal } from "../../utils/utils_userLocal";
import { Divider } from "../Divider";
import { InputSelectEstabelecimento } from "../Inputs/InputSelectEstabelecimento";
import { Container } from "./styles";
import icon from '../../assets/Logo/icon_white.png'
import { api } from "../../config/api";
interface Props {
  //adicionar os props
  alterTheme(): void;
  onClickMenu(): void;
  onClose(): void;
}

export const MainHeader: React.FC<Props> = ({ alterTheme, onClickMenu, onClose }) => {
  const dispatch = useDispatch();
  const { display } = useSelector((state: RootState) => state.menuUser);
  const { colors, title } = useContext(ThemeContext);
  const userAplication = useSelector((state: RootState) => state.userAplication);
  const navegate = useNavigate();

  useEffect(() => {
    let user = UtilsUserLocal.getTokenLogin();
    if(user.cargo === Cargo.MASTER){
      user.setor=0;
    }
    dispatch(load(user));
    api.get(`api/estabelecimento/`).then(resp =>{
      if(typeof resp.data === 'string'){
              UtilsUserLocal.logout();
      }else{
        dispatch(loadEstabelecimentos(resp.data));
      }
    }).catch();
  }, [])

  const onCloseAll = () => {
    onClose();
    if (display === 'flex') {
      dispatch(reset());
    }
  }

  const onShowMenu = (option: number) => {
    if (display === 'flex' && option === 1) {
      dispatch(save('none'));

    } else if (display === 'flex' && option === 2) {
      dispatch(save('none'));
      alterTheme();
    } else if (display === 'flex' && option === 3) {
      dispatch(save('none'));
      UtilsUserLocal.logout();
      navegate('/')
      window.location.reload();
    } else {
      if (display === 'flex') {
        dispatch(save('none'));
      } else {
        dispatch(save('flex'));
      }
    }
  }

  return (
    <Container className="" style={{ boxShadow: '0px 15px 10px gray' }} onClick={onCloseAll}>
      <div className="flex text-left" style={{ width: '60%' }}>
        <img className="w-8 drop-shadow-md mr-5" src={icon} alt="logo"/>
      </div>
      {/* <h1>MH</h1> */}
      <div className="flex text-rigth">
        {/* <button onClick={alterTheme}>SetTema</button> */}
        {/* <FaUser onClick={alterTheme} className="text-xl mr-2" style={{ color: colors.textLabel }}/> */}
        <div className="grid mr-3 text-xs" style={{ color: colors.textLabel }}>
          <b>{userAplication.name}</b>
          <small style={{ marginTop: '-2px', color: colors.warning }} >{
          userAplication.cargo=== Cargo.VENDEDOR ? 'VENDEDOR':
          userAplication.cargo=== Cargo.CAPITADOR ? 'CAPITADOR':
          userAplication.cargo=== Cargo.MASTER ? 'MASTER': 'CAIXA'
          
          }</small>
        </div>
        <FaEllipsisV onClick={() => onShowMenu(0)} className="text-2xl hover:text-red-500" style={{ cursor: 'pointer', color: colors.textLabel, marginTop:'0px' }} />
        {/* <FaTheaterMasks onClick={alterTheme} className="text-4xl" style={{ cursor: 'pointer', color: colors.textLabel }} /> */}
      </div>
      <div className="div-menu card-local" style={{ display: display }}>
        <label htmlFor="" className="flex items-center hover:text-blue-900 hover:font-bold cursor-pointer"
          onClick={() => onShowMenu(1)}
        >
          <FaUser onClick={alterTheme} className="text-sm mr-1 hover:text-blue-900 hover:font-bold" />
          Meu Perfil
        </label>
        <Divider tipo="horizontal" className="mb-2 mt-2" />
        <label htmlFor="" className="flex items-center hover:text-blue-900 hover:font-bold cursor-pointer"
          onClick={() => onShowMenu(2)}
        >
          <FaTheaterMasks className="text-lg mr-1 hover:text-blue-900 hover:font-bold" />
          Mudar Tema
        </label>
        <Divider tipo="horizontal" className="mb-2 mt-2" />
        <label htmlFor="" className="flex items-center hover:text-blue-900 hover:font-bold cursor-pointer"
          onClick={() => onShowMenu(3)}
        >
          <BsDoorClosedFill className="text-ms mr-1 hover:text-blue-900 hover:font-bold" />
          Sair
        </label>
      </div>
    </Container>
  );
};
