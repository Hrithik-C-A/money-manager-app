import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const normalUsers = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.userId).select('-password');
    
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    } else {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
    }
};

const adminUser = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            message: 'Not authorized as admin.'
        });
    }
}

export { normalUsers, adminUser };