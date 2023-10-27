import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ListForm = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    props.handleSubmit(value);
    setValue("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <label htmlFor={props.id}
             className="pt-2 pb-2 block text-white mt-2">{props.title}</label>
      <div className="flex items-center">
        <input id={props.id} type="text" placeholder={`Add ${props.title}`}
               value={value}
               onChange={(e) => setValue(e.target.value)}
               onKeyPress={handleKeyPress}
               className="block p-2 focus:outline-none rounded-lg bg-darkish-gray text-soft-silver w-full"/>
        <button onClick={handleSubmit}
                className="top-[8px] ml-3 p-1 border-peach border-dashed border rounded-full w-[30px] h-[30px] flex justify-center items-center text-white">
          <FontAwesomeIcon icon={faPlus}/></button>
      </div>
    </>
  )
}

export default ListForm;