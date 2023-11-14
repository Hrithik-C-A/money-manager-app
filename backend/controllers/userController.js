import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.status(200).json({
            message: 'Login successful.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid email id or password.');
    }
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409);
        throw new Error('Account already exists. Either login or register with a new email.');
    } else {
        try {
            const user = await User.create({name, email, password, isAdmin});
            const createdUser = await user.save();
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    name: createdUser.name,
                    email: createdUser.email
                },
            });
        } catch (error) {
            res.status(400);
            throw new Error('User not registered');
        }
    }
        
});

const logout = asyncHandler((req, res) => {

    res.clearCookie('jwt');

    res.json({
        message: 'User Logged out successfully.'
    })
});

export { login, register, logout };