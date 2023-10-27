import {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useTask} from "../../contexts/TaskContext";
import {bgColor} from "../../utils/bgColor"
import DisplayTab from "../DisplayTab";

const Sidebar = () => {
  const [display, setDisplay] = useState("Today");
  const {tasks} = useTask();

  const handleDisplay = (value) => {
    setDisplay(value)
  }

  const getFilteredList = (list) => {
    let newList;
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    if (display === "Today") {
      newList = list.filter((item) => item.dueDate === formattedCurrentDate);
    } else if (display === "Overdue") {
      newList = list.filter((item) => item.dueDate < formattedCurrentDate);
    } else {
      const endOfWeek = new Date(currentDate);
      endOfWeek.setDate(currentDate.getDate() + (7 + (7-currentDate.getDay())) % 7);
      const formattedEndOfWeek = endOfWeek.toISOString().slice(0, 10);
      newList = list.filter((item) => item.dueDate >= formattedCurrentDate && item.dueDate <= formattedEndOfWeek);
    }

    return newList;
  }

  const filteredList = getFilteredList(tasks).sort((a, b) => a.isCompleted - b.isCompleted);

  return (
    <div className="w-[30%] max-w-[300px] min-w-[300px] py-8 px-4 bg-darker-gray">
      <div className="mb-3">
        <DisplayTab handleDisplay={handleDisplay} display={display} value="Today"/>
        <DisplayTab handleDisplay={handleDisplay} display={display} value="Overdue"/>
        <DisplayTab handleDisplay={handleDisplay} display={display} value="This Week"/>
      </div>
      <div className="flex flex-col">
        {!filteredList.length && <h2 className="p-3 m-2 text-white">No Tasks {display}</h2>}
        {!!filteredList && filteredList.map((task, index) => (
          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                      transition={{duration: .5, delay: index * 0.3}} key={task.id}
                      className="p-3 m-2 bg-darkish-gray rounded-xl">
            <Link to={`/task/${task.id}`}>
              <span
                className={`text-xs pt-[5px] mb-2 block ${task.isCompleted ? "text-fresh-green" : "text-light-gray"}`}>Status: {task.isCompleted ? "Completed" : "In Progress"}</span>
              <p className="text-white mb-2">{task.title}</p>
              <span
                className={`text-xs text-darkish-gray py-[5px] px-[8px] inline-block rounded-[20px] mr-2 mb-2 ${bgColor[task.priority]}`}>Priority: {task.priority}</span>
              <span
                className="text-xs text-white py-[5px] px-[8px] inline-block rounded-[20px] bg-light-gray mb-2">Complexity: {task.complexity}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;