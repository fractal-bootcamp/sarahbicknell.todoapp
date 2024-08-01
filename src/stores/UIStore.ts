import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type UIStatus = 'all' | 'pending' | 'in progress' | 'completed' | 'archived';

type UIStore = {
    selectedStatus: UIStatus
    UIstatuses: UIStatus[],
    setSelectedStatus: (status: UIStatus) => void,
}

const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
    selectedStatus: "all",
    setSelectedStatus: (status) => set({selectedStatus: status}),
    UIstatuses: ['all', 'pending', 'in progress', 'completed', 'archived'],
}), 
    { name: 'uiStore', storage: createJSONStorage(() => localStorage) } 
    )
)

export default useUIStore