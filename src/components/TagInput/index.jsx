import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TagInput = ({value, handleChange, filterTags}) => {
  return (
    <li className="w-full  border-soft-silver rounded-t-lg py-1 last:border-none">
      <div className="flex items-center">
        <label className="relative flex items-center p-2 rounded-full cursor-pointer"
               htmlFor={value}>
          <input
            id={value}
            checked={filterTags.includes(value)}
            onChange={() => handleChange(value)}
            type="checkbox"
            className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-blue-gray-200 transition-all checked:border-peach checked:bg-peach"
          />
          <div
            className="absolute text-darkish-gray transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <FontAwesomeIcon className="w-2.5" icon={faCheck}/>
          </div>
        </label>
        <label
          className="cursor-pointer select-none text-white hover:text-peach"
          htmlFor={value}>
          {value}
        </label>
      </div>
    </li>
  )
}

export default TagInput;