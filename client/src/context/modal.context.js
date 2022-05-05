import React from "react";
import ProfileModal from "../components/profile.modal";
import useModal from "../hooks/useModal";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <ProfileModal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };