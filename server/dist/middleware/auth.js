import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};
