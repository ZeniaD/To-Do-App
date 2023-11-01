import {useParams} from "react-router-dom";
import {useTask} from "../contexts/TaskContext";
import Form from "../components/Form";

const EditTask = () => {
  const {editTask, getTask} = useTask();
  const {id} = useParams();
  const task = getTask(id);

  const handleSubmit = (item) => {
    editTask(id,item);
  }

  return (
    <Form handleSubmit={handleSubmit} title="Edit task" task={task} submitText="Save Task"/>
  )
}

export default EditTask;