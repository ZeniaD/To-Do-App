import { createContext, useState, useContext } from "react";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (item) => {
    const newTodos = [...todos, { ...item, isCompleted: false, id: uid() }];
    setTodos(newTodos);
  };

  const handleComplete = (id) => {
    const newList = todos.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });

    setTodos(newList);
  }

  const handleRemove = (id) => {
    const newList = todos.filter((element) => element.id !== id);
    setTodos(newList);
  }

  return (
    <TodoContext.Provider
      value={{todos, addTodo, handleComplete,handleRemove}}
    >
      {children}
    </TodoContext.Provider>
  );
};
