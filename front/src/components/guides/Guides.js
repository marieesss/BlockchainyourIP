import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RowGuide from './rowGuide';
import { UserContext } from '../../useContext/UserContext';
import { useContext } from 'react'
import GuideDetails from './GuideDetails';

import AddGuide from './AddGuide';
const Guides = () => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const [dataFiltre, setDataFiltre] = useState();

  const { user } = useContext(UserContext);

//recupère tout les guides
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/guide');
        setData(res.data);
      } catch (error) {
        console.log('Erreur');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
window.scrollTo(0, 0);
  }, [details]);

  const handleGuideClick = (guide) => {
    setDetails(guide);
  };

  
//filtre en fonction du nom
const searchItemsName = (searchValue) => {
  if (searchValue !== '') { 
    const filteredData = data.filter((item) => {
      return Object.values(item.title).join('').toLowerCase().includes(searchValue.toLowerCase()); 
    });
    setDataFiltre(filteredData);
  } else {
    setDataFiltre(data);
  }
};

//filtre en fonction du rate
const searchItemNumber = (searchValue) => {
  if (parseFloat(searchValue) !== 0) { 
    const filteredData = data.filter((item) => {
      const rating = parseFloat(item.rating);
      return !isNaN(rating) && rating === parseFloat(searchValue);
    });
    setDataFiltre(filteredData);
  } else {
    setDataFiltre(data);
  }
};

  return (
    <div className="row justify-content-center">
    <h1>Guides</h1>
      <div className="col-8">
      <div class="row justify-content-center">
        <input type='search' placeholder='Entrez un nom'  class=" col-4 input-user p-0 mb-3" onChange={(e) => searchItemsName(e.target.value)}></input>
        <input type='number' placeholder='0' max="5" step="0.1" class=" col-2 input-user p-0 mb-3" onChange={(e) => searchItemNumber(e.target.value)}></input>

      </div>

        {dataFiltre && dataFiltre.length > 0 ? 
          dataFiltre.map((guideFiltre)=> (
            <div class="mb-2" key={guideFiltre.id} onClick={() => handleGuideClick(guideFiltre)}>
            <RowGuide title={guideFiltre.title} />
          </div>
          ))
        : data ?
        data.map((guide) => (
          <div class="mb-2" key={guide.id} onClick={() => handleGuideClick(guide)}>
            <RowGuide title={guide.title} />
          </div>
        )) : null}
        {user !== null && user.isAdmin  ? (
          <AddGuide/>
        ) : null}
      </div>
      <div className="col-4">
       {details ? <GuideDetails guide={details} /> : null} 
      </div>
    </div>
  );
};

export default Guides;
