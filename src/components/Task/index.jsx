import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck as faCircleOutline} from "@fortawesome/free-regular-svg-icons";
import {useTask} from "../../contexts/TaskContext";
import {Link} from "react-router-dom";

const formatDate = (date) => {
  const dateArr = date.split("-");
  const d = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
  return d.toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"long"});
}

const bgColor = {
  0: "bg-slate-200",
  1: "bg-gray-300",
  2: "bg-sky-200",
  3: "bg-blue-200",
  4: "bg-green-200",
  5: "bg-emerald-200",
  6: "bg-indigo-200",
  7: "bg-amber-200",
  8: "bg-orange-200",
  9: "bg-pink-200",
  10: "bg-red-200"
}

const progressColor = {
  0: "bg-slate-800",
  1: "bg-gray-800",
  2: "bg-sky-800",
  3: "bg-blue-800",
  4: "bg-green-800",
  5: "bg-emerald-800",
  6: "bg-indigo-800",
  7: "bg-amber-800",
  8: "bg-orange-800",
  9: "bg-pink-800",
  10: "bg-red-800"
}

const Task = ({task}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {handleComplete, handleRemove} = useTask();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const progress = Math.floor(( task.checklist.filter((item) => item.isCompleted === true).length / task.checklist.length) * 100);

  return (
    <div className={`w-full min-h-[200px] rounded-[20px] p-[15px] relative ${task.isCompleted ? "bg-emerald-100 line-through" : bgColor[task.priority]}`}>
      <div className="relative">
        <span className="text-teal-900 opacity-80 text-xs">{formatDate(task.dueDate)}</span>
        <div className="absolute right-0 top-0 right-0">
          <button onClick={() => handleComplete(task.id)} className="w-[25px] h-[25px] hover:scale-125 transition-all">
            {task.isCompleted ? <FontAwesomeIcon icon={faCircleCheck} />: <FontAwesomeIcon icon={faCircleOutline} />}
          </button>
          <button onClick={toggleMenu} className="w-[25px] h-[25px] hover:scale-125 transition-all" type="button">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <div className={`z-10 absolute right-0 top-[25px] right-0 bg-white w-[100px] rounded-[8px] p-[10px] ${showMenu ? "" : "hidden"}`}>
          <Link to={`/task/edit/${task.id}`} className="block w-full text-blue-900 hover:text-blue-700 text-left"><FontAwesomeIcon className="pr-[5px]" icon={faPenToSquare}/> Edit</Link>
          <button className="block w-full  text-rose-700 hover:text-rose-500 text-left" type="button" onClick={() => handleRemove(task.id)}><FontAwesomeIcon className="pr-[5px]" icon={faTrashCan}/> Delete</button>
        </div>
      </div>
      <div className="text-center py-[15px]">
        <p className="text-lg font-semibold mb-[8px] capitalize">{task.title}</p>
        <span className="text-sm text-slate-800 py-[5px] px-[8px] rounded-[20px] mr-[5px] bg-white opacity-60">Priority: {task.priority}</span>
        <span className="text-sm text-slate-800 py-[5px] px-[8px] rounded-[20px] bg-white opacity-60">Complexity: {task.complexity}</span>
      </div>
      <div>
        <p>Progress</p>
        <div className="w-full h-1 bg-white rounded-sm my-1">
          <span className={`rounded-sm h-1 block ${progressColor[task.priority]}`} style={{width: `${progress}%`}}></span>
        </div>
        <p className="float-right">{progress}%</p>
      </div>
    </div>
  )
}

export default Task;