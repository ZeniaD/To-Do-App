import {createContext, useContext, useState} from "react";
import {uid} from "uid";

export const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (item) => {
    const newTasks = [...tasks, { ...item, isCompleted: false, id: uid() }];
    setTasks(newTasks);
  };

  const editTask = (id, item) => {
    const newList = tasks.map((element) => {
      if (element.id === id) {
        for (const [key, value] of Object.entries(item)) {
          element[key] = value;
        }
      }
      return element;
    });
    setTasks(newList);
  }

  const handleComplete = (id) => {
    const newList = tasks.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });

    setTasks(newList);
  }

  const handleRemove = (id) => {
    const newList = tasks.filter((element) => element.id !== id);
    setTasks(newList);
  }

  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  }

  return (
    <TaskContext.Provider value={{tasks, addTask, editTask, handleComplete, handleRemove,getTask}}>
      {children}
    </TaskContext.Provider>
  );
};
