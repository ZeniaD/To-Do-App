import {useState} from "react";

const Index = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-[100%]">
      <input placeholder="search" className="p-[10px] rounded-[20px] shadow-md"/>
    </div>
  )
}

export default Index;