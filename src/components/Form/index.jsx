import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {uid} from "uid";
import ListForm from "../ListForm"

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Form = (props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0)
  const [complexity, setComplexity] = useState(0);
  const [dueDate, setDueDate] = useState(0);
  const [checklist, setChecklist] = useState([])
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const item = {
      title,
      priority,
      complexity,
      checklist,
      dueDate
    }

    props.handleSubmit(item);
    setTitle("");
    setPriority(0)
    setComplexity(0)
    setDueDate(0)
    navigate("/");
  };

  const handleChecklistSubmit = (value) => {
    const newList = [...checklist, {
      title: value,
      isCompleted: false,
      id: uid()
    }]
    setChecklist(newList)
  }

  const completeChecklistItem = (id) => {
    const newList = checklist.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });
    setChecklist(newList)
  }

  const removeChecklistItem = (id) => {
    const newList = checklist.filter((item) => item.id !== id);
    setChecklist(newList);
  }

  useEffect(() => {
    if (props.task !== undefined) {
      setTitle(props.task.title);
      setPriority(props.task.priority);
      setComplexity(props.task.complexity);
      setDueDate(props.task.dueDate);
      setChecklist(props.task.checklist);
    }
  }, [props.task])

  return (
    <div className="bg-slate-200 min-h-screen p-[30px] flex justify-center">
      <div className="min-w-[50%] bg-white p-[20px] rounded-[20px]">
        <div className="relative">
          <Link to='/'
                className="absolute p-1 bg-slate-200 rounded-full w-[30px] h-[30px] flex justify-center items-center">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </Link>
          <h1 className="text-center text-2xl font-semibold">{props.title}</h1>
        </div>
        <form className="pt-[20px] pb-[20px]" onSubmit={handleSubmit}>
          <label htmlFor="task-name" className="pt-[10px] pb-[10px] block">Task
            Name</label>
          <input id="task-name" type="text" placeholder="Add Task..."
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="block p-[10px] focus:outline-none rounded-[30px] border border-slate-600 min-w-full"/>
          <h3 className="pt-[10px] pb-[10px]">Select Priority:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            {numbers.map((number) =>
              <div key={`priority-${number}`}
                   className="w-[10%] inline-flex items-center">
                <label htmlFor="priority"
                       className="relative flex cursor-pointer items-center rounded-full p-3">
                  <input name="priority" type='radio' value={number}
                         checked={number === priority}
                         className="peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all checked:border-blue-500 checked:bg-blue-500 hover:bg-blue-500 hover:border-blue-500"
                         onChange={(e) => setPriority(number)}/>
                  <div
                    className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 transition-opacity peer-hover:text-white peer-checked:text-white">
                    {number}
                  </div>
                </label>
              </div>)}
          </div>

          <h3 className="pt-[10px] pb-[10px]">Select Complexity:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            {numbers.map((number) =>
              <div key={`complexity-${number}`}
                   className="w-[10%] inline-flex items-center">
                <label htmlFor="complexity"
                       className="relative flex cursor-pointer items-center rounded-full p-3">
                  <input name="complexity" type='radio' value={number}
                         checked={number === complexity}
                         className="peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all checked:border-blue-500 checked:bg-blue-500 hover:bg-blue-500 hover:border-blue-500"
                         onChange={(e) => setComplexity(number)}/>
                  <div
                    className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 transition-opacity peer-checked:text-white peer-hover:text-white">
                    {number}
                  </div>
                </label>
              </div>)}
          </div>

          <label htmlFor="task-date" className="pt-[10px] pb-[10px] block">Due
            Date:</label>
          <input id="task-date" type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="block p-[10px] focus:outline-none rounded-[30px] border border-slate-600 min-w-full leading-5 flex items-center"/>

          <ListForm handleSubmit={handleChecklistSubmit}/>
          {!!checklist.length &&
            (checklist.map((item, index) =>
              <p key={item.id}
                 className={`p-2 flex items-center ml-7 border-dashed border border-t-0 border-l-0 border-r-0 ${item.isCompleted && "line-through"}`}>
                <button onClick={() => completeChecklistItem(item.id)}
                        type="button"
                        className={`p-1 border-slate-700 border mr-2 rounded-full w-[20px] h-[20px] flex justify-center items-center hover:cursor-pointer ${item.isCompleted && "bg-slate-200"}`}>
                  {item.isCompleted &&
                    <FontAwesomeIcon className="w-[10px]" icon={faCheck}/>}
                </button>
                {index + 1}. {item.title}
                <button onClick={() => removeChecklistItem(item.id)}
                        className="ml-auto p-1 bg-red-200 rounded-full w-[30px] h-[30px] flex justify-center items-center hover:cursor-pointer">
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </p>
            ))}

          <button type="submit"
                  className="py-2 px-5 hover:bg-blue-500 rounded-[30px] bg-blue-400 text-white mt-[10px]">{props.submitText}</button>
        </form>
      </div>
    </div>
  )

}
export default Form;