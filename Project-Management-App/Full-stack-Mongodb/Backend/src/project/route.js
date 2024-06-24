
const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken')
const {sendEmail} = require('./sendEmail')
const {createProject}  = require('./controller');
const {addMemberToProject, inviteMemberToProject,getAllProjectsForUser} = require('./controller')


router.post('/create-project', verifyToken, createProject);
router.get('/get-projects',verifyToken,getAllProjectsForUser)
router.post('/add', verifyToken,addMemberToProject)
router.post('/invite',verifyToken, inviteMemberToProject)

module.exports = router;