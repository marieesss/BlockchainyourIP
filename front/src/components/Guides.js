import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RowGuide from './layout/rowGuide';
const Guides = () => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState(null);

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
          <div key={guide.id} onClick={() => handleGuideClick(guide)}>
            <RowGuide title={guide.title} />
          </div>
        ))}
      </div>
      <div className="col-4">
        {details && <div>{details.title}</div>}
      </div>
    </div>
  );
};

export default Guides;
