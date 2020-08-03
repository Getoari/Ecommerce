import React, {useState, Fragment} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

function DeleteDialog(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {

        Axios.delete(`/api/products/${props.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            props.handleDelete()
            handleClose()
        })	
    }
  
    return (
      <Fragment>
        <div onClick={handleShow}>
            <i id={props.id} style={{cursor: 'pointer'}} className="far fa-trash-alt"></i>
        </div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <strong>DELETE</strong>
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
}
  
export default DeleteDialog