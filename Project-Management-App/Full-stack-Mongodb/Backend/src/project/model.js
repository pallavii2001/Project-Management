const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
 task:[
  {}
 ],
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      email: { type: String, required: true },
      role: {
        type: String,
        enum: ['owner', 'developer', 'tester'],
        default: 'developer'
      }
    }
  ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
