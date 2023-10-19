import React from 'react';
import { Modal } from 'react-bootstrap';

const ImageModal = ({ image, onHide }) => {
  return (
    <Modal show={image !== null} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{image?.user.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image?.urls.full} alt={image?.alt_description} className="img-fluid" />
        <div className="take">
        <p className='pol'><i class="zmdi zmdi-thumb-up"></i> {image?.likes}</p>
        <p>{image?.user.name}</p>
        <p>Username : {image?.user.username}</p>
        <p>Portfolio : {image?.user.links.portfolio}</p>
        </div>
       
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;