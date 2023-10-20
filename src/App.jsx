import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TaskProvider} from "./contexts/TaskContext";
import Home from "./pages/Home.jsx";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/task/add" element={<AddTask/>}/>
          <Route path="/task/edit/:id" element={<EditTask/>}/>
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;