const jwt = require('jsonwebtoken');
const fs = require('fs');

const KEYSECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'mysecret';

const verifyToken = (req, res, next) => {
    try {
         const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }

        const user = jwt.verify(token, KEYSECRET);
        console.log(user);

        return res.status(200).json({ role: user.data.role });
    } catch (err) {
        next({ status: 401, message: 'Token must be a lavid token' });
    }
};

module.exports = { verifyToken };

// comentário
