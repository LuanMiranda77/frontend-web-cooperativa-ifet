import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import {
  InputDefault,
  InputMask,
  ModalDefault,
} from "../../../../../../components";
import { EstabelecimentoType } from "../../../../../../domain";
import { SetorType } from "../../../../../../domain/types/setor";
import { selectStateEstab } from "../../../../../../store/slices/estabelecimento.slice";
import { UtilsGeral } from "../../../../../../utils/utils_geral";
import { UtilsValid } from "../../../../../../utils/utils_valid";
import { save } from "../../../services/SetorService";
import { FormContainer } from "./styles";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  tipo: number;
  estabelecimento?: EstabelecimentoType;
}

const FormEstabelecimento: React.FC<ModalProps> = (props) => {
  const theme = useContext(ThemeContext);
  const initialState: SetorType = { cnpj: "", name: "" };
  const estabelecimentoSelect = useSelector(selectStateEstab);
  const [estabelecimento, setEstabelecimento] = useState(props.estabelecimento);
  const [setor, setSetor] = useState<SetorType>(initialState);

  useEffect(() => {
    let estTemp;
    if (props.tipo === 1) {
      estTemp = props.estabelecimento;
      setEstabelecimento(props.estabelecimento);
    } else {
      estTemp = estabelecimentoSelect;
      setEstabelecimento(estabelecimentoSelect);
    }
  }, [estabelecimentoSelect, props.estabelecimento, props.tipo]);

  const eventClose = () => {
    props.closeModal();
  };

  const onSave = () => {
    let doc = UtilsGeral.removeMask(setor.cnpj);
    if (!UtilsValid.isValidCNPJ(doc)) {
      toast.error(UtilsGeral.getEmoji(2) + " Ops! O CNPJ digitado é inválido.");
      return;
    }

    if (setor !== undefined) {
      save(setor)
        .then((response) => {
          toast.success(UtilsGeral.getEmoji(1) + "Efetuado com sucesso!");
          setEstabelecimento({ ...response });
          eventClose();
        })
        .catch((error) => {
          toast.error(UtilsGeral.getEmoji(2) + error.mensagemUsuario);
        });
    }
  };

  return (
    <>
      <ModalDefault
        key={"modalEstab"}
        title={"Ficha Cetores"}
        isOpen={props.showModal}
        onRequestClose={eventClose}
        onClickAction={onSave}
      >
        <FormContainer>
          <InputMask
            className="mb-5 w-6/12"
            label={"CNPJ"}
            mask={"99.999.999/9999-99"}
            onChange={(e) => setSetor({ ...setor, cnpj: e.target.value })}
            value={setor.cnpj}
          />
          <InputDefault
            label="Nome"
            type="text"
            onChange={(e) => setSetor({ ...setor, name: e.target.value })}
            value={setor.name}
          />
        </FormContainer>
      </ModalDefault>
    </>
  );
};
export default FormEstabelecimento;
