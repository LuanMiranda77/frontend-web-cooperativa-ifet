import nfe from '../../assets/icons/nfe.svg';
import pasta from '../../assets/icons/pasta.svg';
import user from '../../assets/icons/user.png';
import cupom from '../../assets/icons/cupom.png';
import paper from '../../assets/icons/paper.png';
import rel from '../../assets/load.gif';
import sped from '../../assets/icons/sped.png';
import loja from '../../assets/icons/loja.png';
import config from '../../assets/icons/config.png';
import { Roles } from '../../domain/enums';
export const menus = [
  {
    id: '1',
    text: 'GERENCIA',
    expanded: false,
    icon:pasta,
    items: [
      {
        id: '1.1',
        text: 'Usuários',
        expanded: false,
        icon:user,
        role:Roles.Usuarios
      },
      {
        id: '1.2',
        text: 'Nota fiscal',
        expanded: false,
        icon:paper,
        role:Roles.NotaFiscal
      },
      {
        id: '1.3',
        text: 'Cupom fiscal',
        expanded: false,
        icon:cupom,
        role:Roles.CupomFiscal
      },
      {
        id: '1.4',
        text: 'Relatórios',
        expanded: false,
        icon:rel,
      }
    ],
  },
  {
    id: '2',
    text: 'ESTOQUE',
    expanded: false,
    icon:pasta,
    items: [
      {
        id: '2.1',
        text: 'Produto',
        expanded: false,
        icon:'https://img.icons8.com/tiny-color/16/000000/box.png',
        role:Roles.Produto
      },
      {
        id: '2.2',
        text: 'Categoria',
        expanded: false,
        icon:'https://img.icons8.com/color/48/000000/sorting-answers.png',
        role:Roles.Categoria
      },
      {
        id: '2.3',
        text: 'MDE',
        expanded: false,
        icon:'https://img.icons8.com/office/16/000000/nook.png',
        role:Roles.MDE
      },
      {
        id: '2.4',
        text: 'Relatórios',
        expanded: false,
        icon:rel,
        items:[
          {
            id: '2.3.1',
            text: 'Curva ABC',
            expanded: false,
            icon:'https://img.icons8.com/office/16/000000/overview-pages-2.png',
            role:Roles.CurvaABC
          },
          {
            id: '2.3.2',
            text: 'Estoque crítico',
            expanded: false,
            icon:'https://img.icons8.com/office/16/000000/test-passed.png',
            role:Roles.EstoqueCritico
          }
        ]
      }
    ],
  },
  {
    id: '3',
    text: 'FINANCEIRO',
    expanded: false,
    icon:pasta,
    items: [
      {
        id: '3.1',
        text: 'Contas',
        expanded: false,
        icon:'https://img.icons8.com/office/16/000000/us-dollar-circled--v1.png',
        role:Roles.Contas
      },
      {
        id: '3.2',
        text: 'Plano de contas',
        expanded: false,
        icon:'https://img.icons8.com/office/16/000000/paste-as-text.png',
        role:Roles.PlanoContas
      },
      {
        id: '3.3',
        text: 'Relatórios',
        expanded: false,
        icon:rel,
        items:[
          {
            id: '3.3.1',
            text: 'Extrato de Vendas',
            expanded: false,
            icon:'https://img.icons8.com/color/48/000000/open-document.png',
            role:Roles.ExtratoVenda
          },
          {
            id: '3.3.2',
            text: 'Extrato de Entradas',
            expanded: false,
            icon:'https://img.icons8.com/office/16/000000/overview-pages-2.png',
            role:Roles.ExtratoEntrada
          },
          {
            id: '3.3.3',
            text: 'DRE financeiro',
            expanded: false,
            icon:'https://img.icons8.com/ultraviolet/40/000000/document--v1.png',
            role:Roles.DreFinanceiro
          },
        ]
      }
    ],
  },{
    id: '4',
    text: 'CONFIGURAÇÕES',
    expanded: false,
    icon:config,
    items:[
      { id: '4.1',
      text: 'Estabelecimento',
      expanded: false,
      icon:loja,
      role:Roles.SPED,}

    ]
  },
  {
    id: '5',
    text: 'SPED FISCAL',
    expanded: false,
    icon:sped,
    role:Roles.SPED
  }
  // fim 
];
  