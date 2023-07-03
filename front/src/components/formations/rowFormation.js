import React, { useState,  useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../useContext/UserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const RowFormation = ({ title, id, date, guide, instructor }) => {
  const [showModal, setShowModal] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [dataInscription, setDataInscription] = useState();
  const [timer, setTimer] = useState(null);
  const [Msg, setMsg] = useState();
  const { user } = useContext(UserContext);
  


  //ouvre le modal, crée l'inscription sans la motivation
  // timer de 3 minutes avant que le modal se ferme
  const openModal = async () => {
    console.log(user)
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
      console.log(res.data);
      setDataInscription(res.data);
      setShowModal(true);
      setTimer(
        setTimeout(() => {
          handleCloseModal();
        }, 3 * 60 * 1000)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
// met le timer à 0 
  const handleCloseModal = () => {
    setShowModal(false);
    setTimer(0);
  };


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
        window.location.reload();
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
        className="collapse"
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
