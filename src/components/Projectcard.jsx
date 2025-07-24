import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import base_Url from '../services/base_url';

function Projectcard({project}) {
   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card onClick={handleShow} style={{ width: '18rem',marginBottom:'20px'}}>
      <Card.Img variant="top" src={`${base_Url}/projectimg/${project.image}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
       
      </Card.Body>
    </Card>

     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col">
            <img src={`${base_Url}/projectimg/${project.image}`} alt="" className='img-fluid' />

          </div>
          <div className="col">
            <h2>{project.title}</h2>
            <p>
              <span className='fw-bolder'>Description:</span>
              {project.description}

            </p>
            <p>
              <span className='fw-bolder'>Language:</span>
              {project.languages}

            </p>
            <div className="d-flex justify-content-between">
              <a href={project.gitrepo}>
                <i class="fa-brands fa-github"></i>
              </a>
              <a href={project.demo}>
                <i class="fa-solid fa-link"></i>
              </a>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      </>

    
  )
}

export default Projectcard
