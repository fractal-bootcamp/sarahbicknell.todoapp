import './App.css'
import {useState} from 'react'
import useThemeStore from './stores/themeStore'
import useTaskStore from './stores/taskStore'
import useUIStore from './stores/UIStore'
import {Task as TaskType} from './stores/taskStore'
import {ChevronDown, ChevronUp, Sword, Swords} from 'lucide-react'

const THEMES = {
  order: "bg-white text-black",
  chaos: "bg-black text-white"
}

function AddTaskForm() {
  const {addTasks} = useTaskStore()
  const [task, setTask] = useState({ title: '', description: '' })
  const [showForm, setShowForm] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target
    setTask((prevTask) => ({
      ...prevTask, [id]: value}))
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTasks(task)
    setTask({ title: '', description: '' })
    setShowForm(false)
  }
  return(
    <>
      {showForm && ( 
        <form className='flex flex-col mb-4' onSubmit={handleSubmit}>
          <input type="text" id="title" placeholder="Title" value={task.title} onChange={handleChange} className='flex w-1/3 border border-black p-2' />
          <input type="text" id="description" placeholder="Description" value={task.description} onChange={handleChange} className='border border-black p-2 w-full' /> 
          <button type="submit" className='border border-black p-2 mb-2 sw-fit' > Add Task </button>
        </form> 
      )} 
      {showForm || (
      <button onClick={() => setShowForm(!showForm)} className='border border-black p-2 w-fit'> Add Task </button> )}
    </>
  )
}

function TaskTabs(){
  const {statuses} = useTaskStore()
  const {selectedStatus, setSelectedStatus} = useUIStore()
  return(
    <div className="flex flex-row"> 
    {statuses.map((status) => (
      <button className="flex flex-row border border-black p-2 mb-2" key={status} onClick={()=> setSelectedStatus(status)}> {status} {selectedStatus === status? <ChevronDown /> : <ChevronUp />} </button> 
    ))}
    </div>
  )

}

function Task({task}: {task: TaskType}) {
  return(
    <div className='border border-black mb-2'>   
      <div className="flex flex-row justify-between">
        <div className='font-semibold'> {task.title} </div>
        <div className='flex flex-row'>
          <button className=" hover:text-slate-500 text-black hover:cursor-pointer rounded-md"> {task.status === 'pending'? <Sword /> : < Swords />} </button> 
          <div className=" hover:text-slate-500 text-black hover:cursor-pointer rounded-md"> <Sword /> </div>
          <div className=" hover:text-slate-500 text-black hover:cursor-pointer rounded-md"> <Sword /> </div>
          <div className=" hover:text-slate-500 text-black hover:cursor-pointer rounded-md"> <Sword /> </div>

        </div> 
      </div>
      <div> {task.description} </div>
    </div> 

  )

}

function TaskList () {
  const {tasks} = useTaskStore()
  const {selectedStatus} = useUIStore()
  
  return(
    <div> {tasks.filter(task => task.status === selectedStatus).map((task) => (
      <Task key={task.id} task={task} />
    ))} </div> 
  )
}

function ThemeSelector() {
  const {themes, theme, setTheme} = useThemeStore()

  return(
    <>
      <select onChange={(event)=> setTheme(event.target.value)} className='border border-black p-2 my-2 w-fit'>
      {themes.map((themeName) => (
        <option key={themeName} value={themeName}> {themeName} </option>
      ))}
      </select>
      <> theme: {theme} </>
    </>
  )
}

function App() {
  const {theme} = useThemeStore() as {theme: 'order' | 'chaos'}

  return(
    <div className={`flex flex-row items-center justify-center min-h-screen font-mono ${THEMES[theme]}`}> 
      <div className="flex flex-col">  
        <h1 className='text-5xl pb-10'> CLEAN YOUR ROOM BUCKO </h1>
        <div className='flex gap-2'> 
        <TaskTabs />
        <AddTaskForm />

        </div>
        <TaskList /> 
        <ThemeSelector />
      </div>
    </div> 
  )
}

export default App
