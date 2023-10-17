import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddTask from "./pages/AddTask.jsx";
import {TodoProvider} from "./contexts/todoContext";

function App() {
  return (
    <Router>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/task/add" element={<AddTask/>}/>
          {/*<Route path="/todo/:id" element={<TodoDetail />} />*/}
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;