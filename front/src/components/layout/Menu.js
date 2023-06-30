import React from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../useContext/UserContext';
import { useContext } from 'react';

const Menu = () => {
  const { user, dispatch } = useContext(UserContext);

  const handleClick =()=>{
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div class="row justify-content-center bg-success d-flex align-items-center menu">
    <div class="col-10">
    {user ? <div> Bienvenue {user.username}</div> :null}
    <Link to={`/guides`}>
      <div>Guides</div>
      </Link>
      <Link to={`/formation`}>
      <div>Formations</div>
      </Link>
      <Link to={`/inscription`}>
      <div>Inscription</div>
      </Link>
      <Link to={`/login`}>
      <div>Connexion</div>
      </Link>
      {user ?<div onClick={handleClick}>Logout</div> :null}
      </div>

    </div>
  )
}

export default Menu
