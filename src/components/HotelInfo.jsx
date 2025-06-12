import { useEffect, useState } from 'react';
import { fetchHotelInfo } from '../api/useHotelInfo';

function HotelInfo() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetchHotelInfo().then(setInfo).catch(console.error);
  }, []);

  if (!info) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{info.name}</h1>
      <p>{info.description}</p>
    </div>
  );
}

export default HotelInfo;
