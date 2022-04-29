import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { ModalContext } from "../context/modal.context";

const ProfileModal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
   
  return modal ? ReactDOM.createPortal(
    <>
      <Modal show={modal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent?.name}'s Profile:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>Address: {modalContent?.address?.street}</ListGroup.Item>
            <ListGroup.Item>City: {modalContent?.address?.city}</ListGroup.Item>
            <ListGroup.Item>Country: {modalContent?.address?.country}</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
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