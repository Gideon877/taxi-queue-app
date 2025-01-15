import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/queues`;

export const getQueues = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching queues:", error);
        throw error;
    }
}

export const getTodayQueues = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/today`);
        return response.data;
    } catch (error) {
        console.error("Error fetching queues:", error);
        throw error;
    }
}


export const updateQueueCount = async (queueId: number, field: string, count: number) => {
    try {
        const response = await axios.put(BASE_URL, {
            queueId,
            field,
            count,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating queue count:", error);
        throw error;
    }
};

export const onDeparture = async (queueId: number) => {
    try {
        const response = await axios.put(`${BASE_URL}/departure/${queueId}`);
        return response.data;
    } catch (error) {
        console.error("Error on departure:", error);
        throw error;
    }
};