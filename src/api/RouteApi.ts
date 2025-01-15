import axios from "axios";
import { TaxiRouteParams } from "../utils/interfaces";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/taxi-routes`;

export const findByRankId = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching taxi routes for rank with id ${id}:`, error);
        throw error;
    }
}



export const createTaxiRoute = async (params: TaxiRouteParams) => {
    try {
        const response = await axios.post(`${BASE_URL}`, params);
        return response.data;
    } catch (error) {
        console.error(`Error creating route for rank id: ${params.fromRankId}`, error);
        throw error;
    }
}