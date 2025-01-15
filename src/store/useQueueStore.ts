import { create } from "zustand";
import { QueueStoreType } from "../utils/interfaces";
import { persist } from "zustand/middleware";
import { getTodayQueues, onDeparture, updateQueueCount } from "../api/QueueApi";


const useQueueStore = create<QueueStoreType>()(
    persist<QueueStoreType>(
        (set, get) => ({
            passengerCount: 0,
            taxiCount: 0,
            taxiDepartedCount: 0,
            queueId: 0,

            setTaxiCount: async (taxiCount: number) => {
                try {
                    const {queueId } = get()
                    await updateQueueCount(queueId, "taxi_queue_count", taxiCount);
                    set({ taxiCount })
                } catch (error) {
                    console.error("Failed to update taxi count:", error);

                }
            },
            setTaxiDepartedCount: async (taxiDepartedCount: number) => {
                try {
                    const { queueId, taxiCount, passengerCount } = get()
                    await onDeparture(queueId);
                    set({ 
                        taxiDepartedCount ,
                        passengerCount: Math.max(passengerCount - 5, 0),
                        taxiCount: Math.max(taxiCount - 1, 0) 
                    })
                } catch (error) {
                    console.error("Failed to update taxi and passenger count on departure:", error);
                }
            },
            setPassengerCount: async (passengerCount: number) => {
                
                console.log("Passenger count", passengerCount);
                try {
                    const {queueId } = get()
                    await updateQueueCount(queueId, "passenger_queue_count", passengerCount);
                    set({ passengerCount })
                } catch (error) {
                    console.error("Failed to update passenger count:", error);

                }
            },
            setQueueId: (queueId: number) => set({ queueId }),
            fetchTodayQueues: async () => {
                try {
                    const data = await getTodayQueues();
                    const {
                        passenger_queue_count,
                        taxi_departed_count,
                        taxi_queue_count,
                        id
                    } = data;
                    set({ queueId: id, taxiCount: taxi_queue_count, passengerCount: passenger_queue_count, taxiDepartedCount: taxi_departed_count });
                } catch (error) {
                    console.error('Failed to fetch today’s queues:', error);
                }
            }
        }),
        {
            name: 'app-queue-storage'
        }
    )

)

export default useQueueStore;