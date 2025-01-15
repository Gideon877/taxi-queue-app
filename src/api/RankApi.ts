import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/ranks`;


export const findRanks = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching queues:", error);
        throw error;
    }
}

export const findRankById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching rank with id ${id}:`, error);
        throw error;
    }
};

export const createRank = async (rankName: string) => {
    try {
        const response = await axios.post(BASE_URL, { rankName });
        return response.data;
    } catch (error) {
        console.error("Error creating rank:", error);
        throw error;
    }
};

export const updateRank = async (id: number, rankName?: string) => {
    try {
        console.log({id});
        
        const response = await axios.patch(`${BASE_URL}/${id}`, { rankName });
        return response.data;
    } catch (error) {
        console.error(`Error updating rank with id ${id}:`, error);
        throw error;
    }
};

export const deleteRank = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting rank with id ${id}:`, error);
        throw error;
    }
};