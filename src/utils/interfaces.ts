

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
    fare: number;
    routeDetails: RouteDetails | null; 
    setTaxiCount(value: number): void;
    setTaxiDepartedCount(value: number): void;
    setPassengerCount(value: number): void;
    setQueueId: (queueId: number) => void;
    fetchTodayQueues: () => void;
    fetchQueue: (queueId: number) => void;
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
    toRankId: number;
    fare: number;
}

export interface UpdateTaxiRouteParams {    
    routeId: number | null;
    fare: number;
}

export interface RouteDetails {
    routeId: number;
    fromRankName: string;
    toRankName: string;
    fare: number;
    passengerQueueCount: number;
    taxiQueueCount: number;
    taxiDepartedCount: number;
}

// 
export interface Stat {
    id: number;
    fare: number;
    fromRankName: string;
    toRankName: string;
    
}

export interface DetailedStat {
    highestFareRoutes: Stat[];
    frequentRoutes: Stat[];
    queuesWithMostDepartures: Stat[];
    fareByFromRank: Stat[];
}


export interface StatsStoreType {
    stats: Stat[] | null; 
    detailedStats: DetailedStat | null; 

    fetchStats: () => Promise<void>; 
    fetchDetailedStats: () => Promise<void>; 
    resetStats: () => void; 
}
