import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {uid} from "uid";
import ListForm from "../ListForm"
import SelectButtons from "../SelectButtons";
import CheckList from "../CheckList";
import "./form.css";

const Form = (props) => {
  const [title, setTitle] = useState(props.task ? props.task.title : "");
  const [hasInvalidTitle, setHasInvalidTitle] = useState(false);
  const [priority, setPriority] = useState(props.task ? props.task.priority : 0);
  const [complexity, setComplexity] = useState(props.task ? props.task.complexity : 0);
  const [dueDate, setDueDate] = useState(props.task ? props.task.dueDate : 0);
  const [checklist, setChecklist] = useState(props.task ? props.task.checklist : []);
  const [tags, setTags] = useState(props.task ? props.task.tags : []);
  const [isInvalidTag, setIsInvalidTag] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setHasInvalidTitle(true);
      setTimeout(() => {
        setHasInvalidTitle(false);
      }, 5000);
      return
    }

    const item = {
      title,
      priority,
      complexity,
      checklist,
      tags,
      dueDate
    }

    props.handleSubmit(item);
    navigate("/");
  };

  const handleChecklistSubmit = (value) => {
    const newList = [...checklist, {
      title: value,
      isCompleted: false,
      id: uid()
    }]
    setChecklist(newList);
  }

  const handleTagsSubmit = (value) => {
    if (tags.find((tag) => tag.title === value)) {
      setIsInvalidTag(value);
      setTimeout(() => {
        setIsInvalidTag(null);
      }, 3000);
      return
    }

    const newList = [...tags, {
      title: value,
      id: uid()
    }]
    setTags(newList);
  }

  const completeChecklistItem = (id) => {
    const newList = checklist.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });
    setChecklist(newList);
  }

  const removeChecklistItem = (id) => {
    const newList = checklist.filter((item) => item.id !== id);
    setChecklist(newList);
  }

  const removeTag = (id) => {
    const newList = tags.filter((item) => item.id !== id);
    setTags(newList);
  }

  const handlePriorityChange = (value) => {
    setPriority(value);
  }

  const handleComplexityChange = (value) => {
    setComplexity(value);
  }

  return (
    <div className="bg-dark-gray min-h-screen flex flex-col w-full p-8">
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                  transition={{duration: .8}} className="max-w-[800px] w-full">
        <div className="relative">
          <Link to='/'
                className="absolute p-1 border-dashed border-peach border rounded-full w-[32px] h-[32px] inline-flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faArrowLeft}/>
          </Link>
          <h1 className="text-center text-2xl font-semibold text-white">{props.title}</h1>
        </div>
        <form className="pt-[20px] pb-[20px]" onSubmit={handleSubmit}>
          <label htmlFor="task-name" className="pt-2 pb-2 block text-white">Task
            Name</label>
          <input id="task-name" type="text" placeholder="Add Task..."
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="block p-2 focus:outline-none bg-darkish-gray rounded-lg min-w-full text-soft-silver"/>
          {hasInvalidTitle && <p className="text-sm text-scarlet pt-2">Please add a Task Name</p>}
          <h3 className="pt-2 pb-2 text-white mt-2">Select Priority:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            <SelectButtons handleChange={handlePriorityChange} value={priority} property="priority"/>
          </div>
          <h3 className="pt-2 pb-2 text-white mt-2">Select Complexity:</h3>
          <div className="flex gap-[5px] max-w-[400px] h-8">
            <SelectButtons handleChange={handleComplexityChange} value={complexity} property="complexity"/>
          </div>
          <label htmlFor="task-date" className="pt-2 pb-2 block text-white mt-2">Due Date:</label>
          <input id="task-date" type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="p-2 focus:outline-none rounded-lg border-slate-600 bg-darkish-gray min-w-full leading-5 flex items-center text-soft-silver"/>
          <ListForm handleSubmit={handleChecklistSubmit} id="task-checklist" title="Subtasks"/>
          {!!checklist && (
            <div className="ml-4 mr-12">
              <CheckList checklist={checklist} removeChecklistItem={removeChecklistItem}
                         completeChecklistItem={completeChecklistItem}/>
            </div>
          )}
          <ListForm handleSubmit={handleTagsSubmit} id="task-tags" title="Tags"/>
          {isInvalidTag && <p className="text-sm text-scarlet pt-2">{isInvalidTag} already added</p>}
          {!!tags && (<div className="mt-3 ml-4">
            {tags.map((tag) =>
              <p key={tag.id}
                 className="inline-flex items-center pl-3 pr-1 mr-3 bg-peach text-darkish-gray rounded-2xl">{tag.title}
                <button onClick={() => removeTag(tag.id)}
                        className="p-1 hover:bg-scarlet ml-2 rounded-full w-[17px] h-[17px] flex justify-center items-center hover:cursor-pointer">
                  <FontAwesomeIcon icon={faXmark} className="w-[10px]"/>
                </button>
              </p>
            )}
          </div>)}
          <button type="submit"
                  className="py-2 px-5 hover:bg-tangerine rounded-[30px] bg-peach text-darkish-gray mt-8">{props.submitText}</button>
        </form>
      </motion.div>
    </div>
  )

}
export default Form;