const SortItem = ({handleClick, currentValue, order, sortBy, name}) => {
    const isCurrent = currentValue.order === order && currentValue.sortBy === sortBy;
  return (
    <button
      className={`${isCurrent && "bg-darkish-gray"} block w-full text-light-gray text-left hover:bg-darkish-gray px-2 py-1 rounded-md`}
      type="button"
      onClick={() => handleClick({order, sortBy})}>{name}
    </button>
  )
}

export default SortItem;
