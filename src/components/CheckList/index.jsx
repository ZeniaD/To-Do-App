import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

const CheckList = ({checklist, completeChecklistItem, removeChecklistItem}) => {
  return (
    <>
      {checklist.map((item, index) =>
        <p key={item.id}
           className={`p-2 flex items-center border-dashed border border-darkish-gray last:border-none text-white border-t-0 border-l-0 border-r-0 ${item.isCompleted && "line-through"}`}>
          <button onClick={() => completeChecklistItem(item.id)}
                  type="button"
                  className={`p-1 border-peach border-dashed border mr-2 rounded-full w-[20px] h-[20px] flex justify-center items-center hover:cursor-pointer ${item.isCompleted && "bg-peach text-darkish-gray"}`}>
            {item.isCompleted &&
              <FontAwesomeIcon className="w-[10px]" icon={faCheck}/>}
          </button>
          {index + 1}. {item.title}
          <button onClick={() => removeChecklistItem(item.id)}
                  className="ml-auto p-1 bg-scarlet rounded-full w-[30px] h-[30px] flex justify-center items-center hover:cursor-pointer">
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </p>
      )}
    </>
  )
}

export default CheckList;