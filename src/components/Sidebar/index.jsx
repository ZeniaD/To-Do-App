import {useState} from "react";
import {Link} from "react-router-dom";
import {useTask} from "../../contexts/TaskContext";

const Sidebar = () => {
  const [display, setDisplay] = useState("today");
  const {tasks} = useTask();

  const handleDisplay = (value) => {
    setDisplay(value)
  }

  const getFilteredList = (list) => {
    let newList = tasks;
    const currentDate = new Date();
    if (display === "today") {
      newList = list.filter((item) => item.dueDate === currentDate.toISOString().split('T')[0])
    } else if (display === "overdue") {
      newList = list.filter((item) => item.dueDate < currentDate.toISOString().split('T')[0])
    } else {
      const inWeek = new Date(currentDate);
      inWeek.setDate(currentDate.getDate() + 7);
      const formattedDate = inWeek.toISOString().slice(0, 10);
      newList = list.filter((item) => item.dueDate > currentDate.toISOString().split('T')[0] && item.dueDate < formattedDate)
    }

    return newList;
  }


  const filteredList = getFilteredList(tasks);

  return (
    <div>
      <div className="mb-3">
      <div className="inline-flex items-center">
        <input
          id="today"
          name="task-list"
          type="radio"
          className="peer relative h-5 w-5 cursor-pointer appearance-none"
          checked={display === "today"}
          onChange={() => handleDisplay("today")}
        />
        <label
          className="mt-px border-b border-slate-300 peer-checked:border-slate-700 cursor-pointer peer-checked:text-slate-700 select-none text-gray-300"
          htmlFor="today"
        >
          Today
        </label>
      </div>
      <div className="inline-flex items-center">
        <input
          id="tomorrow"
          name="task-list"
          type="radio"
          className="peer relative h-5 w-5 cursor-pointer appearance-none"
          checked={display === "overdue"}
          onChange={() => handleDisplay("overdue")}
        />
        <label
          className="mt-px border-b border-slate-300 peer-checked:border-slate-700 cursor-pointer peer-checked:text-slate-700 select-none text-gray-300"
          htmlFor="tomorrow"
        >
          Overdue
        </label>
      </div>
      <div className="inline-flex items-center">
        <input
          id="week"
          name="task-list"
          type="radio"
          className="peer relative h-5 w-5 cursor-pointer appearance-none"
          checked={display === "week"}
          onChange={() => handleDisplay("week")}
        />
        <label
          className="mt-px border-b border-slate-300 peer-checked:border-slate-700 cursor-pointer peer-checked:text-slate-700 select-none text-gray-300"
          htmlFor="week"
        >
          This Week
        </label>
      </div>
      </div>
      <div className="flex flex-col">
        {!filteredList.length && <h2 className="p-3 m-2">No tasks due {display}</h2>}
        {!!filteredList.length && filteredList.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id} className="p-3 m-2 border border-slate-300 bg-slate-100 rounded-2xl">
            <p>{task.title}</p>
            <div className="py-2">
              <span className="text-xs text-slate-800 py-[5px] px-[8px] border border-slate-500 rounded-[20px] mr-[5px] bg-white opacity-60">Priority: {task.priority}</span>
              <span className="text-xs text-slate-800 py-[5px] px-[8px] border border-slate-500 rounded-[20px] mr-[5px] bg-white opacity-60">Complexity: {task.complexity}</span>
              <span className={`text-xs text-slate-800 py-[5px] px-[8px] border rounded-[20px] opacity-60 ${task.isCompleted ? "border-green-700 bg-green-100" : "border-slate-500"}`}>Status: {task.isCompleted ? "Completed" : "In Progress"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;