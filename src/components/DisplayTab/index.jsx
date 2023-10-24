const DisplayTab = ({handleDisplay, display, value}) => {
  return (
    <div className="inline-flex items-center">
      <input
        id={value}
        name="task-list"
        type="radio"
        className="peer relative h-5 w-5 cursor-pointer appearance-none"
        checked={display === value}
        onChange={() => handleDisplay(value)}/>
      <label
        className="mt-px cursor-pointer peer-checked:text-peach select-none text-light-gray"
        htmlFor={value}>
        {value}
      </label>
    </div>
  )
}

export default DisplayTab;