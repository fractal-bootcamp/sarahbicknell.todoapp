import './App.css'
import useThemeStore from './stores/themeStore'
import useTaskStore from './stores/taskStore'

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

function TaskList () {
  const {tasks} = useTaskStore()
  return(
    <div> {tasks.map((task) => (
      <div key={task} value={task}>  • {task} </div> 
    ))} </div> 
  )
}

function App() {
  const {theme} = useThemeStore() as {theme: 'light' | 'dark'}

  return(
    <div className={`flex flex-row items-center justify-center min-h-screen font-mono ${THEMES[theme]}`}> 
      <div className="flex flex-col">  
        <h1 className='text-5xl pb-10'> TODO </h1>
        <ThemeSelector />
        <TaskList /> 
      </div>
    </div> 
  )
}

export default App
