import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type Status = 'pending' | 'in_progress' | 'completed' | 'archived';

type UIStore = {
    selectedStatus: Status
    setSelectedStatus: (status: Status) => void,
}

const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
    selectedStatus: "pending",
    setSelectedStatus: (status) => set({selectedStatus: status}),
}), 
    { name: 'uiStore', storage: createJSONStorage(() => localStorage) } 
    )
)

export default useUIStore