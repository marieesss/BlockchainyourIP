import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const EMAIL_REGEX= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Inscription = () => {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      // Vérification si l'email est valide en utilisant une expression régulière
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);
    
    useEffect(() => {
      // Vérification si le mot de passe est valide en utilisant une expression régulière
      setValidPwd(PWD_REGEX.test(password));
    
      // Vérification si le mot de passe correspond à la confirmation
      setValidMatch(password === matchPwd);
    }, [password, matchPwd]);
    
    useEffect(() => {
      // Vérification si le nom d'utilisateur est valide en utilisant une expression régulière
      setValidName(USER_REGEX.test(username));
    }, [username]);
    

  useEffect(() => {
      setErrMsg('');
  }, [username, password, matchPwd])

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Vérification de la validité de l'email, du mot de passe et 
      //du nom d'utilisateur en utilisant les expressions régulières
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PWD_REGEX.test(password);
      const v3 = USER_REGEX.test(username);
    
      if (!v1 || !v2 || !v3) {
        // Si une des validations échoue, affichage d'une alerte indiquant que les entrées sont invalides
        window.alert("Entrées invalides");
      } else {
        try {
          // Appel à l'API pour créer un compte utilisateur
          const response = await axios.post(`http://localhost:8080/users`, {
            username,
            password,
            email,
          });
    
          // Réinitialisation des valeurs des champs de saisie
          setUsername('');
          setPassword('');
          setMatchPwd('');
    
          // Affichage d'une alerte indiquant que le compte a été créé avec succès
          window.alert(`Votre compte a bien été créé ${response.data.username}`);
    
          // Redirection vers la page de connexion
          navigate("/login");
        } catch (err) {
          if (!err?.response) {
            // Si aucune réponse du serveur n'est reçue, définir un message d'erreur approprié
            setErrMsg('No Server Response');
          } else if (err.response?.data?.message) {
            // Si un message d'erreur est renvoyé par l'API, affichage de l'alerte correspondante
            window.alert(err.response?.data?.message);
          } else {
            // Si une autre erreur survient, affichage d'un message générique et affichage de l'erreur dans la console
            setErrMsg('Veuillez choisir un autre nom d\'utilisateur ou une autre adresse email');
            console.log("erreur");
          }
        }
      }
    };
    

  
  return (
      <div class="container-fluid p-0 overflow-hidden">

          <section class=" row justify-content-center">
              <p>{errMsg}</p>
            
              <form onSubmit={handleSubmit} class="col-5">
              <h1> Inscription</h1>
                  <label htmlFor="username">
                      Nom d'utilisateur
                  </label><br/>
                  <input
                      type="text"
                      id="username"
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                      aria-describedby="uidnote"
                  />
                  {username && !validName ? 
                      <p className={"instructions"}>
                  3 à 24 caractères.<br />
                      Il doit être commencé par une lettre<br />
                      Lettres, chiffres, soulignés, traits d'union autorisés.
                  </p>
                   : <div/>}
                  

                  <label htmlFor="email">
                      Email:
                  </label><br/>
                  <input
                      type="text"
                      id="email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                  />
                  {email && !validEmail ?  
                  <p>
                      8 à 24 caractères.<br />
                      Il doit être commencé par une lettre<br />
                      Lettres, chiffres, soulignés, traits d'union autorisés.
                  </p> 
                  :
                  <div/>}
                  

                  <label htmlFor="password ">
                      Mot de passe :                        
                  </label>
                  
                  <div class="pt-site-footer__submit">
                  <input
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      />

                       </div>
                  
                  {
                      password && !validPwd ? 
                      <p>                  
                      8 à 24 caractères.<br />
                      Il doit inclure minuscule, majuscule, un chiffre et un caractère spécial<br />
                      caractères utilisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
                      : <div/>

                  }
                 
                  <label htmlFor="confirm_pwd">
                  </label>
                  <div class="pt-site-footer__submit">
                  <input
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required

                  />
                   
                    </div>
                  { !validMatch ? 
                  <p id="confirmnote" >
                  
                  Doit correspondre au premier champ de saisie du mot de passe.
                  </p> 
                  : <div/>}
                  

                  <button  class="button-auth mt-4" 
                  disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>
                  Inscrivez-vous</button>
              
                  <p>
                  Déjà enregistré ?<br />
                      <Link to="/login">Se connecter</Link>
              </p>
              
              </form>
             
          </section>
  </div>
  )
}

export default Inscription
