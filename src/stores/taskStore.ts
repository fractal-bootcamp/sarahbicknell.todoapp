import { create } from "zustand";

let nextId = 1;

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'archived';
    createdAt: number;
    updatedAt: number;
  }

type NewTask = Omit<Task, 'id' | 'status' | 'createdAt' | 'updatedAt'>;


type TaskStore = {
    task: Task,
    tasks: Task[],
    statuses: string[],
    addTasks: (newTask: NewTask) => void,
    updateTask: (task: Task) => void,
    deleteTask: (task: Task) => void,
}

const useTaskStore = create<TaskStore>((set) => ({
    task: { id: 1, title: "clean room", description: "", status: "pending", createdAt: 0, updatedAt: 0 },
    tasks: [
        { id: 1, title: "clean room", description: "", status: "pending", createdAt: 0, updatedAt: 0 },
        { id: 2, title: "save father from underworld", description: "", status: "pending", createdAt: 0, updatedAt: 0 }
    ],
    statuses: ['pending', 'in progress', 'completed', 'archived'],
    addTasks: (task) => set((state) => ({
        tasks: [...state.tasks, {
          ...task,
          id: nextId++,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          status: 'pending'
        }]
      })),
    updateTask: (task) => set((state ) => ({tasks: state.tasks.map((t) => t.id === task.id ? task : t)})), 
    deleteTask: (task) => set((state ) => ({tasks: state.tasks.filter((t) => t.id !== task.id)}))
}))

export default useTaskStore