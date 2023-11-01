const SortItem = ({handleClick, currentValue, order, sortBy, name}) => {
  const isCurrent = currentValue.order === order && currentValue.sortBy === sortBy;
  return (
    <button
      className={`${isCurrent && "bg-[#313132]"} block w-full text-white text-left hover:bg-[#313132] px-2 py-1.5 my-1 rounded-md`}
      type="button"
      onClick={() => handleClick({order, sortBy})}>{name}
    </button>
  )
}

export default SortItem;
