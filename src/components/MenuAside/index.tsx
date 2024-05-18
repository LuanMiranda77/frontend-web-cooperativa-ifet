import TreeView from 'devextreme-react/tree-view';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { UserAplicationType } from '../../domain';
import { Cargo } from '../../domain/enums';
import { load, selectStateUser } from '../../store/slices/usuario.slice';
import { UtilsUserLocal } from '../../utils/utils_userLocal';
import { menus } from './lista';
import { Container } from './styles';

interface MenuAsideProps {
  //adicionar os props
  closeMenu: () => void;
}

export const MenuAside: React.FC<MenuAsideProps> = (props) => {
  const userAplication = useSelector(selectStateUser);
  const [menusValid, setMenusValid] = useState<any>(menus);
  // const [menusValid2, setMenusValid2] = useState<any>(menus);
  const navegar = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = UtilsUserLocal.getTokenLogin();
    if (user.cargo === Cargo.MASTER) {
      user.setor= 0;
    }
    dispatch(load(user));
  }, []);

  const onSelectMenu = (item: any) => {
    let option = item.itemData.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    switch (option) {
      case 'usuarios':
        navegar('/usuario');
        break;
      case 'nota fiscal':
        navegar('/nota-fiscal');
        break;
      case 'cupom fiscal':
        navegar('/cupom-fical');
        break;
      case 'produto':
        navegar('/produto');
        break;
      case 'categoria':
        navegar('/categoria');
        break;
      case 'mde':
        navegar('/mde');
        break;
      case 'curva abc':
        navegar('/curva-abc');
        break;
      case 'estoque critico':
        navegar('/estoque-critico');
        break;
      case 'contas':
        navegar('/contas');
        break;
      case 'plano de contas':
        navegar('/plano-contas');
        break;
      case 'extrato de vendas':
        navegar('/extrato-venda');
        break;
      case 'extrato de entradas':
        navegar('/extrato-entrada');
        break;
      case 'dre financeiro':
        navegar('/dre');
        break;
      case 'estabelecimento':
        navegar('/estabelecimentos');
        break;
      case 'sped fiscal':
        navegar('/sped');
    }

  }

  return <Container>
    <TreeView
      id="treeview"
      items={menusValid}
      width={'100%'}
      height={'100%'}
      searchMode={'contains'}
      searchEnabled={true}
      className='text-white'
      onItemClick={onSelectMenu}
    />

  </Container>
};