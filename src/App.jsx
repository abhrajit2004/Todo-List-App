import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if(todoString){
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, [])
  

  const saveToLocalStorage = ()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const toggleFinished = (e)=>{
    setShowfinished(!showfinished);
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]);
    setTodo('');
    saveToLocalStorage();
  }

  const handleEdit = (e, id)=>{
    let t = todos.filter(item=>item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
   setTodos(newTodos);
   saveToLocalStorage();
  }

  const handleDelete = (e, id)=>{
    let toDelete  = confirm('Are you sure you want to delete this todo?');
    if(toDelete === true) {
       let newTodos = todos.filter(item=>{
         return item.id !== id;
       });
      setTodos(newTodos);
    }
    else{
      return;
    }
    saveToLocalStorage();
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
          <h1 className='font-bold text-center text-3xl'>DailyTask - Manage your daily tasks</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='text-2xl font-bold'>Add a Todo</h2>
            <div className="flex">
              <input onChange={handleChange} value={todo} className='w-full rounded-md px-2 py-1' type="text" name="" id="" />
              <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-2 text-sm font-bold text-white rounded-md disabled:bg-violet-500'>Save</button>
            </div>
          </div>
          <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} id="show" /> 
          <label className='mx-2' htmlFor="show">Show Finished</label>
          <div className="h-[1px] opacity-15 w-[90%] mx-auto bg-black my-2"></div>
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No todos to display</div>}
             {todos.map(item=>{
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>

                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div> 
            </div>
            })}

        </div>
      </div>
    </>
  )
}

export default App
