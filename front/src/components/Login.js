import React from 'react'
import { UserContext } from '../useContext/UserContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState('');
  const { user, dispatch } = useContext(UserContext);


  const handleLogin = async (e) => {
    try {
      // Requête POST pour se connecter avec l'email et le mot de passe
      const res = await axios.post(`http://localhost:3000/users/connexion`, 
      { email, password });
      console.log(res)
  
      // Création de l'utilisateur connecté avec les données de la réponse
      const loggedInUser = {
        username: res.data.username,
        email: res.data.email,
        id: res.data.id,
        token: res.data.access_token
      };
  
      // Dispatch de l'action de connexion avec les informations de l'utilisateur connecté
      dispatch({ type: 'LOGIN', payload: loggedInUser });
      console.log(user)
    } catch (error) {
      console.log(error)
      // Gestion des erreurs de connexion
      seterrorMsg(error.response.status);
    }
  };
  
  const handleClick = (e) => {
    handleLogin();
  
    // Si l'utilisateur est connecté, naviguer vers la page "Welcome"
    if (user) {
      navigate('/guides');
    }
  };
  return (
    <div>
          <div>
      <center><h1> Se connecter</h1></center>
      <div class="row justify-content-center">
      <form class="col-6">
      <label htmlFor="email">
          Email
        </label>
        <input name="email" type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>
        <label htmlFor="email">
        Mot de passe
        </label>
        <input name="password" type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        <button class ="button-auth mt-3"onClick={handleClick}>Se connecter</button>
        { errorMsg && 
        <div class="error-message">
        <div>
        <i class="fa-regular fa-face-frown fa-xl mx-2" style={{color: "white"}}/>
          Mot de passe ou email incorrect, veuillez réessayer
          </div>
        </div>}

        <p> Pas encore inscrit ? <Link to="/inscription">Cliquez ici</Link></p>
      </form>
      </div>
      
    </div>
    </div>
  )
}

export default Login
