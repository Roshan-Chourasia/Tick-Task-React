import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const saveToLS = (todostosave) => {
    localStorage.setItem("todos", JSON.stringify(todostosave))
  }

  const toggelFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => {
      return i.id === id
    })
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(newTodos);
    settodo("");
    saveToLS(newTodos);
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {

    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLS(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-[#467599] my-5 p-5 rounded-2xl text-white min-h-[90vh] md:w-1/2">
        <h1 className='text-3xl py-2 font-bold justify-center text-center'>Welcome! Organize, Tick, and Triumph with TickTask</h1>
        <div className="addtask my-5 flex flex-col gap-3">
          <h2 className='font-bold text-lg mx-2'> Add Task</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white rounded-full text-black px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-[#D64045] rounded-full p-2 py-1 text-sm w-1/3 mx-auto cursor-pointer hover:bg-[#E0A09F] font-bold disabled:bg-gray-600'>ADD</button>
        </div>
        <label className='font-bold'>
          <input onChange={toggelFinished} type="checkbox" checked={showFinished} className='my-3 cursor-pointer' />  Show Finished
        </label>
        <h2 className='font-bold py-2 text-2xl'>Organize Your Day, One Tick at a Time</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-bold text-2xl py-4'>All done - tick-tacular work!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 items-center gap-4 bg-[#3A6484] p-3 rounded-lg">
              <div className="flex gap-3 flex-1 min-w-0 items-start">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className="flex-shrink-0 mt-1.5" />
                <div className={item.isCompleted ? "line-through break-words flex-1 overflow-hidden" : "break-words flex-1 overflow-hidden"}><p className="text-sm">{item.todo}</p></div>
              </div>
              <div className="btn flex gap-2 ml-4 flex-shrink-0">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='p-1.5 bg-[#D64045] rounded-md hover:bg-[#E0A09F] text-sm'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='p-1.5 bg-[#D64045] rounded-md hover:bg-[#E0A09F] text-sm'><RiDeleteBin6Line /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
