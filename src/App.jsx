import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TaskProvider} from "./contexts/TaskContext";
import Home from "./pages/Home.jsx";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";
import Sidebar from "./components/Sidebar/index.jsx";

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="flex grow h-full">
          <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/task/:id" element={<TaskDetails/>}/>
          <Route path="/task/add" element={<AddTask/>}/>
          <Route path="/task/edit/:id" element={<EditTask/>}/>
        </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;