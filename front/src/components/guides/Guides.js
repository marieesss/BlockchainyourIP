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
  const { user } = useContext(UserContext);

//recupère tout les guides
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/guide');
        setData(res.data);
        console.log(res.data);
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

  return (
    <div className="row justify-content-center">
    <h1>Guides</h1>
      <div className="col-8">
        {data.map((guide) => (
          <div class="mb-2" key={guide.id} onClick={() => handleGuideClick(guide)}>
            <RowGuide title={guide.title} />
          </div>
        ))}
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
