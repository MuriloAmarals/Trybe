import IUser from '../interfaces/IUser';
import LoginModel from '../model/login.model';

export default class LoginService {
  public loginModel: LoginModel;

  constructor() {
    this.loginModel = new LoginModel();
  }
  public login = async (email: string): Promise<IUser> => {
    const user = await this.loginModel.login(email);

    return user;
  }
}