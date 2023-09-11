const jwt = require('jsonwebtoken');
const fs = require('fs');

const KEYSECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8') || 'mysecret';

const jwtConfig = {
    expiresIn: '24h',
    algorithm: 'HS256',
};

function createToken(payload) {
    const generateToken = jwt.sign({ data: payload }, KEYSECRET, jwtConfig);
    return generateToken;
}

module.exports = { createToken };