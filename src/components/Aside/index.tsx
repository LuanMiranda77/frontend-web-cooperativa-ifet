
import { FaCartArrowDown, FaFileInvoiceDollar, FaRegSun, FaShopify, FaSpeakap, FaStoreAlt, FaUserFriends } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Cargo } from '../../domain/enums';
import { reset } from '../../store/slices/menuUser.slice';
import { selectStateUser } from '../../store/slices/usuario.slice';
import { Container, MenuContainer } from './styles';

export function Aside() {
  const dispatch = useDispatch();
  const userAplication = useSelector(selectStateUser);

  return <Container onClick={() => { dispatch(reset()) }}>
    <MenuContainer>
      {userAplication.cargo === Cargo.CAIXA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/venda'}>
          <div className='w-100 text-center mb-2'>
            <FaCartArrowDown className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>VENDA</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ESTOQUISTA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/produto'}>
          <div className='w-100 text-center mb-2'>
            <FaShopify className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>ESTOQUE</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/financeiro'}>
          <div className='w-100 text-center mb-2'>
            <FaSpeakap className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '10px' }}>FINANCEIRO</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ESTOQUISTA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/mde'}>
          <div className='w-100 text-center mb-2'>
            <FaFileInvoiceDollar className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>MDE</label>
          </div>
        </Link>
        : ''
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER ?
        <Link to={'/estabelecimento'}>
          <div className='w-100 text-center mb-2'>
            <FaStoreAlt className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>EMPRESA</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/usuario'}>
          <div className='w-100 text-center mb-2'>
            <FaUserFriends className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>USUÁRIOS</label>
          </div>
        </Link>
        : ""
      }
    </MenuContainer>
  </Container>;
}