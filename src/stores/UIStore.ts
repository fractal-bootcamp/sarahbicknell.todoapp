import { create } from "zustand";

type UIStore = {
    selectedStatus: string,
    setSelectedStatus: (status: string) => void,
}

const useUIStore = create<UIStore>((set) => ({
    selectedStatus: "pending",
    setSelectedStatus: (status) => set({selectedStatus: status}),
}))

export default useUIStore