import React, { useContext, useState } from "react";
import { Container, Footer } from "./styles";
import Modal from "react-modal";
import { ThemeContext } from "styled-components";
import { IoClose } from "react-icons/io5";
import { ButtonBase } from "../../Buttons/ButtonBase";
interface DialogPoupConfirmeProps {
  //adicionar os props
  title: "Aviso" | "Confirme";
  isOpen: boolean;
  children?: React.ReactNode;
  onRequestClose: () => void;
  onClickSim: () => void;
}

export const DialogPopupConfirme: React.FC<DialogPoupConfirmeProps> = (props) => {
  const { colors } = useContext(ThemeContext);
  return (
    <Container>
      <Modal
        isOpen={props.isOpen}
        ariaHideApp={true}
        style={{
          overlay: {
            backgroundColor: "rgba(78, 76, 76, 0.75)",
          },
          content: {
            width: "40vw",
            height: "30vh",
            left: "30vw",
            top: "30vh",
            border: 0,
            padding: 0,
            backgroundColor: colors.background,
          },
        }}
        contentElement={(props, children) => <div {...props}>{children}</div>}
        onRequestClose={() => props.onRequestClose}
      >
        <div
          className="p-2 flex justify-between"
          style={{
            background: colors.primary,
          }}
        >
          <label
            htmlFor=""
            className="font-bold"
            style={{ color: colors.textLabel }}
          >
            {props.title}
          </label>
          <IoClose
            style={{ cursor: "pointer"}}
            onClick={props.onRequestClose}
            color={colors.textLabel}
            title={'sqdq'}
            size={'22px'}
          /> 
        </div>
        <div className="w-full p-1">
          <div className="w-full h-full mb-2 p-2 text-center">{props.children}</div>
        </div>
        <Footer className="w-full p-2 grid grid-cols-2 gap-2 text-center absolute" style={{top:"10%"}}>
            <ButtonBase
              label="Não"
              model="btn_base"
              className="red-color  ml-20"
              size="small"
              onClick={props.onRequestClose}
            />
            <ButtonBase
              label="Sim"
              model="btn_base"
              className="primary-color mr-20"
              size="small"
              style={{ marginLeft: "50px" }}
              onClick={props.onClickSim}
            />
          </Footer>
      </Modal>
    </Container>
  );
};
