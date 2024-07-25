import './App.css'
import useThemeStore from './stores/themeStore'

const THEMES = {
  light: "bg-white text-black",
  dark: "bg-black text-white"
}


function ThemeSelector() {
  const {themes, theme, setTheme} = useThemeStore()

  return(
    <>
      <select onChange={(event)=> setTheme(event.target.value)}> 
      {themes.map((themeName) => (
        <option key={themeName} value={themeName}> {themeName} </option>
      ))}
      </select>
      <> theme: {theme} </>
    </>
  )
}

function App() {
  const {theme} = useThemeStore()
  
  return(
    <div> 
      <h1> TODO </h1>
      <ThemeSelector />
    </div> 
  )
}

export default App
