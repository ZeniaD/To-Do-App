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
             className="pt-[10px] pb-[10px] block text-white">Subtasks</label>
      <div className="flex items-center">
      <input id="task-checklist" type="text" placeholder="Add Subtask"
             value={value}
             onChange={(e) => setValue(e.target.value)}
             onKeyPress={handleChecklistKeyPress}
             className="block p-[10px] focus:outline-none rounded-lg bg-darkish-gray text-soft-silver w-full"/>
        <button onClick={handleSubmit} className="top-[8px] ml-3 p-1 border-peach border-dashed border rounded-full w-[30px] h-[30px] flex justify-center items-center text-white"><FontAwesomeIcon icon={faPlus}/></button>
      </div>
    </>
  )
}

export default ListForm;