import {useState} from "react";

const Search = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-[100%]">
      <input placeholder="search" className="p-[10px] rounded-[20px] shadow-md"/>
    </div>
  )
}

export default Search;