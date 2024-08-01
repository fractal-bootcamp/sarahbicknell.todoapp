import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type ThemeStore = {
    theme: string,
    themes: string[],
    setTheme: (theme: string) => void,
    addTheme: (theme: string) => void
}

const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
    theme: "order", 
    themes: ["order", "chaos"],
    setTheme: (theme) => set({theme}),
    addTheme: (theme: string) => set((state) => ({...state, themes: [...state.themes, theme]}))
}), 
    { name: 'themeStore', storage: createJSONStorage(() => localStorage) 
    } 
    )
)

export default useThemeStore;