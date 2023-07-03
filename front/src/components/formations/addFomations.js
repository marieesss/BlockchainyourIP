import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../useContext/UserContext'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddFormation = () => {
const [guides, setGuides] = useState();
const { user } = useContext(UserContext);
const [showModal, setShowModal] = useState(false);
const [instructor, setInstructor] = useState();
const [titre, setTitre] = useState();
const [date, setDate] = useState();
const [guidesLinked, setGuidesLinked] = useState([]);


const openModal =  () => {
      setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //ajoute un guide au tableau avant de le créer 
  const changeGuides = (e) => {
    const selectedGuideId = parseInt(e.target.value);
    if (isNaN(selectedGuideId) || guidesLinked.includes(selectedGuideId)) {
      return;
    }
    const updatedGuidesLinked = [...guidesLinked, selectedGuideId];
    setGuidesLinked(updatedGuidesLinked);
  };

  
// supprime un des guides du tableau avant d'ajouter une formation
  const deleteGuide = (guideId) => {
    const updatedGuidesLinked = guidesLinked.filter((guide) => guide !== guideId);
    setGuidesLinked(updatedGuidesLinked);
  };


  //crée une formation
  const handleCreate = async (e) => {
    const newFormation = {
        instructor: instructor,
        name: titre,
        date: date,
        guides: guidesLinked,
    }

   try {
    const res = await axios.post('http://localhost:8080/formation', newFormation,
    { headers: { token: `Bearer ${user.token}` } });
    handleCloseModal();
    
   } catch (error) {
    console.log("erreur")
   }
  }
  

//recupere tout les guides
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/guide');
        setGuides(res.data);
      } catch (error) {
        console.log('Erreur');
      }
    };

    fetchData();
});

  return (
    <div>
    <button className="btn btn-warning w-100" onClick={openModal}>
    Ajouter
  </button>
  <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Titre</Form.Label>
        <Form.Control type="text" placeholder="titre" onChange={(e)=>{setTitre(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Instructeur</Form.Label>
        <Form.Control type="text" placeholder="instructeur"  onChange={(e)=>{setInstructor(e.target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Date de la formation</Form.Label>
        <Form.Control type="date" name="datepic" placeholder="DateRange"  onChange={(e)=>{setDate(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titre">
        <Form.Label>Guides associés</Form.Label>
        <div class="row justify-content-center mb-2">
            {guidesLinked?.map((guide)=>(
                <div value={guide} class="col-1 bg-warning mx-2 p-0" onClick={() => deleteGuide(guide)} key={guide}>
      {guide} x
    </div>
            ))}
        </div>
        <Form.Select class="selectpicker" data-live-search="true" type="text"  onClick={changeGuides}>
        <option selected="true" disabled="disabled"> Choisir un guide</option>
            {guides?.map(item=>(
              <option value={item.id}> n°{item.id} : {item.title}</option>
            ))

            }
        </Form.Select>

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

export default AddFormation
