import React from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../useContext/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendrier from '../calendrier/Calendrier';

const Menu = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();


  const handleClick =()=>{
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <div class="row justify-content-center bg-dark menu pt-5">
    <div class="col-10 text-light">
    {user ? <div> Bienvenue {user.username}</div> :null}
    <Link to={`/guides`}>
      <div class="link text-light">Guides</div>
      </Link>
      <Link to={`/formation`}>
      <div class="link text-light">Formations</div>
      </Link>
      { !user ? <Link to={`/inscription`}>
      <div class="link text-light">Inscription</div>
      </Link> : null}
      { !user ? <Link to={`/login`}> 
      <div class="link text-light">Connexion</div>
      </Link> : null }
      {user ? <Calendrier/> : null}
      {user ?<div onClick={handleClick} class="text-light">Logout</div> :null}
      </div>

    </div>
  )
}

export default Menu
