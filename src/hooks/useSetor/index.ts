import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import { api } from "../../config/api";
import { SetorType } from "../../domain/types/setor";
import { save } from "../../module/config/pages/services/SetorService";
import { UtilsGeral } from "../../utils/utils_geral";

function useSetor() {
  const initialState: SetorType = { id: null, cnpj: "", name: "" };
  const [dataSource, setDataSource] = useState<Array<SetorType>>([]);
  const [setor, setSetor] = useState<SetorType>(initialState);
  const { colors, title } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<boolean>(false);
  const url = "api/estabelecimento";

  const loadData = async () => {
    await api
      .get(url)
      .then((resp) => {
        setDataSource(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        return Promise.reject(error.response.data[0]);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const onNovo = () => {
    setSetor({ ...initialState });
    setShowModal(true);
  };

  const onEdit = (setor: SetorType) => {
    setSetor({ ...setor });
    setShowModal(true);
  };

  const handelDelete = (params: number) => {
    api
      .put(`${url}/delete/${params}`)
      .then((resp) => {
        setAlert(false);
        toast.success(UtilsGeral.getEmoji(1) + "Deletado com sucesso!");
        loadData();
      })
      .catch((err) => {
        toast.error(UtilsGeral.getEmoji(2) + "Erro default");
      });
  };

  const onSave = async () => {
    let doc = UtilsGeral.removeMask(setor.cnpj);
    // if (!UtilsValid.isValidCNPJ(doc)) {
    //   toast.error(UtilsGeral.getEmoji(2) + " Ops! O CNPJ digitado é inválido.");
    //   return;
    // }
    setor.cnpj = doc;
    if (setor.name == "") {
      toast.error(UtilsGeral.getEmoji(2) + "Nome é obrigatorio");
      return;
    }
    save(setor)
      .then(async (response) => {
        toast.success(UtilsGeral.getEmoji(1) + "Efetuado com sucesso!");
        setShowModal(false);
        await loadData();
      })
      .catch((error) => {
        toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario);
      });
  };

  return {
    dataSource,
    setDataSource,
    setor,
    setSetor,
    colors,
    title,
    showModal,
    setShowModal,
    showAlert,
    setAlert,
    onNovo,
    onEdit,
    onSave,
    handelDelete,
  };
}

export default useSetor;
