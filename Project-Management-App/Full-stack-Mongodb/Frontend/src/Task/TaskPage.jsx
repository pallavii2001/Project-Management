import React, { useEffect, useState } from 'react';
import ApiResponse from '../Utils/ApiResponse'; 
import { getDataFromStorage } from '../Utils/Libs';
import { useLocation } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar';

import '../Task/Style.css';

const TaskPage = () => {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("projectId");
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskPopup, setShowCreateTaskPopup] = useState(false);
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [showInviteMemberPopup, setShowInviteMemberPopup] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    assigned: ''
  });
  const [addMem, setAddMem] = useState({
    projectId:'',
    email: '',
    role: ''
  });
  const [inviteMem, setInviteMem] = useState({
    projectId:'',
    email: '',
    role: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [projectId]); 

  const fetchTasks = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      const response = await ApiResponse('GET', 'get-tasks', { projectId }, null, headers);
      setTasks(response.data.tasks); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setErrorMessage('Error fetching tasks. Please try again later.');
    }
  };

  const handleCreateTask = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      await ApiResponse('POST', 'create-task', {projectId}, newTask, headers);
      fetchTasks();
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        assigned: ''
      });
      setShowCreateTaskPopup(false);
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage('Error creating task. Please try again later.');
    }
  };

  const handleAddMember = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      await ApiResponse('POST', 'add', null, { ...addMem, projectId }, headers);
      fetchTasks();
      setAddMem({
        projectId:'',
        email: '',
        role: ''
      });
      setShowAddMemberPopup(false);
      setErrorMessage(''); 
      window.alert('Member successfully added!');
    } catch (error) {
      console.error('Error adding member:', error);
      setErrorMessage('Error adding member. Please try again later.');
    }
  };

  const handleInviteMember = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      await ApiResponse('POST', 'invite', null, { ...inviteMem, projectId }, headers);
      fetchTasks();
      setInviteMem({
        projectId:'',
        email: '',
        role: ''
      });
      setShowInviteMemberPopup(false);
      setErrorMessage(''); 
      window.alert('Member successfully invited!');
    } catch (error) {
      console.error('Error inviting member:', error);
      setErrorMessage('Error inviting member. Please try again later.');
    }
  };
  
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      await ApiResponse('PUT', 'update-tasks', null, { taskId, status: newStatus }, headers);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      setErrorMessage('Error updating task status. Please try again later.');
    }
  };

  return (
    <div className="container-fluid">
      <div className='container'>
        <Navbar />
        <div className="btn">
          <button className="task-btn" onClick={() => setShowCreateTaskPopup(true)}>Create Task</button>
          <button className="task-btn" onClick={() => setShowAddMemberPopup(true)}>Add Member</button>
          <button className="task-btn" onClick={() => setShowInviteMemberPopup(true)}>Invite Member</button>
        </div>

        {showCreateTaskPopup && (
          <div className="overlay">
            <div className="popup-form">
              <h3>Create New Task</h3>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option value="todo">Todo</option>
                  <option value="in progress">In Progress</option>
                  <option value="in review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assigned to:</label>
                <input
                  type="text"
                  placeholder="Assigned To"
                  value={newTask.assigned}
                  onChange={(e) => setNewTask({ ...newTask, assigned: e.target.value })}
                />
              </div>
              <div className="btn-group">
                <button onClick={handleCreateTask}>Create</button>
                <button onClick={() => setShowCreateTaskPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showAddMemberPopup && (
          <div className="overlay">
            <div className="popup-form">
              <h3>Add Member</h3>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={addMem.email}
                  onChange={(e) => setAddMem({ ...addMem, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <input
                  type="text"
                  placeholder="Role"
                  value={addMem.role}
                  onChange={(e) => setAddMem({ ...addMem, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>ProjectID:</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setAddMem({ ...addMem, projectId: e.target.value })}
                />
              </div>
              <div className="btn-group">
                <button onClick={handleAddMember}>Add</button>
                <button onClick={() => setShowAddMemberPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showInviteMemberPopup && (
          <div className="overlay">
            <div className="popup-form">
              <h3>Invite Member</h3>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={inviteMem.email}
                  onChange={(e) => setInviteMem({ ...inviteMem, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <input
                  type="text"
                  placeholder="Role"
                  value={inviteMem.role}
                  onChange={(e) => setInviteMem({ ...inviteMem, role: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>ProjectID:</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setInviteMem({ ...inviteMem, projectId: e.target.value })}
                />
              </div>
              <div className="btn-group">
                <button onClick={handleInviteMember}>Invite</button>
                <button onClick={() => setShowInviteMemberPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="task-page">
          <div className="column">
            <h2>Todo</h2>
            {tasks.map(task => (
              task.status === 'todo' && (
                <div key={task._id} className='card'>
                  <p><b>Title: </b>{task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <p><b>Assigned to: </b>{task.Assigned}</p>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="in review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )
            ))}
          </div>
          <div className="column">
            <h2>In Progress</h2>
            {tasks.map(task => (
              task.status === 'in progress' && (
                <div key={task._id} className='card'>
                  <p><b>Title: </b>{task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <p><b>Assigned to: </b>{task.Assigned}</p>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="in review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )
            ))}
          </div>
          <div className="column">
            <h2>In Review</h2>
            {tasks.map(task => (
              task.status === 'in review' && (
                <div key={task._id} className='card'>
                  <p><b>Title: </b>{task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <p><b>Assigned to: </b>{task.Assigned}</p>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="in review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )
            ))}
          </div>
          <div className="column">
            <h2>Done</h2>
            {tasks.map(task => (
              task.status === 'done' && (
                <div key={task._id} className='card'>
                  <p><b>Title: </b> {task.title}</p>
                  <p><b>Description: </b>{task.description}</p>
                  <p><b>Assigned to: </b>{task.Assigned}</p>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="in review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )
            ))}
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
