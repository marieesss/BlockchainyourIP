import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../useContext/UserContext'
import RowFormation from './rowFormation'
import AddFormation from './addFomations'
const Formations = () => {
const [data, setData] = useState();
const [dataFiltre, setDataFiltre] = useState();

const { user } = useContext(UserContext);

//récupère toute les formations
useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/formation');
        setData(res.data);
        console.log(res.data);
        console.log(user)
      } catch (error) {
        console.log('Erreur');
      }
    };

    fetchData();
});


//filtre en fonction du nom
const searchItemsName = (searchValue) => {
  if (searchValue !== '') { 
    const filteredData = data.filter((item) => {
      return Object.values(item.name).join('').toLowerCase().includes(searchValue.toLowerCase()); 
    });
    setDataFiltre(filteredData);
  } else {
    setDataFiltre(data);
  }
};


// filtre en fonction de la date
const searchItemsDate = (searchValue) => {
  if (searchValue !== '') { 
    const filteredData = data.filter((item) => {
      return Object.values(item.date).join('').toLowerCase().includes(searchValue.toLowerCase()); 
    });
    setDataFiltre(filteredData);
  } else {
    setDataFiltre(data);
  }
};


  return (
         <div className="row justify-content-center">
         
      <div class="row justify-content-center">
        <input type='search' placeholder='Entrez un nom'  class=" col-4 input-user p-0 mb-3" onChange={(e) => searchItemsName(e.target.value)}></input>
        <input type='date' placeholder='Entrez un nom'  class=" col-4 input-user p-0 mb-3" onChange={(e) => searchItemsDate(e.target.value)}></input>
      </div> 
      <div className="col-8">
      <div id="accordion">
        { dataFiltre &&  dataFiltre.length > 0 ? dataFiltre.map((formation) => (
          <div key={formation.id}>
            <RowFormation title={formation.name} id={formation.id} date={formation.date} guide={formation.guides} instructor={formation.instructor} />
          </div>
        )) : 
        data ? data.map((formation) => (
          <div key={formation.id}>
            <RowFormation title={formation.name} id={formation.id} date={formation.date} guide={formation.guides} instructor={formation.instructor} />
          </div>
        )) 
        : null}
      </div>
      {user !== null && user.isAdmin  ? (
          <AddFormation/>
        ) : null}
      </div>

    </div>
  )
}

export default Formations
