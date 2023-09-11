import { Request, Response } from 'express';
import LoginService from '../service/login.service';
import GenerateJWT from '../utils/generateToken';
import jwt = require('jsonwebtoken');
import 'dotenv/config';
import IUser from '../interfaces/IUser';

const jwtSecret = process.env.JWT_SECRET as string;

export default class LoginController {
  public loginService: LoginService;
  public generateJwt: GenerateJWT

  constructor() {
    this.generateJwt = new GenerateJWT();
    this.loginService = new LoginService();
  }

  public loginValidate = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization as string;
    const { data } = jwt.verify(token, jwtSecret) as { data: IUser };

    return res.status(200).json({ role: data.role });
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;
      const user = await this.loginService.login(email);

      const obj = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      }

      const token = this.generateJwt.generate(obj);

      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
}