import React from "react";
import { ModalDefault } from "../../../../../components";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const ModalPayment: React.FC<Props> = ({ ...props }) => {
  return (
    <ModalDefault title="Confirmar" isOpen={props.isOpen} onRequestClose={props.onClose} left="25%" width="50%">
      <div className="text-center"></div>
    </ModalDefault>
  );
};

export default ModalPayment;
