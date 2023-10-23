import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import {useTask} from "../contexts/TaskContext";
import CheckList from "../components/CheckList";
import {formatDate} from "../utils/formatDate";

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

const TaskDetails = () => {
  const {editTask, handleComplete, getTask} = useTask();
  const {id} = useParams();
  const task = getTask(id);

  const toggleSelect = () => {
    handleComplete(task.id);
  }

  const removeChecklistItem = (id) => {
    const newList = task.checklist.filter((item) => item.id !== id);
    editTask(task.id, {checklist : [ ...newList]});
  }

  const completeChecklistItem = (id) => {
    const newList = task.checklist.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });
    editTask(task.id,{checklist : [ ...newList]});
  }

  const progress = Math.floor(( task.checklist.filter((item) => item.isCompleted === true).length / task.checklist.length) * 100);

  return (
    <div className="bg-slate-200 min-h-screen p-[30px] flex justify-center">
      <div className="max-w-[800px] w-full mx-4 bg-white p-[20px] rounded-[20px]">
        <div className="relative">
          <Link to='/'
                className="absolute p-1 bg-slate-200 rounded-full w-[30px] h-[30px] flex justify-center items-center">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </Link>
          <h1 className="text-center text-2xl font-semibold">{task.title}</h1>
        </div>
        <div className="text-center pt-5">
          <span>Due Date: {formatDate(task.dueDate)}</span>
        </div>

        <div className="text-center py-5">
          <span className={`text-sm text-slate-950 py-[5px] px-[8px] border border-transparent rounded-[20px] mr-[5px] opacity-60 ${bgColor[task.priority]}`}>Priority: {task.priority}</span>
          <span className="text-sm text-slate-800 py-[5px] px-[8px] border border-slate-500 rounded-[20px] mr-[5px] bg-white opacity-60">Complexity: {task.complexity}</span>
          <span className={`text-sm text-slate-800 py-[5px] px-[8px] border rounded-[20px] opacity-60 ${task.isCompleted ? "border-green-700 bg-green-100" : "border-slate-500"}`}>Status:
            <select className="appearance-none ml-2 focus:outline-none hover:cursor-pointer bg-transparent" onChange={toggleSelect}>
              <option value="Completed" selected={task.isCompleted}>Completed</option>
              <option value="In progress" selected={!task.isCompleted}>In Progress</option></select>
          </span>
        </div>
        {!!task.checklist.length && (
          <div className="max-w-[450px] mx-auto">
            <p>Progress</p>
            <div className="w-full h-1 bg-slate-100 rounded-sm my-1">
              <span className={`rounded-sm h-1 block ${progressColor[task.priority]}`}
                style={{width: `${progress}%`}}></span>
            </div>
            <p className="text-right">{progress}%</p>
            <div>
              <CheckList checklist={task.checklist} removeChecklistItem={removeChecklistItem} completeChecklistItem={completeChecklistItem}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskDetails;