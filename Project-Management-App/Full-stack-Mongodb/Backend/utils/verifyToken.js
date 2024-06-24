const jwt = require('jsonwebtoken');
const { CustomError } = require('./errorHandler');

async function authenticateToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer ')) {
            throw new CustomError('Invalid or missing token', 401);
        }
        const tokenWithoutBearer = token.split(' ')[1];
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.userId = decodedToken.userId; 
        req.email = decodedToken.email; 
        next();
    } catch(error) {
        next(error);
    }
}

module.exports = authenticateToken;
