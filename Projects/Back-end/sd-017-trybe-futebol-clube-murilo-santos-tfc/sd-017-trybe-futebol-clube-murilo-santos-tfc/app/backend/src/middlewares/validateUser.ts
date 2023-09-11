import { Request, Response, NextFunction } from 'express';

export default class ValidateUser {

  public password = async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  }

  public email = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  }
}