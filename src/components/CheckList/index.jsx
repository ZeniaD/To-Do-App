import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

const CheckList = ({checklist, completeChecklistItem, removeChecklistItem}) => {
  return (
    <>
      {checklist.map((item, index) =>
        <p key={item.id}
           className={`p-2 flex items-center ml-7 border-dashed border border-t-0 border-l-0 border-r-0 ${item.isCompleted && "line-through"}`}>
          <button onClick={() => completeChecklistItem(item.id)}
                  type="button"
                  className={`p-1 border-slate-700 border mr-2 rounded-full w-[20px] h-[20px] flex justify-center items-center hover:cursor-pointer ${item.isCompleted && "bg-slate-200"}`}>
            {item.isCompleted &&
              <FontAwesomeIcon className="w-[10px]" icon={faCheck}/>}
          </button>
          {index + 1}. {item.title}
          <button onClick={() => removeChecklistItem(item.id)}
                  className="ml-auto p-1 bg-red-200 rounded-full w-[30px] h-[30px] flex justify-center items-center hover:cursor-pointer">
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </p>
      )}
    </>
  )
}

export default CheckList;