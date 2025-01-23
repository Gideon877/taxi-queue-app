import axios from 'axios';
import { DetailedStat, Stat } from '../utils/interfaces';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/stats`;

export const getStats = async ():Promise<Stat[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const getDetailedStats = async (): Promise<DetailedStat> => {
    try {
        const response = await axios.get(`${BASE_URL}/detailed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching detailed stats:', error);
        throw error;
    }
};
