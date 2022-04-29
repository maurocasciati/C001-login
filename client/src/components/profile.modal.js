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
          <Modal.Title>{modalContent.name}'s Profile:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>Username: {modalContent.username}</ListGroup.Item>
            <ListGroup.Item>Password: {modalContent.password}</ListGroup.Item>
            <ListGroup.Item>Address: {modalContent.address}</ListGroup.Item>
            <ListGroup.Item>City number: {modalContent.cityId}</ListGroup.Item>
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