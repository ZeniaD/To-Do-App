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
        return { ...element, ...item };
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

  return (
    <TaskContext.Provider value={{tasks, addTask, editTask, handleComplete, handleRemove}}>
      {children}
    </TaskContext.Provider>
  );
};
