import axios from "axios";
import { RouteDetails, TaxiRouteParams, UpdateTaxiRouteParams } from "../utils/interfaces";

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

export const updateTaxiRoute = async (params: UpdateTaxiRouteParams) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${params.routeId}`, params);
        return response.data;
    } catch (error) {
        console.error(`Error updating route with id: ${params.routeId}`, error);
        throw error;
    }
}

export const deleteTaxiRoute = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting route with id: ${id}`, error)
        throw error;
    }
}

export const getRouteDetailsByQueueId = async (queueId: number): Promise<RouteDetails> => {
    try {
        const response = await axios.get(`${BASE_URL}/route-details/${queueId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching route details for queue with id: ${queueId}`, error);
        throw error;
    }

}