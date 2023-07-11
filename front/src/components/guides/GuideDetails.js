import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"
import axios from 'axios'
import { useState} from 'react'



const GuideDetails = ({guide}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response =await axios.get(`http://localhost:8080/guide/pdf/${guide.id}`);

      // Créer une URL de l'objet Blob pour le téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Créer un lien de téléchargement et cliquer dessus pour déclencher le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${guide.title}.pdf`); // Nom du fichier de téléchargement
      document.body.appendChild(link);
      link.click();

      // Supprimer l'URL de l'objet Blob après le téléchargement
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier PDF :', error);
      setIsDownloading(false);
    }
  };

  return (
    <div class="detail-guide">
    <h2 class="text-center">Détails du guide </h2>
      <div> <h3 class="text-center">{guide.title} </h3></div>
      <div> {guide.summary} </div>
      <div> {guide.rating}/5 </div>
      <ul>
      {guide.formations ?

        guide.formations.map((formation) =>(
        <Link to={`/formation#header-${formation.id}`}>
        <li>{formation.name}</li>
        </Link>
        ))
       : null}
       </ul>
       <button onClick={handleDownload}>Telecharger PDF</button>
    </div>
  )
}

export default GuideDetails
