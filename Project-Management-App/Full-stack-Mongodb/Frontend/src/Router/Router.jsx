import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";
import Home from "../Home/Home";
import ProjectPage from "../ProjectPage/ProjectPage";
import TaskPage from "../Task/TaskPage";

function Routerindex() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/" element={<Home />} />
      <Route path="/get-tasks" element={<TaskPage />} />
      <Route path="/users" element={<Register />} />
      <Route path="/get-projects" element={<ProjectPage />} />
    </Routes>
  );
}

export default Routerindex;

