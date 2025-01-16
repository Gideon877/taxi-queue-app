import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Rank, RankStoreType } from "../utils/interfaces";
import { createRank, deleteRank, findRanks, updateRank, findRankById } from "../api/RankApi";

const useRankStore = create<RankStoreType>()(
    persist<RankStoreType>(
        ((set, get) => ({
            rankName: '',
            ranks: [],
            editRankId: null,
            editRankName: '',
            rank: null,
            setRankName: (rankName: string) => set({ rankName }),
            setEditRankName: (editRankName: string) => set({ editRankName }),
            setEditRankId: (editRankId: number | null) => set({ editRankId }),

            addRank: async () => {
                const { rankName, ranks } = get()
                const newRank = await createRank(rankName);
                set({ ranks: [...ranks, newRank], rankName: '' });
            },
            fetchRanks: async () => {
                try {
                    const data = await findRanks();
                    set({ ranks: data });
                } catch (error) {
                    console.error('Failed to fetch today’s queues:', error);
                }
            },
            updateRank: async () => {
                try {
                    const { editRankId, editRankName, ranks } = get();
                    const result = await updateRank(editRankId!, editRankName);

                    const updatedRanks = ranks.map(rank =>
                        rank.id === editRankId ? { ...rank, rankName: result.rankName } : rank
                    );
                    set({ editRankId: null, editRankName: '', ranks: updatedRanks })

                } catch (error) {
                    console.error('Failed to update rank:', error);
                }
            },
            deleteRank: async (id) => {
                try {
                    const { ranks } = get();
                    const result = await deleteRank(id);
                    console.log(result);
                    set({ ranks: ranks.filter(rank => rank.id !== id) });
                } catch (error) {
                    console.error('Failed to delete rank:', error);

                }
            },
            getRank: async (id: number): Promise<Rank | null> => {
                try {
                    const rank = await findRankById(id);
                    set({ rank });
                    return rank;
                } catch (error) {
                    console.error('Failed to fetch rank:', error);
                    return null;
                }
            },
        })),
        {
            name: 'app-rank-storage'
        }
    )
)

export default useRankStore;