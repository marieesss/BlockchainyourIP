import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../useContext/UserContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const AddGuide = () => {
    const { user } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [auteur, setAuteur] = useState();
    const [titre, setTitre] = useState();
    const [résumé, setRésumé] = useState();
    const [note, setNote] = useState();

    const openModal =  () => {
        setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleCreate = async (e) => {
      e.preventDefault();
        const newFormation = {
            author: auteur,
            title: titre,
            summary: résumé,
            rate: note,
        }
    
       try {
        const res = await axios.post('http://localhost:3000/guide', newFormation,
        { headers: { token: `Bearer ${user.token}` } });
        console.log(res.data)
        
       } catch (error) {
        console.log(error)
       }
      }
      
  
  return (
    <div>
      <button className="btn btn-primary w-100" onClick={openModal}>
    Ajouter
  </button>
  <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Guide </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Titre</Form.Label>
        <Form.Control type="text" placeholder="titre" onChange={(e)=>{setTitre(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Auteur</Form.Label>
        <Form.Control type="text" placeholder="auteur"  onChange={(e)=>{setAuteur(e.target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Résumé</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="résumé"  onChange={(e)=>{setRésumé(e.target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Note</Form.Label>
        <Form.Control type="number" step="any" placeholder="1"  min={0} max={5} onChange={(e)=>{setNote(e.target.value)}} />
      </Form.Group>
      <button onClick={handleCreate} type="submit" class="button-modal">
        créer
      </button>
    </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddGuide
