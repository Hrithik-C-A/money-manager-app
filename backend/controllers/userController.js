import User from "../models/userModel.js";

const login = (req, res) => {
    res.send('Im login endpoint');
};

const register = (req, res) => {
    res.send('Im register endpoint');
};

export { login, register };