import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers;

    if (!token || !token.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(token.authorization, process.env.JWT_SECRET || 'jwt_secret');

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidate;