const Project = require('./model');
const User = require('../users/model');
const { CustomError } = require('../../utils/errorHandler');
const { sendResponse } = require('../../utils/response');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('./sendEmail');
const jwt = require('jsonwebtoken')

async function createProject(req, res, next) {
  try {
    const { title, description } = req.body;
    const userId = req.id; 
    const userEmail = req.email; 

    const project = new Project({
      title,
      description,
      members: [{ userId, email: userEmail, role: 'owner' }] 
    });
    await project.save();

    return sendResponse(res, { message: 'Project created successfully', project }, 200);
  } catch (error) {
    next(error);
  }
}


async function addMemberToProject(req, res, next) {
  try {
    const { projectId, email, role } = req.body;
    const userId = req.id; 

    const project = await Project.findById(projectId);
    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('User does not exist', 400);
    }

    
    const isMember = project.members.some(member => member.email === email);
    if (isMember) {
      throw new CustomError('User is already a member of the project', 400);
    }

    const isOwner = project.members.some(member => member.userId === userId && member.role === 'owner');
    if (!isOwner) {
      throw new CustomError('Unauthorized: Only project owner can add members', 401);
    }

    project.members.push({ userId: user._id, email, role });
    await project.save();

    return sendResponse(res, { message: 'Member added successfully', project }, 200);
  } catch (error) {
    next(error);
  }
}

async function inviteMemberToProject(req, res, next) {
  try {
    const { projectId, email, role } = req.body;
    const userId = req.id;

    
    const project = await Project.findById(projectId);
    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    
    let user = await User.findOne({ email });

    if (!user) {
      const tempPassword = uuidv4().substring(0, 6);
      const userName = email.split('@')[0];
      
      
      user = new User({ name: userName, email, password: tempPassword });
      await user.save();

  
      const sender = 'pallavi@ncompass.inc'; 
      const subject = 'Invitation to join project';
      const message = `You have been invited to join the project. Your temporary password is: ${tempPassword}`;
      await sendEmail(email, subject, message);
    } else {
     
      const isInvited = project.members.some(member => member.email === email);
      if (isInvited) {
        throw new CustomError('User has already been invited to the project', 400);
      }
    }

    
    const isOwner = project.members.some(member => member.userId === userId && member.role === 'owner');
    if (!isOwner) {
      throw new CustomError('Unauthorized: Only project owner can invite members', 401);
    }

    
    project.members.push({ userId: user._id, email, role });
    await project.save();

    return sendResponse(res, { message: 'Member invited successfully' }, 200);
  } catch (error) {
    next(error);
  }
}

async function getAllProjectsForUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;

    const projects = await Project.find({
      'members': {
        $elemMatch: {
          'email': email
        }
      }
    });

    if (projects.length === 0) {
      throw new CustomError('No projects found for the user', 404);
    }

    return sendResponse(res, { projects }, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = { createProject, addMemberToProject, inviteMemberToProject, getAllProjectsForUser };






