import { create } from "zustand";

type ThemeStore = {
    theme: string,
    themes: string[],
    setTheme: (theme: string) => void,
    addTheme: (theme: string) => void
}

const useThemeStore = create<ThemeStore>((set) => ({
    theme: "order", 
    themes: ["order", "chaos"],
    setTheme: (theme) => set({theme}),
    addTheme: (theme: string) => set((state) => ({...state, themes: [...state.themes, theme]}))
}))

export default useThemeStore;