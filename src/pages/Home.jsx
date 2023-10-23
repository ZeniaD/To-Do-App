import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useTask} from "../contexts/TaskContext";
import Task from "../components/Task";
import SortDropdown from "../components/SortDropdown";

const Home = () => {
  const [sort, setSort] = useState({order: "Default", sortBy: "priority"});
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const {tasks} = useTask();

  const handleClick = (sort) => {
    setSort(sort);
  }

  const getSortedList = (list) => {
    list.sort((item1, item2) => {
      if (sort.order === "Default") {
        return;
      }
      const sortOrder = sort.order === "Ascending" ? 1 : -1;
      if (sort.sortBy === "dueDate") {
        return (new Date(item1[sort.sortBy]) - new Date(item2[sort.sortBy])) * sortOrder;
      } else {
        return (item1[sort.sortBy] - item2[sort.sortBy]) * sortOrder;
      }
    })

    return list;
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const filteredList = tasks.filter((element) => element.title.toLowerCase().includes(searchValue.toLowerCase()));
  const sortedList = getSortedList(filteredList);

  return (
    <div className="bg-dark-gray min-h-screen flex flex-col w-full p-8">
      <div className="w-[100%] mb-8">
        <input placeholder="Search"
               className="p-[10px] bg-darkish-gray rounded-lg shadow-md w-[350px] focus:outline-none text-white"
               onChange={(e) => setSearchValue(e.target.value)}/>
      </div>

      <div className="flex items-center mb-4">
        <h1 className="text-white inline-block mr-2 text-3xl">All Tasks</h1>
        <Link to='/task/add'
              className="p-1 border-dashed border-peach border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white">
          <FontAwesomeIcon icon={faPlus}/>
        </Link>
      </div>

      <div className="relative flex gap-[10px]">
        <button onClick={toggleMenu}
                className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-[#313132] hover:border-peach text-white flex items-center justify-between"
                type="button">
          Sort By
          <FontAwesomeIcon icon={faAngleDown} className={`h-[12px]  mx-1 ${showMenu ? "rotate-180" : ""}`}/>
        </button>
        {showMenu && <SortDropdown handleClick={handleClick}/>}
        <p
          className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-[#313132] hover:border-peach text-white flex items-center justify-between">Tag</p>
      </div>

      {!tasks.length && <h2 className="pt-8  text-soft-silver">No Tasks. Add Tasks +</h2>}

      {!!tasks.length && (<div className="pt-8 grid grid-cols-3 gap-4">
        {sortedList.map((task) => (
          <Task key={task.id} task={task}/>
        ))}
      </div>)}
    </div>
  )
}

export default Home;