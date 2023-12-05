import { Column } from "devextreme-react/data-grid";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import {
  ButtonIcon,
  DataGridDefault,
  DialogPopupConfirme,
} from "../../../../../../components";
import { EstabelecimentoType } from "../../../../../../domain";
import { initialState } from "../../../../../../store/slices/estabelecimento.slice";
import { UtilsConvert } from "../../../../../../utils/utils_convert";
import { get, setStatus } from "../../../services/SetorService";
import { TableContainer } from "./styles";

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashSharp } from "react-icons/io5";
import { UtilsGeral } from "../../../../../../utils/utils_geral";
import FormEstabelecimento from "../Form";
import ModalConfigModulo from "../config";

function ListEstabelecimentos() {
  const [dataSource, setDataSource] = useState<Array<EstabelecimentoType>>([]);
  const [estabelecimento, setEstabelecimento] =
    useState<EstabelecimentoType>(initialState);
  const { colors, title } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalModulo, setShowModalModulo] = useState<boolean>(false);
  const [showPoupAtivo, setShowPopupAtivo] = useState<boolean>(false);
  const [showPoupInativo, setShowPopupInativo] = useState<boolean>(false);

  useEffect(() => {
    get()
      .then((response) => {
        let lista = [...response];
        setDataSource(lista);
      })
      .catch((error) => {
        toast.error(error.mensagemUsuario);
      });
  }, [estabelecimento]);

  const showPopupConfirmeAction = (
    estabelecimento: EstabelecimentoType,
    tipo: number
  ) => {
    setEstabelecimento(estabelecimento);
    tipo === 1 ? setShowPopupAtivo(true) : setShowPopupInativo(true);
  };

  const onAtive = (estabelecimento: EstabelecimentoType) => {
    setStatus(estabelecimento.id, "S")
      .then((response) => {
        let data = _.map(dataSource, (value) => {
          if (estabelecimento.id === value.id) {
            value.status = "S";
          }
          return value;
        });
        setDataSource(data);
        setShowPopupAtivo(false);
        toast.success(UtilsGeral.getEmoji(1) + "Bloqueado com sucesso");
      })
      .catch((error) => {
        setShowPopupAtivo(false);
        toast.error(UtilsGeral.getEmoji(1) + error.mensagemUsuario);
      });
  };

  const onInative = (estabelecimento: EstabelecimentoType) => {
    setStatus(estabelecimento.id, "N")
      .then((response) => {
        let data = _.map(dataSource, (value) => {
          if (estabelecimento.id === value.id) {
            value.status = "N";
          }
          return value;
        });
        setDataSource(data);
        setShowPopupInativo(false);
      })
      .catch((error) => {
        setShowPopupInativo(false);
        toast.error(error.mensagemUsuario);
      });
  };

  const onNovo = () => {
    setEstabelecimento({ ...initialState });
    setShowModal(true);
  };

  const onEdit = (estabelecimento: EstabelecimentoType) => {
    setEstabelecimento({ ...estabelecimento });
    setShowModal(true);
  };

  const onShowModalModulo = (estabelecimento: EstabelecimentoType) => {
    setEstabelecimento({ ...estabelecimento });
    setShowModalModulo(true);
  };

  const renderCell = (element: any) => {
    if (element.columnIndex === 1) {
      return (
        <span className="font-bold">
          {UtilsConvert.setMaskCpfCnpj(element.value)}
        </span>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <i className="text-2xl cursor-pointer  mr-5">
            <BsPencilSquare
              color={colors.primary}
              size={20}
              title="Editar"
              onClick={() => onEdit(element.data)}
            />
          </i>
          <i className="text-2xl cursor-pointer">
            <IoTrashSharp
              color={colors.error}
              size={25}
              title="Excluir"
              onClick={() => onShowModalModulo(element.data)}
            />
          </i>
        </div>
      );
    }
  };

  return (
    <div className="card-local p-2 h-full">
      <TableContainer>
        <DataGridDefault
          isSearch
          cssSearch="w-11/12"
          headerChildren={
            <div className="w-1/12">
              <ButtonIcon
                background={colors.primary}
                label="Novo"
                icon={<FaPlus />}
                width={"100%"}
                onClick={onNovo}
              />
            </div>
          }
          dataSource={dataSource}
          allowSorting={false}
          paginar={false}
          showRowLines
          rowAlternationEnabled
          showBorders
          showColumnLines
          hoverStateEnabled
          isSelectRow
        >
          <Column
            dataField="id"
            caption="CÓDIGO"
            alignment="center"
            dataType="string"
            width={100}
            cssClass="font-bold column-1"
            sortOrder={"asc"}
          />
          <Column
            dataField="cnpjCpf"
            caption="CPF/CNPJ"
            alignment="left"
            dataType=""
            width={150}
            cellRender={renderCell}
          />
          <Column
            dataField="nome"
            caption="NOME"
            alignment="left"
            dataType="string"
            cssClass="font-bold"
          />
          <Column
            dataField=""
            caption=""
            alignment="center"
            dataType=""
            width={150}
            cellRender={renderCell}
            allowSearch={false}
          />
        </DataGridDefault>
      </TableContainer>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupInativo}
        onRequestClose={() => setShowPopupInativo(false)}
        onClickSim={() => onInative(estabelecimento)}
      >
        <p className="font-bold text-xl">
          Tem certeza que deseja bloquear o estabelecimento?{" "}
        </p>
        <p className="font-bold text-xs" style={{ color: colors.error }}>
          Todos os usuários do mesmo não poderão acessar o sistema até ser
          liberado!
        </p>
      </DialogPopupConfirme>

      <DialogPopupConfirme
        title="Confirme"
        isOpen={showPoupAtivo}
        onRequestClose={() => setShowPopupAtivo(false)}
        onClickSim={() => onAtive(estabelecimento)}
      >
        <p className="font-bold text-xl">
          Tem certeza que deseja liberar o estabelecimento?{" "}
        </p>
        <p className="font-bold text-xs" style={{ color: colors.error }}>
          Todos os usuários do mesmo acessarão o sistema normalmente
        </p>
      </DialogPopupConfirme>

      <FormEstabelecimento
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        tipo={1}
        estabelecimento={estabelecimento}
      />

      <ModalConfigModulo
        showModal={showModalModulo}
        closeModal={() => setShowModalModulo(false)}
        estabelecimento={estabelecimento}
      />
    </div>
  );
}
export default ListEstabelecimentos;
