
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ title, body, onConfirm, onCancel }) => {
  return (
    <BootstrapModal show={true} onHide={onCancel} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{body}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;