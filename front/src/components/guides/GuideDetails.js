import React from 'react'
import { Link } from 'react-router-dom'

const GuideDetails = ({guide}) => {
  return (
    <div>
    <h2>Détails du guide </h2>
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
