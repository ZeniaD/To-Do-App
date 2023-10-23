const SortDropdown = ({handleClick}) => {
  return (
    <div
      className="absolute right-0 top-[45px] p-[10px] left-0 bg-[#313132] w-[180px] rounded-[8px] z-10">
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Default", sortBy: "priority"})}>Default
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-[#313132] px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Descending", sortBy: "priority"})}>Top Priority
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Ascending", sortBy: "priority"})}>Lowest Priority
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Descending", sortBy: "complexity"})}>Most Complex
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Ascending", sortBy: "complexity"})}>Least Complex
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Descending", sortBy: "dueDate"})}>Date Descending
      </button>
      <button className="block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md"
              type="button"
              onClick={() => handleClick({order: "Ascending", sortBy: "dueDate"})}>Date Ascending
      </button>
    </div>
  )
}

export default SortDropdown;