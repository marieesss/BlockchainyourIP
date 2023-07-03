import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../useContext/UserContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Calendrier = () => {
    const [showModal, setShowModal] = useState(false);
    const [formations, setFormations] = useState(false);

    const { user } = useContext(UserContext);


    const openModal =  () => {
        setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:8080/attendees/'+user.id,
            { headers: { token: `Bearer ${user.token}` } });
            setFormations(res.data);
            console.log(res.data);
          } catch (error) {
            console.log('Erreur');
          }
        };
    
        fetchData();
      }, [user.id]);

  return (
    <div>
       <button className="btn btn-warning button-calendar" onClick={openModal}>
              <p>Voir mes prochaines formations</p>
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mes inscriptions aux formations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Liste des formations</h5>
            <ul>
                {formations ? formations.map(formation => (
                    <li>{formation.formation.name} le {formation.formation.date}</li>
                )) : null}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Calendrier
