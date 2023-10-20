import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useTask} from "../contexts/TaskContext";
import Task from "../components/Task";

const Home = () => {
  const [sort, setSort] = useState("Default");
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const {tasks} = useTask();

  const sortList = (item1, item2) => {
    if (sort === "Default") {
      return;
    }
    const sortOrder = sort === "Ascending" ? 1 : -1;
    return (item1.priority - item2.priority) * sortOrder;
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  const filteredList = tasks.filter((element) => element.title.toLowerCase().includes(searchValue.toLowerCase())).sort(sortList);

  return (
    <div className="bg-slate-200 min-h-screen gap-[30px] p-[30px] flex flex-col">
      <div className="w-[100%]">
        <input placeholder="Search" className="p-[10px] rounded-[20px] shadow-md w-[350px]" onChange={(e) => setSearchValue(e.target.value)}/>
      </div>
      <div className="flex gap-[30px] grow h-full">
        <div className="w-[60%] bg-white p-[20px] rounded-[20px]">
          <div className="relative flex gap-[10px]">
            <button onClick={toggleMenu}
                    className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-slate-400 hover:border-slate-600 hover:text-slate-600 text-slate-500 flex items-center justify-between"
                    type="button">
              Sort By
              <FontAwesomeIcon icon={faAngleDown} className={`h-[12px]  mx-1 ${showMenu ? "rotate-180" : ""}`}/>
            </button>
            <div className={`absolute right-0 top-[45px] p-[10px] left-0 bg-white w-[150px] rounded-[8px] z-10 shadow-lg border border-slate-400 ${showMenu ? "" : "hidden"}`}>
              <button className="block w-full  text-slate-700 text-left hover:bg-slate-100 px-2 py-1 rounded-md" type="button" onClick={() => setSort("Default")}>Default</button>
              <button className="block w-full  text-slate-700 text-left hover:bg-slate-100 px-2 py-1 rounded-md" type="button" onClick={() => setSort("Descending")}>Top Priority</button>
              <button className="block w-full  text-slate-700 text-left hover:bg-slate-100 px-2 py-1 rounded-md" type="button" onClick={() => setSort("Ascending")}>Lowest Priority</button>
            </div>
            <p className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-slate-400 text-slate-500 flex items-center justify-between">Tag</p>
            <Link to='/task/add' className="absolute right-0 p-1 bg-slate-600 rounded-full w-[30px] h-[30px] flex justify-center items-center text-white">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>

          {!tasks.length && <h2 className="p-[15px] text-slate-400">No Tasks. Add Tasks '+'</h2>}

          {!!tasks.length && (<div className="pt-[15px] grid grid-cols-3 gap-2.5">
            {filteredList.map((task) => (
              <Task key={task.id} task={task}/>
            ))}
          </div>)}
        </div>
        <div className="w-[40%] bg-white p-[20px] rounded-[20px]"></div>
      </div>
    </div>
  )
}

export default Home;