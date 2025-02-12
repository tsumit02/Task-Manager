import logo from "./logo.svg";
//import { Route } from "react-router-dom/cjs/react-router-dom.min";
//import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import TaskManager from "./TaskManager";
import Homepage from "./Homepage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
