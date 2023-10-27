import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faMagnifyingGlass, faPlus, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {useTask} from "../contexts/TaskContext";
import Task from "../components/Task";
import SortItem from "../components/SortItem";
import TagInput from "../components/TagInput/index";

const Home = () => {
  const [sort, setSort] = useState({order: "Default", sortBy: ""});
  const [showFilters, setShowFilters] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const [isPowerMode, setIsPowerMode] = useState(false);
  const {tasks} = useTask();

  const handleSortChange = (sort) => {
    setSort(sort);
  }

  const getSortedList = (list) => {
    list.sort((item1, item2) => {
      if (isPowerMode) {
        return (item2.priority + item2.complexity) - (item1.priority + item1.complexity);
      } else {
        if (sort.order === "Default") {
          return;
        }
        const sortOrder = sort.order === "Ascending" ? 1 : -1;
        if (sort.sortBy === "dueDate") {
          return (new Date(item1[sort.sortBy]) - new Date(item2[sort.sortBy])) * sortOrder;
        } else {
          return (item1[sort.sortBy] - item2[sort.sortBy]) * sortOrder;
        }
      }
    })
    return list;
  }

  const getTags = () => {
    const tagsSet = new Set();
    tasks.forEach((item) => {
      if (item.tags) {
        item.tags.forEach((tag) => {
          tagsSet.add(tag.title);
        });
      }
    });
    return Array.from(tagsSet);
  };

  const filterByTags = (task) => {
    if (filterTags.length) {
      if (task.tags) {
        return task.tags.some((tag) => filterTags.includes(tag.title));
      }
      return false;
    }
    return true;
  }

  const handleTagChange = (value) => {
    let newList;
    if (filterTags.includes(value)) {
      newList = filterTags.filter((element) => element !== value);
    } else {
      newList = [...filterTags, value];
    }
    setFilterTags(newList);
  }

  const filteredList = tasks.filter((element) => element.title.toLowerCase().includes(searchValue.toLowerCase())).filter((element) => filterByTags(element));
  const sortedList = getSortedList(filteredList);
  const tags = getTags();
  const powerModeTask = isPowerMode && sortedList.find((element) => !element.isCompleted);

  return (
    <div className="bg-dark-gray min-h-screen flex flex-col w-full p-8">
      <div className="relative mb-8">
        <FontAwesomeIcon className="text-white w-[15px] absolute top-1/2 -translate-y-1/2 left-2"
                         icon={faMagnifyingGlass}/>
        <input placeholder="Search"
               className="py-2 pr-2 pl-8 bg-darkish-gray rounded-lg shadow-md w-[350px] focus:outline-none text-white"
               onChange={(e) => setSearchValue(e.target.value)}/>
      </div>
      <div className="flex items-center mb-4">
        <h1 className="text-white inline-block mr-2 text-3xl">All Tasks</h1>
        <Link to='/task/add'
              className="p-1 border-dashed border-peach border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white mr-2">
          <FontAwesomeIcon icon={faPlus}/>
        </Link>
        <button
          className={`${isPowerMode && "bg-royal-blue"} p-1 border-dashed border-royal-blue border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white`}
          onClick={() => setIsPowerMode(!isPowerMode)}>
          <FontAwesomeIcon icon={faPowerOff}/>
        </button>
      </div>
      <div className="relative flex gap-2">
        <button onClick={() => setShowFilters(!showFilters)}
                className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-[#313132] hover:border-peach text-white flex items-center justify-between"
                type="button">
          Sort By
          <FontAwesomeIcon icon={faAngleDown} className={`h-[12px]  mx-1 ${showFilters ? "rotate-180" : ""}`}/>
        </button>
        {showFilters && (
          <div className="absolute right-0 top-[45px] p-2 left-0 bg-[#313132] w-[180px] rounded-[8px] z-20">
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Default" sortBy="" name="Default"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Descending" sortBy="priority" name="Top Priority"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Ascending" sortBy="priority" name="Lowest Priority"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Descending" sortBy="complexity" name="Most Complex"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Ascending" sortBy="complexity" name="Least Complex"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Descending" sortBy="dueDate" name="Date Descending"/>
            <SortItem handleClick={handleSortChange} currentValue={sort} order="Ascending" sortBy="dueDate" name="Date Ascending"/>
          </div>
        )}
        {!!tags.length && (
          <>
            <button onClick={() => setShowTags(!showTags)}
                    className="px-[5px] py-1 min-w-[100px] text-center rounded-md border border-[#313132] hover:border-peach text-white flex items-center justify-between"
                    type="button">
              Tags
              <FontAwesomeIcon icon={faAngleDown} className={`h-[12px]  mx-1 ${showTags ? "rotate-180" : ""}`}/>
            </button>
            {showTags && (
              <div className="absolute top-[45px] p-2 left-[100px] bg-[#313132] w-[180px] rounded-[8px] z-20">
                <ul>
                  {tags.map((tag, index) => (
                    <TagInput value={tag} key={index} handleChange={handleTagChange} filterTags={filterTags}/>
                  ))}
                </ul>
              </div>)}
          </>
        )}
      </div>
      {!sortedList.length && <h2 className="pt-8  text-soft-silver">No Tasks. Add Tasks +</h2>}
      {!!sortedList.length && (
        <div className="pt-8 grid grid-cols-3 gap-4">
          {isPowerMode && !powerModeTask && <h2 className="text-soft-silver">No tasks or uncompleted tasks.</h2>}
          {isPowerMode ? powerModeTask && <Task key={powerModeTask.id} task={powerModeTask}/>
            : sortedList.map((task, index) => (
              <Task key={task.id} task={task} index={index}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;