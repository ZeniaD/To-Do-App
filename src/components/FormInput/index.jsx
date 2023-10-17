import React, {useState} from "react";

const FormInput = (props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <label htmlFor="task-name" className="pt-[10px] pb-[10px] block">{props.label}</label>
      <input id="task-name" type={props.type} placeholder={props.placeholder}
             value={value}
             onChange={(e) => setValue(e.target.value)}
             className="block p-[10px] focus:outline-none rounded-[30px] border border-slate-600 min-w-full"/>
    </>
  )
}

export default FormInput;