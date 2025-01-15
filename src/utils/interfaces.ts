

export interface TaxiDepartingSectionType {
    taxiDepartedCount: number;
    onDepartTaxi:()=>  void;
}

export interface TaxiSectionType {
    taxiCount: number;
    onJoinQueue: ()=> void;
}

export interface PassengerSectionType {
    passengerCount: number;
    onJoinQueue: ()=> void;
    onLeaveQueue: ()=> void;
}

export interface QueueSectionType {
    passengerCount: number;
    taxiDepartedCount: number;
    taxiCount: number;
    id: number;
}

export interface QueueStoreType {
    passengerCount: number;
    taxiDepartedCount: number;
    taxiCount: number;
    queueId: number; 
    setTaxiCount(value: number): void;
    setTaxiDepartedCount(value: number): void;
    setPassengerCount(value: number): void;
    setQueueId: (queueId: number) => void;
    fetchTodayQueues: () => void;
}

export interface Rank {
    id: number;
    rankName: string;
}

export interface RankStoreType {
    rankName: string;
    ranks: Rank[];
    editRankId: number | null;
    editRankName: string;
    rank: Rank | null;

    setRankName: (rankName: string) => void;
    fetchRanks: () => void;
    updateRank: () => void;
    addRank: (rankName: string) => void;
    setEditRankId: (rankId: number | null) => void;
    setEditRankName: (rankName: string) => void;
    deleteRank: (rankId: number) => void;
    getRank: (rankId: number) => Promise<Rank | null>;
}

export interface TaxiRouteParams {
    fromRankId: number;
    toRankId: number | null;
    fare: number;
}