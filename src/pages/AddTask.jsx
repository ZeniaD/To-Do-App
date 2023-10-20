import {useTask} from "../contexts/TaskContext";
import Form from "../components/Form";

const AddTask = () => {
  const {addTask} = useTask();

  return (
   <Form handleSubmit={addTask} title="Add New Task" submitText="Add Task"/>
  )
}

export default AddTask;