import User from "../models/userModel.js";

const login = (req, res) => {
    res.send('Im login endpoint');
};

const register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409).json({
            message: 'Account already exists. Either login or register with a new email.'
        })
    } else {
        try {
            const user = await User.create({name, email, password, isAdmin});
            const createdUser = await user.save();
            res.status(200).json({
                message: 'User registered successfully',
                user: {
                    name: createdUser.name,
                    email: createdUser.email
                },
            });
        } catch (error) {
            res.status(400).json({
                message: 'User not registered',
            })
        }
    }
        
};

export { login, register };