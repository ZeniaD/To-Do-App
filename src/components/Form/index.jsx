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
    setPriority(0);
    setComplexity(0);
    setDueDate(0);
    setChecklist([]);
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
    <div className="bg-dark-gray min-h-screen flex flex-col w-full p-8">
      <div className="max-w-[800px] w-full mx-4 p-[20px]">
        <div className="relative">
          <Link to='/'
                className="absolute p-1 border-dashed border-peach border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </Link>
          <h1 className="text-center text-2xl font-semibold text-white">{props.title}</h1>
        </div>
        <form className="pt-[20px] pb-[20px]" onSubmit={handleSubmit}>
          <label htmlFor="task-name" className="pt-[10px] pb-[10px] block text-white">Task
            Name</label>
          <input id="task-name" type="text" placeholder="Add Task..."
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="block p-[10px] focus:outline-none bg-darkish-gray rounded-lg min-w-full text-soft-silver"/>
          <h3 className="pt-[10px] pb-[10px] text-white">Select Priority:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            <SelectButtons handleChange={handlePriorityChange} value={priority} property="priority"/>
          </div>
          <h3 className="pt-[10px] pb-[10px] text-white">Select Complexity:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            <SelectButtons handleChange={handleComplexityChange} value={complexity} property="complexity"/>
          </div>
          <label htmlFor="task-date" className="pt-[10px] pb-[10px] block text-white">Due
            Date:</label>
          <input id="task-date" type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="p-[10px] focus:outline-none rounded-lg border-slate-600 bg-darkish-gray min-w-full leading-5 flex items-center text-soft-silver"/>
          <ListForm handleSubmit={handleChecklistSubmit}/>
          {!!checklist.length && (
            <div className="ml-3">
              <CheckList checklist={checklist} removeChecklistItem={removeChecklistItem} completeChecklistItem={completeChecklistItem}/>
            </div>
          )}
          <button type="submit"
                  className="py-2 px-5 hover:bg-tangerine rounded-[30px] bg-peach text-darkish-gray mt-[10px]">{props.submitText}</button>
        </form>
      </div>
    </div>
  )

}
export default Form;