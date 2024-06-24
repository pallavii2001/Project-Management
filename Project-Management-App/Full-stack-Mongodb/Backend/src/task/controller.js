const Task = require('./model');
const Project = require('../project/model');
const { CustomError } = require('../../utils/errorHandler');
const { sendResponse } = require('../../utils/response');

async function createTask(req, res, next) {
  const { title, description, status, assigned } = req.body;
  const projectId = req.query.projectId;

  try {
    if (!title || !description || !status || !assigned) {
      throw new CustomError('Title, description, status, and assigned are required', 400);
    }

    const project = await Project.findById(projectId);
    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    const task = new Task({
      title,
      description,
      status,
      project: projectId,
      Assigned: assigned
    });

    const newTask = await task.save();
    sendResponse(res, { message: 'Task created successfully', newTask }, 200);
  } catch (error) {
    next(error);
  }
}

async function getTasksByProjectId(req, res, next) {
  const projectId = req.query.projectId;

  try {
    if (!projectId) {
      throw new CustomError('Project ID is required in query parameters', 400);
    }

    const tasks = await Task.find({ project: projectId });

    sendResponse(res, { message: 'Tasks fetched successfully', tasks }, 200);
  } catch (error) {
    next(error);
  }
}

async function updateTaskStatus(req, res, next) {
  const { taskId, status } = req.body;

  try {
    if (!taskId || !status) {
      throw new CustomError('Task ID and status are required', 400);
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

    if (!updatedTask) {
      throw new CustomError('Task not found', 404);
    }

    sendResponse(res, { message: 'Task status updated successfully', updatedTask }, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = { createTask, getTasksByProjectId, updateTaskStatus };



