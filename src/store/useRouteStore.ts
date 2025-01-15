import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTaxiRoute, findByRankId } from "../api/RouteApi";


interface Route {
    id?: number;
}

interface RouteStoreType {
    fare: number;
    toRankId: number | null;
    routes: Route[] | null[];

    setFare: (fare: number) => void;
    setToRankId: (id: number | null) => void;
    getRankRoutes: (id: number) => void;
    addRoute: (id: number) => void
    deleteRoute: (id: number) => void

}

const useRouteStore = create<RouteStoreType>()(
    persist<RouteStoreType>(
        (set, get) => ({
            fare: 0,
            toRankId: null,
            routes: [],

            setToRankId: (id: number | null) => set({ toRankId: id }),
            setFromRankId: (id: number | null) => set({ toRankId: id }),
            setFare: (fare: number) => set({ fare }),

            getRankRoutes: async (rankId: number) => {
                console.log(rankId)
                const routes = await findByRankId(rankId)
                console.log(routes)
                set({ routes })
            },

            addRoute: async (id: number) => {
                const { fare,routes, toRankId } = get()
                const newRoute = await createTaxiRoute({
                    fare, fromRankId: id, toRankId
                })
                set({ routes: [...routes, newRoute], fare: 0, toRankId: null })
            },
            deleteRoute: (id: number) => {
                console.log(id)
                // set(state => ({...state, routes: state.routes.filter(route => route.id!==id) }))
            },
        }),
        {
            name: 'app-route-storage'
        }
    )
)

export default useRouteStore;