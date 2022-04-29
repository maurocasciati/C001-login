import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from 'react-bootstrap';
import { ModalContext } from "../context/modal.context";

const ProfileModal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
   
  return modal ? ReactDOM.createPortal(
    <>
      <Modal show={modal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
  document.querySelector("#modal"))
  : null;
}

export default ProfileModal;