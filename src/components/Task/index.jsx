import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck as faCircleOutline} from "@fortawesome/free-regular-svg-icons";
import {useTodo} from "../../contexts/TodoContext.jsx";
import {useNavigate} from "react-router-dom";

const formatDate = (date) => {
  const dateArr = date.split("-");
  const d = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
  return d.toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"long"});
}

const Task = ({todo}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {handleComplete, handleRemove} = useTodo();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const editTask = () => {
    navigate("/task/add", {state: {task:todo}})
  }

  return (
    <div className={`w-full min-h-[200px] rounded-[20px] p-[15px] relative ${todo.isCompleted ? "bg-emerald-100 line-through" :"bg-slate-200"}`}>
      <div className="relative">
        <span className="text-slate-600 text-xs">{formatDate(todo.dueDate)}</span>
        <div className="absolute right-0 top-0 right-0">
          <button onClick={() => handleComplete(todo.id)} className="w-[25px] h-[25px]">
            {todo.isCompleted ? <FontAwesomeIcon icon={faCircleCheck} />: <FontAwesomeIcon icon={faCircleOutline} />}
          </button>
          <button onClick={toggleMenu} className="w-[25px] h-[25px] hover:scale-125 transition-all" type="button">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <div className={`absolute right-0 top-[25px] right-0 bg-white w-[100px] rounded-[8px] p-[10px] ${showMenu ? "" : "hidden"}`}>
          <button className="block text-blue-900 hover:text-blue-700" type="button" onClick={editTask}><FontAwesomeIcon className="pr-[5px]" icon={faPenToSquare}/> Edit</button>
          <button className="block text-rose-700 hover:text-rose-500" type="button" onClick={() => handleRemove(todo.id)}><FontAwesomeIcon className="pr-[5px]" icon={faTrashCan}/> Delete</button>
        </div>
      </div>
      <div className="text-center py-[15px]">
        <p className="text-lg font-semibold mb-[8px] capitalize">{todo.title}</p>
        <span className="text-sm text-slate-600 py-[5px] px-[8px] rounded-[20px] mr-[5px] bg-white">Priority: {todo.priority}</span>
        <span className="text-sm text-slate-600 py-[5px] px-[8px] rounded-[20px] bg-white">Complexity: {todo.complexity}</span>
      </div>

    </div>
  )
}

export default Task;