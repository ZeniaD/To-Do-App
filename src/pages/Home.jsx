import {useEffect} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useTodo} from "../contexts/todoContext";
import Search from "../components/Search";
import Task from "../components/Task";

const Home = () => {
  const {todos} = useTodo();

  return (
    <div className="bg-slate-200 min-h-screen gap-[30px] p-[30px] flex flex-col">
      <Search />
      <div className="flex gap-[30px] grow h-full">
        <div className="w-[60%] bg-white p-[20px] rounded-[20px]">
          <div className="relative flex gap-[10px]">
            <p className="p-[5px] min-w-[100px] text-center rounded-[20px] border border-slate-600">Filter</p>
            <p className="p-[5px] min-w-[100px] text-center rounded-[20px] border border-slate-600">Tag</p>
            <Link to='/task/add' className="absolute right-0 p-1 bg-slate-600 rounded-full w-[30px] h-[30px] flex justify-center items-center text-white">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>

          {!todos.length && <h2 className="p-[15px] text-slate-400">No Tasks. Add Tasks '+'</h2>}

          {!!todos.length && (<div className="pt-[15px] grid grid-cols-3 gap-2.5">
            {todos.map((todo) => (
              <Task key={todo.id} todo={todo}/>
            ))}
          </div>)}
        </div>
        <div className="w-[40%] bg-white p-[20px] rounded-[20px]"></div>
      </div>
    </div>
  )
}

export default Home;