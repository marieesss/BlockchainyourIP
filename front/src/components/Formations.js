import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../useContext/UserContext'
import RowFormation from './layout/rowFormation'
import AddFormation from './addFomations'
const Formations = () => {
const [data, setData] = useState();
const { user } = useContext(UserContext);


useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/formation');
        setData(res.data);
        console.log(res.data);
        console.log(user)
      } catch (error) {
        console.log('Erreur');
      }
    };

    fetchData();
}, []);

  return (
         <div className="row justify-content-center">
      <div className="col-8">
      <div id="accordion">
        { data ? data.map((formation) => (
          <div key={formation.id}>
            <RowFormation title={formation.name} id={formation.id} date={formation.date} guide={formation.guides} instructor={formation.instructor} />
          </div>
        )) : null}
      </div>
      </div>
      <div class="col-1">
        {user !== null && user.isAdmin  ? (
          <AddFormation/>
        ) : null}
      </div>
    </div>
  )
}

export default Formations
