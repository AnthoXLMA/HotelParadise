import api from '../services/api';

export const fetchHotelInfo = async () => {
  try {
    const res = await api.get('/hotel-info');
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos hôtel :", error);
    throw error;
  }
};
