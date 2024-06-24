const User = require('../users/model');
const { CustomError } = require('../../utils/errorHandler');
const {sendResponse} = require('../../utils/response');
const md5 = require('md5');

async function createUser(req, res, next) {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError('User with this email already exists', 400);
    }

    const hashedPassword = md5(password)
    const user = new User({ name, email, password:hashedPassword });
    await user.save();

    return sendResponse(res, 'User created successfully', 200);
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser };