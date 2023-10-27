const TagInput = ({value, handleChange, filterTags}) => {
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 last:border-none">
      <div className="flex items-center pl-3">
        <input id={value} type="checkbox" checked={filterTags.includes(value)}
               className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-soft-silver "
               onChange={() => handleChange(value)}/>
        <label htmlFor={value} className="w-full py-2 ml-2 text-sm text-light-gray hover:cursor-pointer">{value}</label>
      </div>
    </li>
  )
}

export default TagInput;