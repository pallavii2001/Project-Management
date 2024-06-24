const jwt = require('jsonwebtoken');
const md5 = require('md5');
const User = require('../users/model');
const { CustomError } = require('../../utils/errorHandler');
const {sendResponse} = require('../../utils/response');

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });


    if (!user) {
      throw new CustomError('Invalid email or password', 400);
    }

    const hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
      throw new CustomError('Invalid email or password', 400);
    }

   
    const payload = {
      userId: user._id,
      email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });

 
    sendResponse(res, { token }, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser };