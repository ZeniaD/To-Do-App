import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical, faEye,
  faPenToSquare,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck as faCircleOutline} from "@fortawesome/free-regular-svg-icons";
import {useTask} from "../../contexts/TaskContext";
import {formatDate} from "../../utils/formatDate";
import {bgColor} from "../../utils//bgColor";

const Task = ({task}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {handleComplete, handleRemove} = useTask();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const dateIsNear = () => {
    const currentDate = new Date();
    const futureDate = currentDate.setDate(currentDate.getDate() + 2);
    return new Date(task.dueDate) <= futureDate;
  }

  const dueIsToday = () => {
    const currentDate = new Date();
    return task.dueDate === currentDate.toISOString().split('T')[0];
  }

  const progress = Math.floor(( task.checklist.filter((item) => item.isCompleted === true).length / task.checklist.length) * 100);

  return (
    <div className={`${task.isCompleted ? "before:bg-gradient-to-r before:from-peach before:to-[#ff968f] line-through" : "bg-darker-gray"} w-full min-h-[200px] flex flex-col rounded-xl p-4 relative before:content-[''] before:absolute before:h-full before:w-full before:left-0 before:top-0 before:rounded-xl before:opacity-20`}>
      <div className="relative">
        <span className={`opacity-80 text-xs ${dueIsToday() ? "text-scarlet" : "text-light-gray"}`}>{formatDate(task.dueDate)}</span>
        <div className="absolute top-0 right-0">
          <button onClick={() => handleComplete(task.id)} className="w-[25px] h-[25px] hover:scale-125 transition-all text-white">
            {task.isCompleted ? <FontAwesomeIcon icon={faCircleCheck} />: <FontAwesomeIcon icon={faCircleOutline} />}
          </button>
          <button onClick={toggleMenu} className="w-[25px] h-[25px] text-white" type="button">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        {showMenu && (<div className="z-10 absolute top-[25px] right-0 bg-darkish-gray w-[100px] rounded-[8px] p-[10px]">
          <Link to={`/task/${task.id}`} className="block w-full text-lavender opacity-80 hover:opacity-100 text-left">
            <FontAwesomeIcon className="pr-[5px] w-[12px]" icon={faEye}/> View
          </Link>
          <Link to={`/task/edit/${task.id}`}
                className="block w-full text-royal-blue opacity-80 hover:opacity-100 text-left">
            <FontAwesomeIcon className="pr-[5px] w-[12px]" icon={faPenToSquare}/> Edit</Link>
          <button className="block w-full text-scarlet opacity-80 hover:opacity-100 text-left" type="button"
                  onClick={() => handleRemove(task.id)}>
            <FontAwesomeIcon className="pr-[5px] w-[12px]" icon={faTrashCan}/> Delete
          </button>
        </div>)}
      </div>
      <div className="text-center py-[15px]">
        <Link to={`/task/${task.id}`} className="text-lg block font-semibold mb-[8px] capitalize text-white z-10 relative">{task.title}</Link>
        <span className={`text-sm text-darker-gray py-[5px] px-[8px] rounded-[20px] mr-[5px] ${bgColor[task.priority]}`}>Priority: {task.priority}</span>
        <span className="text-sm text-white py-[5px] px-[8px] rounded-[20px] bg-light-gray">Complexity: {task.complexity}</span>
      </div>
      {!!task.checklist.length && (<div>
        <p className="text-white">Progress</p>
        <div className="w-full h-1 relative my-1">
          <span className={`w-full h-1 absolute right-0 top-0 rounded-sm opacity-20 ${bgColor[task.priority]}`}></span>
          <span className={`rounded-sm h-1 block ${bgColor[task.priority]} opacity-100 relative`}
                style={{width: `${progress}%`}}></span>
        </div>
        <p className="float-right text-white">{progress}%</p>
      </div>)}

      {dateIsNear() && (
          <div className="mt-auto">
            <span className="text-sm py-[5px] float-right rounded-[20px] text-scarlet">Less than 3 Days</span>
          </div>
      )}
    </div>
  )
}

export default Task;