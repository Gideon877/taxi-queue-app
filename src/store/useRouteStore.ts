import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTaxiRoute, deleteTaxiRoute, findByRankId, updateTaxiRoute } from "../api/RouteApi";
import {  TaxiRouteParams } from "../utils/interfaces";


interface Route extends TaxiRouteParams {
    id: number;
    toRankName: string;
    queueId: number;
}



interface RouteStoreType {
    fare: number;
    toRankId: number | null;
    routes: Route[];
    editRouteId: number | null;
    editFare: number;
    setEditFare: (editFare: number) => void;
    setFare: (fare: number) => void;
    setToRankId: (id: number | null) => void;
    getRankRoutes: (id: number) => void;
    addRoute: (id: number) => void
    deleteRoute: (id: number) => void
    updateRoute: () => void
    setEditRouteId: (id: number | null) => void
}

const useRouteStore = create<RouteStoreType>()(
    persist<RouteStoreType>(
        (set, get) => ({
            fare: 0,
            toRankId: null,
            routes: [],
            editRouteId: null,
            editFare: 0,

            setEditFare: (editFare: number) => set({ editFare }),
            setEditRouteId: (editRouteId: number | null) => set({ editRouteId }),
            setToRankId: (id: number | null) => set({ toRankId: id }),
            setFromRankId: (id: number | null) => set({ toRankId: id }),
            setFare: (fare: number) => set({ fare }),

            getRankRoutes: async (rankId: number) => {
                const routes = await findByRankId(rankId)
                set({ routes })
            },

            addRoute: async (id: number) => {
                const { fare, routes, toRankId } = get()
                if (!toRankId) return;
                const newRoute = await createTaxiRoute({
                    fare, fromRankId: id, toRankId
                })
                console.log({ newRoute })
                set({ routes: [...routes, newRoute], fare: 0, toRankId: null })
            },
            deleteRoute: async (id: number) => {
                await deleteTaxiRoute(id)
                set(state => ({...state, routes: state.routes.filter(route => route.id!==id) }))
            },

            updateRoute: async () => {
                const { editFare: fare, routes, editRouteId: routeId } = get();
                console.log({ routeId, fare })
                const updatedRoute = await updateTaxiRoute({
                    fare, routeId,
                })
                
                set({
                    routes: routes.map(route =>
                        route?.id === updatedRoute.id ? ({ ...route, fare: updatedRoute.fare }) : route
                    ),
                    fare: 0,
                    editRouteId: null,
                });
            },
        }),
        {
            name: 'app-route-storage'
        }
    )
)

export default useRouteStore;