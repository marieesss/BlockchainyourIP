import React from 'react'
import "../../App.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
    <div class="row justify-content-center bg-secondary header align-content-center">
      <h1 class="text-light text-center">
      <Link to="/" class="text-light">
      Site Web
      </Link>
      </h1>
    </div>
    </div>
  )
}

export default Header
