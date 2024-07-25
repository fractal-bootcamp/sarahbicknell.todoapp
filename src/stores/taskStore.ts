import { create } from "zustand";

type TaskStore = {
    tasks: string[],
    addTasks: (newTask: string) => void,
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: ["clean room", "save father from underworld"],
    addTasks: (newTask) => set((state ) => ({tasks: [...state.tasks, newTask]}))
}))


export default useTaskStore