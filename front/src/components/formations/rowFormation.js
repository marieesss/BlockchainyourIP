import React, { useState,  useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../useContext/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';



const RowFormation = ({ title, id, date, guide, instructor }) => {
  const [showModal, setShowModal] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [dataInscription, setDataInscription] = useState();
  const [timer, setTimer] = useState(null);
  const [Msg, setMsg] = useState();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { user } = useContext(UserContext);
  const location= useLocation() 


  //ouvre le modal, crée l'inscription sans la motivation
  // timer de 3 minutes avant que le modal se ferme
  const openModal = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/attendees/' + user.id,
        {
          formation: id,
          motivation: '',
          user: user.id,
        },
        { headers: { token: `Bearer ${user.token}` } }
      );
      setDataInscription(res.data);
      setShowModal(true);
      setTimer(
        setTimeout(() => {
          handleCloseModal();
        }, 3 * 60 * 1000)
      );
    } catch (error) {
      console.log("erreur");
    }
  };
  
// met le timer à 0 
  const handleCloseModal = () => {
    setShowModal(false);
    setTimer(0);
  };

  useEffect(() => {
    const currentHash = location.hash.slice(1); 
    const accordion = document.getElementById(`collapse-${currentHash}`);
    if (accordion) {
      accordion.setAttribute("class", "in collapse show");
    }
  }, [location.hash, id]);


  // envoie la confirmation de l'inscription
  const handleSubmit = (event) => {
    event.preventDefault();
    if(motivation.length>0){
      try {
        const res= axios.put(`http://localhost:8080/attendees/${dataInscription.id}/${user.id}`,{
          motivation: motivation,
        },
        { headers: { token: `Bearer ${user.token}` } })
        setTimer(0);
        setMotivation("")
        handleCloseModal();
      } catch (error) {
        if(error.request.status === 403){
          setMsg("Pas les droits merci d'essayer de vous reconnecter")
        }else if(error.request.status === 404){
          setMsg("LA requête n'a pas été trouvé")
        
      }
  
    };
    }else{
      handleCloseModal();
      setMsg("Vous avez dépassé 3 minutes")
    }
    
}
    useEffect(() => {
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('keydown', handleUserActivity);
      return () => {
        document.removeEventListener('mousemove', handleUserActivity);
        document.removeEventListener('keydown', handleUserActivity);
      };
    }, []);
  
     // Function to handle user activity and reset the timer
  const handleUserActivity = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        handleCloseModal();
      }, 3 * 60 * 1000)
    );
  };


  return (
    <div className="card">
      <div className="card-header" id={`header-${id}`}>
        <h5 className="mb-0">
          <button
            className="btn btn-link"
            data-toggle="collapse"
            data-target={`#collapse-${id}`}
            aria-expanded="false"
            aria-controls={`collapse-${id}`}
          >
            {title}
          </button>
        </h5>
      </div>

      <div
        id={`collapse-${id}`}
        className={"collapse"}
        aria-labelledby={`header-${id}`}
        data-parent="#accordion"
      >
        <div className="card-body" id={id}>
          <ul>
            <li> Date : {date}</li>
            <li>Instructeur : {instructor}</li>
            <li> Titre :{title}</li>
            <li>Guides liés
                <ul>
                  {guide.map(data=>(
                    <li>{data.title} de {data.author}</li>
                  ))}
                </ul>
            </li>

          </ul>
          { Msg ? <div> {Msg}</div> : null}
          {user ? <button onClick={openModal}> Reserver un session </button> : <Link to={`/login`}><button> Connectez vous pour vous inscrire</button></Link>}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Votre motivation en trois minutes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="motivationInput">
              <Form.Control
                type="text"
                placeholder="Votre motivation"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                minLength={100}
              />
               <small>
                {motivation.length}/100 caractères
              </small>
            </Form.Group>
            {Msg ? <div>{Msg} </div>:null}
            <Button variant="warning" type="submit">
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RowFormation;
