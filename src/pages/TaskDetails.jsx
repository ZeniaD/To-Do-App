import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import {useTask} from "../contexts/TaskContext";
import CheckList from "../components/CheckList";
import {formatDate} from "../utils/formatDate";
import {bgColor} from "../utils/bgColor";

const TaskDetails = () => {
  const {editTask, handleComplete, handleRemove, getTask} = useTask();
  const {id} = useParams();
  const task = getTask(id);
  const navigate = useNavigate();

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

  const handleRemoveClick = () => {
    handleRemove(task.id);
    navigate("/");
  }

  const progress = Math.floor(( task.checklist.filter((item) => item.isCompleted === true).length / task.checklist.length) * 100);

  return (
    <div className="bg-dark-gray min-h-screen flex flex-col w-full p-8">
      <div className="max-w-[800px] w-full mx-4 p-[20px] flex">
        <div className="flex-col max-w-[50px]">
          <Link to='/'
                className="p-1 border-dashed border-peach border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </Link>
        </div>
        <div className="ml-4 min-w-[450px]">
          <div className="relative mb-2">
            <h1 className="mr-24 text-2xl font-semibold text-white">{task.title}</h1>
            <Link to={`/task/edit/${task.id}`}
                  className="absolute right-[40px] top-0 p-1 opacity-60 hover:opacity-100 border-dashed border-royal-blue border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white">
              <FontAwesomeIcon className="w-[12px]" icon={faPenToSquare}/></Link>
            <button className="absolute right-0 top-0 p-1 opacity-60 hover:opacity-100 border-dashed border-scarlet border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white" type="button"
                    onClick={handleRemoveClick}>
              <FontAwesomeIcon className="w-[10px]" icon={faTrashCan}/>
            </button>
          </div>
          <p className="text-light-gray mb-4">Due Date: {formatDate(task.dueDate)}</p>
          <span className={`text-sm text-slate-950 py-[5px] px-[8px] border inline-block border-transparent rounded-[20px] mr-2 mb-4 ${bgColor[task.priority]}`}>Priority: {task.priority}</span>
          <span className="text-sm text-slate-800 py-[5px] px-[8px] border inline-block border-transparent rounded-[20px] mr-2 mb-4 bg-white ">Complexity: {task.complexity}</span>
          <span className={`text-sm py-[5px] px-[8px] border rounded-[20px] inline-block mb-4 ${task.isCompleted ? "border-fresh-green bg-fresh-green text-darkish-gray" : "border-light-gray text-light-gray"}`}>Status:
            <select className="appearance-none ml-2 focus:outline-none hover:cursor-pointer bg-transparent" onChange={toggleSelect}>
              <option value="Completed" selected={task.isCompleted}>Completed</option>
              <option value="In progress" selected={!task.isCompleted}>In Progress</option></select>
          </span>

          {!!task.checklist.length && (
            <div className="max-w-[450px]">
              <p className="text-white">Progress</p>
              <div className="w-full h-1 relative my-1">
                <span className={`w-full h-1 absolute right-0 top-0 rounded-sm opacity-20 ${bgColor[task.priority]}`}></span>
                <span className={`rounded-sm h-1 block ${bgColor[task.priority]} opacity-100 relative`}
                      style={{width: `${progress}%`}}></span>
              </div>
              <p className="text-right text-white mb-4">{progress}%</p>
              <div>
                <CheckList checklist={task.checklist} removeChecklistItem={removeChecklistItem} completeChecklistItem={completeChecklistItem}/>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default TaskDetails;