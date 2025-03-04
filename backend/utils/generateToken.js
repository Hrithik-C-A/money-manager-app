import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;