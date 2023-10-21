import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {uid} from "uid";
import ListForm from "../ListForm"
import SelectButtons from "../SelectButtons";
import CheckList from "../CheckList";

const Form = (props) => {
  const [title, setTitle] = useState(props.task ? props.task.title : "");
  const [priority, setPriority] = useState(props.task ? props.task.priority : 0);
  const [complexity, setComplexity] = useState(props.task ? props.task.complexity : 0);
  const [dueDate, setDueDate] = useState(props.task ? props.task.dueDate : 0);
  const [checklist, setChecklist] = useState(props.task ? props.task.checklist : []);
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

  const handlePriorityChange = (value) => {
    setPriority(value)
  }

  const handleComplexityChange = (value) => {
    setComplexity(value)
  }

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
            <SelectButtons handleChange={handlePriorityChange} value={priority} property="priority"/>
          </div>
          <h3 className="pt-[10px] pb-[10px]">Select Complexity:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            <SelectButtons handleChange={handleComplexityChange} value={complexity} property="complexity"/>
          </div>
          <label htmlFor="task-date" className="pt-[10px] pb-[10px] block">Due
            Date:</label>
          <input id="task-date" type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="p-[10px] focus:outline-none rounded-[30px] border border-slate-600 min-w-full leading-5 flex items-center"/>
          <ListForm handleSubmit={handleChecklistSubmit}/>
          {!!checklist.length && <CheckList checklist={checklist} removeChecklistItem={removeChecklistItem} completeChecklistItem={completeChecklistItem}/>}
          <button type="submit"
                  className="py-2 px-5 hover:bg-blue-500 rounded-[30px] bg-blue-400 text-white mt-[10px]">{props.submitText}</button>
        </form>
      </div>
    </div>
  )

}
export default Form;