const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SelectButtons = ({value, property, handleChange}) => {

  return (
    <>
      {numbers.map((number) =>
        <div key={`${property}-${number}`}
             className="w-[10%] inline-flex items-center">
          <label htmlFor={`${property}`}
                 className="relative flex cursor-pointer items-center rounded-full p-3">
            <input name={`${property}`} type='radio' value={number}
                   checked={number === value}
                   className="peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-peach transition-all hover:bg-peach checked:bg-peach"
                   onChange={() => handleChange(number)}/>
            <div
              className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-peach transition-opacity peer-hover:text-darker-gray peer-checked:text-darker-gray">
              {number}
            </div>
          </label>
        </div>)}
    </>
  )
}

export default SelectButtons;