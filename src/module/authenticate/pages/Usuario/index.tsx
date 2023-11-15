import { yupResolver } from '@hookform/resolvers/yup';
import { Column, IColumnProps } from 'devextreme-react/data-grid';
import _ from 'lodash';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { FaPauseCircle, FaPenSquare, FaPlayCircle, FaPlus, FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { ThemeContext } from 'styled-components';
import * as yup from "yup";
import {
  ButtonBase,
  ButtonIcon,
  DataGridDefault,
  DialogPopupConfirme,
  Divider,
  InputCheck,
  InputDefault,
  InputMask, InputSelectDefault,
  ModalDefault
} from "../../../../components";
import { Cargo, Roles } from '../../../../domain/enums';
import { UserAplicationType } from '../../../../domain/types/user_aplication';
import { selectStateEstab } from '../../../../store/slices/estabelecimento.slice';
import { initialState, selectStateUser } from '../../../../store/slices/usuario.slice';
import { UtilsGeral } from '../../../../utils/utils_geral';
import { UtilsValid } from '../../../../utils/utils_valid';
import { UsuarioService } from '../services/usuarioService';
import { Container, FormContainer, TableContainer } from './styles';
import { RolesInitial, RolesInitialCaixa, RolesInitialEstoquista, RolesInitialGerente, RolesTypes } from './types';
import { cargos } from './__mocks__';

function Usuario() {
  const userAplication = useSelector(selectStateUser);
  const estabelecimento = useSelector(selectStateEstab);
  const { colors, title } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserAplicationType>(initialState);
  const [showPoupAtivo, setShowPopupAtivo] = useState(false);
  const [showPoupInativo, setShowPopupInativo] = useState(false);
  const [dataSource, setDataSource] = useState<Array<UserAplicationType>>([]);
  const [dataSourceCopy, setDataSourceCopy] = useState(dataSource);
  const [roles, setRoles] = useState<RolesTypes>(RolesInitial);
  const [listCargos, setListCargos] = useState(cargos);
  const [gridInstance, setGridInstance] = useState<any>();
  const service = new UsuarioService();

  const schema = yup.object().shape({
    nome: yup.string().required('O campo é obrigatório'),
    email: yup.string().email().required('O campo é obrigatório'),
    password: yup.string().min(6, 'Digite no minímo 6 caracteres').required('O campo é obrigatório'),
    confirmePass: yup.string().oneOf([yup.ref("password")], "As senhas não são iguais").required('O campo é obrigatório')
  }).required();

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSearch = (text: string) => {
    console.log(gridInstance);

  }

  useEffect(() => {
    if (userAplication.cargo !== Cargo.MASTER) {
      let lista = cargos.filter(cargo => cargo.value !== Cargo.MASTER)
      setListCargos(lista);
    }
    if (estabelecimento.id) {
      console.log(estabelecimento);
      service.getUsuarios(estabelecimento.id).then(response => {
        setDataSource(response);
        setDataSourceCopy(response);
      }).catch(error => {
        toast.error(error.mensagemUsuario);
      });
    }
  }, [estabelecimento]);


  const renderCell = (element: any) => {
    if (element.value === "S") {
      return <div className='rounded-full h-6 text-center p-1' style={{ backgroundColor: colors.success }}><span className='font-bold text-white'>ATIVO</span></div>
    }
    else if (element.value === "N") {
      return <div className='rounded-full  h-6 text-center p-1' style={{ backgroundColor: colors.error }}><span className='font-bold text-white'>INATIVO</span></div>
    }
    else if (element.columnIndex === 2) {
      let cargo = '';
      if (element.value === Cargo.MASTER) {
        cargo = 'MASTER';
      } else if (element.value === Cargo.ADMIN) {
        cargo = 'ADMIN';
      } else if (element.value === Cargo.CAIXA) {
        cargo = 'CAIXA';
      } else if (element.value === Cargo.ESTOQUISTA) {
        cargo = 'ESTOQUISTA';
      } else if (element.value === Cargo.GERENTE) {
        cargo = 'GERENTE';
      } else {
        cargo = 'REVENDA';
      }
      return <span className='font-bold' style={{ color: colors.info }}>{cargo}</span>
    }

    else {
      return <div className='flex items-center justify-center'>
        {element.data.status === 'N' ?
          <i className='text-2xl cursor-pointer mr-6' style={{ color: colors.success }}><FaPlayCircle id='buttonAtive' className='' title='Ativar usuário' onClick={() => showPopupConfirmeAction(element.data, 1)} /></i>
          :
          <i className='text-2xl cursor-pointer mr-6' style={{ color: colors.error }}><FaPauseCircle id='buttonInative' className='' title='Desativar usuário' onClick={() => showPopupConfirmeAction(element.data, 2)} /></i>
        }
        <i className='text-2xl cursor-pointer' style={{ color: colors.primary }}><FaPenSquare id='buttonAction' className='' title='Editar usuário' onClick={() => onEdit(element.data)} /></i>
      </div>
    }
  }

  const columns = new Array<IColumnProps>();

  const closeModal = () => {
    setShowModal(false);
  }

  const search = (text: string) => {
    console.log(gridInstance);
    gridInstance?.option('searchPanel', { visible: false, text: text });
    // if (nome !== '') {
    //   let usuarios = dataSourceCopy.filter(produto => { return produto.nome.includes(nome) });
    //   setDataSource(usuarios);
    // } else {
    //   setDataSource(dataSourceCopy);
    // }
  }

  const showPopupConfirmeAction = (user: any, tipo: number) => {
    setUser(user);
    (tipo === 1 ? setShowPopupAtivo(true) : setShowPopupInativo(true));
  }

  const onAtive = (user: any) => {
    service.setStatus(user.id, "S").then(response => {
      let data = _.map(dataSourceCopy, (value) => {
        if (user.id === value.id) {
          value.status = 'S';
        }
        return value;
      });
      setDataSource(data);
      setShowPopupAtivo(false);
    }).catch(error => {
      setShowPopupAtivo(false);
      toast.error(error.mensagemUsuario);
    });
  }

  const onInative = (user: any) => {
    service.setStatus(user.id, "N").then(response => {
      let data = _.map(dataSourceCopy, (value) => {
        if (user.id === value.id) {
          value.status = 'N';
        }
        return value;
      });
      setDataSource(data);
      setShowPopupInativo(false);
    }).catch(error => {
      setShowPopupInativo(false);
      toast.error(error.mensagemUsuario);
    });
  }

  const onNovo = () => {
    if (!estabelecimento.id) {
      toast.error('Selecione um estabelecimento.');
      return
    }
    setShowModal(true);
    reset({ ...initialState })
    setUser(initialState);
    setRoles(RolesInitial);
  }

  const onEdit = (user: UserAplicationType) => {
    reset({ ...user });
    setValue('confirmePass', user.password);
    setUser(user);
    testRoles(user);
    setShowModal(true);
  }

  const testRoles = (user: UserAplicationType) => {
    let roleState = roles;
    if (user.roles.includes(Roles.Dashboard)) {
      roleState = roles;
      roleState.Dashboard = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.CupomFiscal)) {
      roleState = roles;
      roleState.CupomFiscal = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.NotaFiscal)) {
      roleState = roles;
      roleState.NotaFiscal = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.Usuarios)) {
      roleState = roles;
      roleState.Usuarios = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.Produto)) {
      roleState = roles;
      roleState.Produto = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.Categoria)) {
      roleState = roles;
      roleState.Categoria = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.MDE)) {
      roleState = roles;
      roleState.MDE = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.Contas)) {
      roleState = roles;
      roleState.Contas = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.PlanoContas)) {
      roleState = roles;
      roleState.PlanoContas = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.CurvaABC)) {
      roleState = roles;
      roleState.CurvaABC = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.EstoqueCritico)) {
      roleState = roles;
      roleState.EstoqueCritico = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.ExtratoVenda)) {
      roleState = roles;
      roleState.ExtratoVenda = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.ExtratoEntrada)) {
      roleState = roles;
      roleState.ExtratoEntrada = true;
      setRoles(roleState);
    }
    if (user.roles.includes(Roles.DreFinanceiro)) {
      roleState = roles;
      roleState.DreFinanceiro = true;
      setRoles(roleState);
    }
  }

  const checkRoles = (): string => {
    let rolesString: string = '';
    if (roles.Dashboard) {
      rolesString += Roles.Dashboard + "-";
    }
    if (roles.CupomFiscal) {
      rolesString += Roles.CupomFiscal + "-";
    }
    if (roles.NotaFiscal) {
      rolesString += Roles.NotaFiscal + "-";
    }
    if (roles.Usuarios) {
      rolesString += Roles.Usuarios + "-";
    }
    if (roles.Produto) {
      rolesString += Roles.Produto + "-";
    }
    if (roles.Categoria) {
      rolesString += Roles.Categoria + "-";
    }
    if (roles.MDE) {
      rolesString += Roles.MDE + "-";
    }
    if (roles.Contas) {
      rolesString += Roles.Contas + "-";
    }
    if (roles.PlanoContas) {
      rolesString += Roles.PlanoContas + "-";
    }
    if (roles.CurvaABC) {
      rolesString += Roles.CurvaABC + "-";
    }
    if (roles.EstoqueCritico) {
      rolesString += Roles.EstoqueCritico + "-";
    }
    if (roles.ExtratoVenda) {
      rolesString += Roles.ExtratoVenda + "-";
    }
    if (roles.ExtratoEntrada) {
      rolesString += Roles.ExtratoEntrada + "-";
    }
    if (roles.DreFinanceiro) {
      rolesString += Roles.DreFinanceiro + "-";
    }
    return rolesString;
  }

  const onSelctCargo = (cargo: Cargo) => {
    if (cargo === Cargo.GERENTE || cargo === Cargo.REVENDA || cargo === Cargo.MASTER || cargo === Cargo.ADMIN) {
      setRoles(RolesInitialGerente);
    } else if (cargo === Cargo.CAIXA) {
      setRoles(RolesInitialCaixa);
    } else {
      setRoles(RolesInitialEstoquista);
    }
    setUser({ ...user, cargo: cargo })

  }

  const onSave = (form: FieldValues) => {

    if (user.cpf.length > 0 && !UtilsValid.isValidCPF(UtilsGeral.removeMask(user.cpf))) {
      toast.error(UtilsGeral.getEmoji(2)+ 'Você digitou um CPF inválido');
      return
    }
    if (user.cargo == null) {
      toast.error(UtilsGeral.getEmoji(2)+ 'Você esqueceu de selecionar o cargo.');
      return
    }

    let userData = user;
    userData = {
      ...user,
      cpf:UtilsGeral.removeMask(user.cpf),
      nome: form.nome,
      email: form.email,
      password: form.password,
      celular: UtilsGeral.removeMask(user.celular),
      roles: checkRoles(),
      estabelecimento: user.cargo !== Cargo.MASTER && user.cargo !== Cargo.REVENDA ? estabelecimento.id : 1
    }

    if (!userData.id) {
      service.save(userData).then(response => {
        let array = [...dataSource];
        array.push(response);
        setDataSource(array);
        setShowModal(false);
        toast.success(UtilsGeral.getEmoji(1) + " Cadastrado com sucesso.");
      }).catch(error => {
        toast.error(UtilsGeral.getEmoji(2)+ error.mensagemUsuario);
      });
    } else {
      userData.dataCriacao = moment(userData.dataCriacao).toDate();
      userData.dataAtualizacao = moment(userData.dataAtualizacao).toDate();
      service.update(userData).then(response => {
        console.log(response);
        let array = _.map(dataSource, (user) => {
          if (user.id === response.id) {
            user = { ...response }
          }
          return user;
        });
        setDataSource(array);
        setShowModal(false);
        toast.success(UtilsGeral.getEmoji(1) + " Atualizado com sucesso.");
      }).catch(error => {
        toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario);
      });
    }

  }

  const formatDate = (date: any) => {
    if (date.value) {
      return <p>{moment(date.value, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")}</p>
    }
  }

  return <Container className='card-local p-3'>
    {/* <div className='flex p-2 card-local'>
      <div className='w-11/12'>
        <InputSearch onChange={(e) => search(e.currentTarget.value)} autoFocus />
      </div>
      <div className='w-1/12 mr-2'>
        <ButtonIcon label="Novo" icon={<FaPlus />} width={'100%'} onClick={onNovo} />
      </div>
    </div> */}
    <TableContainer>
      <DataGridDefault
        isSearch
        cssSearch='w-11/12'
        headerChildren={
          <div className='w-1/12 mr-2'>
            <ButtonIcon borderColor={colors.primary} label="Novo" icon={<FaPlus />} width={'100%'} onClick={onNovo} />
          </div>
        }
        columns={columns}
        dataSource={dataSource}
        allowSorting={false}
        paginar={false}
        // showRowLines
        rowAlternationEnabled
        showBorders
        hoverStateEnabled
        isSelectRow
      // onInitialized={(e) => setGridInstance(e.component)}
      >
        <Column dataField='codigo' caption='CÓDIGO' alignment='center' dataType='string' width={100} cssClass='font-bold column-1' sortOrder={'asc'}/>
        <Column dataField='nome' caption='NOME' alignment='left' dataType='string' cssClass='font-bold' />
        <Column dataField='cargo' caption='CARGO' alignment='center' dataType='' width={100} cellRender={renderCell} allowSearch={false} />
        <Column dataField='email' caption='E-MAIL' alignment='left' dataType='string' cssClass='font-bold column-2' width={220} />
        <Column dataField='dateCreate' caption='DATA CRIAÇÃO' alignment='center' dataType='string' width={140} allowSearch={false} cellRender={formatDate} />
        <Column dataField='telefone' caption='TELEFONE' alignment='center' dataType='date' width={120} allowSearch={false} />
        <Column dataField='acesso' caption='ACESSO' alignment='center' dataType='date' width={140} allowSearch={false} cellRender={formatDate} />
        <Column dataField='status' caption='STATUS' alignment='center' dataType='number' width={100} cellRender={renderCell} allowSearch={false} />
        <Column dataField='' caption='' alignment='center' dataType='' width={100} cellRender={renderCell} allowSearch={false} />
      </DataGridDefault>
    </TableContainer>

    {/* =============modal =========================== */}
    <ModalDefault
      isOpen={showModal}
      title='Ficha do usúario'
      onRequestClose={closeModal}
      // width='85vw'
      // margin='1%'
      // height='95%'
      // left='5%'
    >
      <FormContainer onSubmit={handleSubmit(onSave)}>
        <div className='p-2 flex'>
          <div className='w-4/12'>
            <div className='mb-5 text-left'>
              <div className='mb-2'>
                <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Principais</p>
                <Divider tipo='horizontal' />
              </div>
              <div className='flex mb-5'>
                <InputMask className='w-5/12 mr-6' label='CPF'
                  mask={'999.999.999-99'}
                  value={user.cpf}
                  onChange={(e)=>setUser({...user, cpf: e.target.value})}
                />

                <div className='w-7/12'>
                  <InputSelectDefault label='Cargo'
                    options={listCargos}
                    // defaultValue={cargos[2]}
                    value={_.find(listCargos, { 'value': user.cargo })}
                    onChange={(e) => onSelctCargo(e.value)}
                    isSearchable={false}
                    placeholder='Selecione o cargo...'
                    required
                  />
                </div>
              </div>
              <InputDefault className='w-full mr-6' label='Nome' type='text'
                required
                register={register('nome')}
                errorMessage={errors.nome?.message}
              />
            </div>

            <div className='mb-7 text-left'>
              <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Contato</p>
              <Divider tipo='horizontal' />
              <InputMask className='w-6/12 mt-1'
                label='Celular'
                mask={'(99) 9.9999-9999'}
                value={user.celular}
                onChange={(e)=>setUser({...user, celular: e.target.value})}
              />
            </div>

            <div className='text-left'>
              <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Acesso</p>
              <Divider tipo='horizontal' />
              <InputDefault className='w-full mr-6 mt-1' label='Email' type='email'
                required
                register={register('email')}
                errorMessage={errors.email?.message}
              />
              <div className='flex mt-2'>
                <InputDefault className='w-6/12 mr-6' label='Senha' type='password'
                  required
                  register={register('password')}
                  errorMessage={errors.password?.message}
                />
                <InputDefault className='w-6/12 mr-6' label='Confirme senha' type='password'
                  required
                  register={register('confirmePass')}
                  errorMessage={errors.confirmePass?.message}
                />
              </div>
            </div>

          </div>

          <Divider tipo='vertical' className='mr-3 ml-3 mt-4' />

          {user.id ? <div className='rounded-full w-28 h-10 text-center p-2 font-bold text-white absolute top-16'
            style={{ backgroundColor: user.status === 'S' ? colors.success : colors.error, left: 'calc(100% - 130px)' }}
          >
            <p>{user.status === 'S' ? 'ATIVO' : 'INATIVO'}</p>
          </div>
            :
            ""
          }
          <div id='permissoes'>
            <div className='mb-2 text-left w-full mb-3'>
              <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Permissões</p>
              <Divider tipo='horizontal' />
            </div>

            <div className='flex'>

              <div id='GERENCIA' className='mr-5'>
                <div className='text-left mb-2'>
                  <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) }} >GERENCIA</p>
                  <Divider tipo='horizontal' />
                </div>
                <div className='p-2'>
                  <InputCheck label={Roles.Dashboard + '-Dashboard'} css='mb-3 text-sm' checked={roles?.Dashboard} onChange={(e) => { setRoles({ ...roles, Dashboard: e.target.checked }) }} />
                  <InputCheck label={Roles.CupomFiscal + '-Cupom fiscal'} css='mb-3 text-sm' checked={roles?.CupomFiscal} onChange={(e) => { setRoles({ ...roles, CupomFiscal: e.target.checked }) }} />
                  <InputCheck label={Roles.NotaFiscal + '-Nota fiscal'} css='mb-3 text-sm' checked={roles?.NotaFiscal} onChange={(e) => { setRoles({ ...roles, NotaFiscal: e.target.checked }) }} />
                  <InputCheck label={Roles.Usuarios + '-Usuários'} css='mb-3 text-sm' checked={roles?.Usuarios} onChange={(e) => { setRoles({ ...roles, Usuarios: e.target.checked }) }} />
                </div>
              </div>

              <div id='ESTOQUE' className='mr-5'>
                <div className='text-left mb-2'>
                  <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) }} >ESTOQUE</p>
                  <Divider tipo='horizontal' />
                </div>
                <div className='p-2'>
                  <InputCheck label={Roles.Produto + '-Produto'} css='mb-3 text-sm' checked={roles?.Produto} onChange={(e) => { setRoles({ ...roles, Produto: e.target.checked }) }} />
                  <InputCheck label={Roles.Categoria + '-Categoria'} css='mb-3 text-sm' checked={roles?.Categoria} onChange={(e) => { setRoles({ ...roles, Categoria: e.target.checked }) }} />
                  <InputCheck label={Roles.MDE + '-MDE'} css='mb-3 text-sm' checked={roles?.MDE} onChange={(e) => { setRoles({ ...roles, MDE: e.target.checked }) }} />
                </div>
              </div>

              <div id='FINANCEIRO' className='mr-5'>
                <div className='text-left mb-2'>
                  <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) }} >FINANCEIRO</p>
                  <Divider tipo='horizontal' />
                </div>
                <div className='p-2'>
                  <InputCheck label={Roles.Contas + '-Contas'} css='mb-3 text-sm' checked={roles?.Contas} onChange={(e) => { setRoles({ ...roles, Contas: e.target.checked }) }} />
                  <InputCheck label={Roles.PlanoContas + '-Plano de contas'} css='mb-3 text-sm' checked={roles?.PlanoContas} onChange={(e) => { setRoles({ ...roles, PlanoContas: e.target.checked }) }} />
                </div>
              </div>

              <div id='RELATORIO' className='mr-5'>
                <div className='text-left mb-2'>
                  <p className='font-bold text-xs' style={{ color: (title === 'dark' ? colors.textLabel : colors.error) }} >RELATÓRIO</p>
                  <Divider tipo='horizontal' />
                </div>
                <div className='p-2'>
                  <InputCheck label={Roles.CurvaABC + '-Curva ABC'} css='mb-3 text-sm' checked={roles?.CurvaABC} onChange={(e) => { setRoles({ ...roles, CurvaABC: e.target.checked }) }} />
                  <InputCheck label={Roles.EstoqueCritico + '-Estoque crítico'} css='mb-3 text-sm' checked={roles?.EstoqueCritico} onChange={(e) => { setRoles({ ...roles, EstoqueCritico: e.target.checked }) }} />
                  <InputCheck label={Roles.ExtratoVenda + '-Extrato venda'} css='mb-3 text-sm' checked={roles?.ExtratoVenda} onChange={(e) => { setRoles({ ...roles, ExtratoVenda: e.target.checked }) }} />
                  <InputCheck label={Roles.ExtratoVenda + '-Extrato entrada'} css='mb-3 text-sm' checked={roles?.ExtratoEntrada} onChange={(e) => { setRoles({ ...roles, ExtratoEntrada: e.target.checked }) }} />
                  <InputCheck label={Roles.DreFinanceiro + '-DRE financeiro'} css='mb-3 text-sm' checked={roles?.DreFinanceiro} onChange={(e) => { setRoles({ ...roles, DreFinanceiro: e.target.checked }) }} />
                </div>
              </div>
            </div>

          </div>
          {/* <footer className=''>
            <div className="flex justify-end" style={{ bottom: 25, right: 15, position: 'absolute' }}>
              <ButtonBase label="CANCELAR" model="btn_line" className="primary-color mr-5  w-32" size="large" onClick={() => setShowModal(false)} />
              <ButtonIcon className="mr-3" label="SALVAR" icon={<FaSave />} width={'50%'} type='submit' />
            </div>
          </footer> */}
        </div>
      </FormContainer>
    </ModalDefault>

    <DialogPopupConfirme title="Confirme" isOpen={showPoupInativo} onRequestClose={() => setShowPopupInativo(false)} onClickSim={() => onInative(user)}>
      <p className="font-bold text-2xl">Tem certeza que deseja bloquear o usuário? </p>
      <p className="font-bold" style={{ color: colors.error }}>O mesmo não poderá acessar o sistema até ser liberado !</p>
    </DialogPopupConfirme>

    <DialogPopupConfirme title="Confirme" isOpen={showPoupAtivo} onRequestClose={() => setShowPopupAtivo(false)} onClickSim={() => onAtive(user)}>
      <p className="font-bold text-2xl">Tem certeza que deseja liberar o usuário? </p>
      <p className="font-bold" style={{ color: colors.error }}>O mesmo poderá acessar o sistema normalmente!</p>
    </DialogPopupConfirme>

  </Container>
}
export default Usuario;