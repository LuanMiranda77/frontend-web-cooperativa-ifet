import React from "react";
import { Container } from "./styles";
import { ToastContainer } from "react-toastify";
import { text } from "stream/consumers";

interface ToastDefaultProps {
  //adicionar os props
}

export const ToastDefault: React.FC<ToastDefaultProps> = () => {
  return (
    <Container>
      <ToastContainer
        className='font-bold'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};
