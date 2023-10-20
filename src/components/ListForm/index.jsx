import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ListForm = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") return;
    props.handleSubmit(value)
    setValue("")
  }

  const handleChecklistKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <label htmlFor="task-checklist"
             className="pt-[10px] pb-[10px] block">Subtasks</label>
      <div className="relative">
      <input id="task-checklist" type="text" placeholder="Add Subtask"
             value={value}
             onChange={(e) => setValue(e.target.value)}
             onKeyPress={handleChecklistKeyPress}
             className="block p-[10px] focus:outline-none rounded-[30px] border border-slate-600 min-w-full"/>
        <button onClick={handleSubmit} className="absolute right-[10px] top-[8px] p-1 bg-slate-200 rounded-full w-[30px] h-[30px] flex justify-center items-center"><FontAwesomeIcon icon={faPlus}/></button>
      </div>
    </>
  )
}

export default ListForm;