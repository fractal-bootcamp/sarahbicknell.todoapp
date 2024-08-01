import './App.css'
import {useState, useEffect} from 'react'
import useThemeStore from './stores/themeStore'
import useTaskStore from './stores/taskStore'
import useUIStore from './stores/UIStore'
import {Task as TaskType} from './stores/taskStore'
import {ChevronDown, ChevronUp, Sword, Swords, Square, SquareCheck, ShieldPlus, Pen, Check} from 'lucide-react'

const THEMES = {
  order: "bg-amber-50 text-black",
  chaos: "bg-black text-white"
}

//FOR ANMIATION MOVE THIS LATER LOLL
function FlyingDragon() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const flyAround = () => {
      setPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
    };

    const interval = setInterval(flyAround, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      left: position.x,
      top: position.y,
      fontSize: '2rem',
      transition: 'all 2s ease-in-out',
      transform: `rotate(${Math.random() * 360}deg)`,
      zIndex: 9999,
    }}>
      🐉
    </div>
  );
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
      <button className="mb-2 text-4xl border border-black w-[40px]" onClick={() => setShowForm(!showForm)} > + </button> )}
    </>
  )
}

function TaskTabs(){
  const {UIstatuses, selectedStatus, setSelectedStatus} = useUIStore()
  return(
    <div className="flex flex-row"> 
    {UIstatuses.map((status) => (
      <button className="flex flex-row border border-black p-2 mb-2 h-[46px]" key={status} onClick={()=> setSelectedStatus(status)}> {status} {selectedStatus === status? <ChevronDown /> : <ChevronUp />} </button> 
    ))}
    </div>
  )
}

function Task({task}: {task: TaskType}) {
  const { updateTask, statuses } = useTaskStore()
  const [editing, setEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  function toggleComplete(){
    if (task.status === 'completed') {
      updateTask({...task, status: 'pending'})
    } else {
      updateTask({...task, status: 'completed'})
    }
  }

  const ICONS = {
    "pending": <Sword />,
    "in progress": <Swords/>,
    "completed": <Check />,
    "archived": <ShieldPlus />
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    updateTask(editedTask);
    setEditing(false);
  }

  function handleCancel() {
    setEditedTask(task);
    setEditing(false);
  }

  // function statusToggle(){
  //   const currentIndex = statuses.indexOf(task.status);
  //   const nextIndex = (currentIndex + 1) % statuses.length;
  //   updateTask({...task, status: statuses[nextIndex] as 'pending' | 'in progress' | 'completed' | 'archived'});
  // }
  //might restore this later

  return(
    <div className='border border-black mb-2'>  
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 px-2">
          <div className="self-center" onClick={toggleComplete}> 
            {task.status === 'pending' ? <Square /> : <SquareCheck />} 
          </div>
          <div className="flex flex-col"> 
            {editing ? (
              <>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="title"
                      value={editedTask.title}
                      onChange={handleEditChange}
                      className="font-semibold mb-2 border border-gray-300 p-1"
                    />
                    <textarea
                      name="description"
                      value={editedTask.description}
                      onChange={handleEditChange}
                      className="mb-2 border border-gray-300 p-1"
                    />
                    <select 
                      name="status"
                      value={editedTask.status}
                      onChange={handleEditChange}
                      className='border border-black p-2 my-2 w-fit'
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div> 
                    <div className="flex gap-2">
                      <button onClick={handleSave} title="Save" className="text-black hover:text-green-800"><Check /></button>
                      <button onClick={handleCancel} title="Cancel" className="text-black hover:text-red-800"> X </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row gap-2">
                  <div className='font-semibold'>{task.title}</div>
                  <button onClick={() => setEditing(true)}><Pen size='16px' /></button>
                </div>
                <div>{task.description}</div>
              </>
            )}
          </div> 
        </div>
        <div className='flex flex-row justify-end px-4'>
          <button>
            {ICONS[task.status]}
          </button> 
        </div> 
      </div>
    </div> 
  )
}

function TaskList () {
  const {tasks} = useTaskStore()
  const {selectedStatus} = useUIStore()
  
  return(
    <div> {tasks.filter(task => task.status === selectedStatus || selectedStatus === 'all').map((task) => (
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

function ChaosElement({ children }: { children: React.ReactNode }) {
  const randomRotation = Math.random() * 360;
  const randomX = Math.random() * 20 - 10;
  const randomY = Math.random() * 20 - 10;

  return (
    <div style={{
      transform: `rotate(${randomRotation}deg) translate(${randomX}px, ${randomY}px)`,
      transition: 'all 0.5s ease-in-out',
      display: 'inline-block',
    }}>
      {children}
    </div>
  );
}

function App() {
  const { theme } = useThemeStore() as { theme: 'order' | 'chaos' };

  const chaosStyle = theme === 'chaos' ? {
    animation: 'shake 0.5s infinite',
    fontFamily: 'mono',
  } : {};

  return (
    <div className={`flex flex-row items-center justify-center min-h-screen font-mono ${THEMES[theme]}`} style={chaosStyle}> 
      <div className="flex flex-col">  
        <h1 className='text-5xl pb-4'>
          {theme === 'chaos' ? (
            'UH OH! YOU HAVE AWOKEN THE DRAGON OF CHAOS!'
          ) : (
            'CLEAN YOUR ROOM BUCKO'
          )}
        </h1>
        <div className='flex flex-row gap-2'> 
          {theme === 'chaos' ? (
            <>
              <ChaosElement><TaskTabs /></ChaosElement>
              <ChaosElement><AddTaskForm /></ChaosElement>
            </>
          ) : (
            <>
              <TaskTabs />
              <AddTaskForm />
            </>
          )}
        </div>
        {theme === 'chaos' ? (
          <ChaosElement><TaskList /></ChaosElement>
        ) : (
          <TaskList />
        )}
        <ThemeSelector />
      </div>
      {theme === 'chaos' && (
        <>
          <FlyingDragon />
          <FlyingDragon />
          <FlyingDragon />
          <FlyingDragon />
          <FlyingDragon />
        </>
      )}
    </div> 
  )
}

export default App
