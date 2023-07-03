import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"

const GuideDetails = ({guide}) => {
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
    </div>
  )
}

export default GuideDetails
