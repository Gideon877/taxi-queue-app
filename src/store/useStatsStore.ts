import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StatsStoreType } from "../utils/interfaces";
import { getStats, getDetailedStats } from "../api/StatsApi"; 

const useStatsStore = create<StatsStoreType>()(
    persist<StatsStoreType>(
        ((set) => ({
            stats: null,
            detailedStats: null,

            fetchStats: async () => {
                try {
                    const statsData = await getStats();
                    set({ stats: statsData });
                } catch (error) {
                    console.error('Failed to fetch stats:', error);
                }
            },

            fetchDetailedStats: async () => {
                try {
                    const detailedStatsData = await getDetailedStats();
                    set({ detailedStats: detailedStatsData });
                } catch (error) {
                    console.error('Failed to fetch detailed stats:', error);
                }
            },

            resetStats: () => set({ stats: null, detailedStats: null }),

        })),
        {
            name: 'app-stats-storage',
        }
    )
);

export default useStatsStore;
