import jwt = require('jsonwebtoken');
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET as string;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
} as object;

export default class GenerateJWT {
  public generate(payload: Object): string {
    const token = jwt.sign({ data: payload }, jwtSecret, jwtConfig);

  return token;
  }
}