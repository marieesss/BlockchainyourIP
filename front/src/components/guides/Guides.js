import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RowGuide from './rowGuide';
import { UserContext } from '../../useContext/UserContext';
import { useContext } from 'react'

import AddGuide from './AddGuide';
const Guides = () => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/guide');
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log('Erreur');
      }
    };

    fetchData();
  }, []);

  const handleGuideClick = (guide) => {
    setDetails(guide);
  };

  return (
    <div className="row justify-content-center">
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
        {details && <div>{details.title}</div>}
      </div>
    </div>
  );
};

export default Guides;
