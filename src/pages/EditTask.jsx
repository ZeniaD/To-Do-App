import {useParams} from "react-router-dom";
import {useTask} from "../contexts/TaskContext";
import Form from "../components/Form";

const EditTask = () => {
  const {tasks, editTask} = useTask();
  const {id} = useParams();
  const task = tasks.find((task) => task.id === id);

  const handleSubmit = (item) => {
    editTask(id,item);
  }

  return (
    <Form handleSubmit={handleSubmit} title="Edit task" task={task} submitText="Edit Task"/>
  )
}

export default EditTask;