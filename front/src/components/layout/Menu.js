import React from 'react'
import { Link } from "react-router-dom";


const Menu = () => {
  return (
    <div class="row justify-content-center bg-success d-flex align-items-center menu">
    <div class="col-10">
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
      </div>

    </div>
  )
}

export default Menu
