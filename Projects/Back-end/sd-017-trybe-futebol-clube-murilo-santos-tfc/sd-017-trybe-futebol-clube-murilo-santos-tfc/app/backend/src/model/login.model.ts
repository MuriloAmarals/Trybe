import User from '../database/models/User';
import IUser from '../interfaces/IUser';

export default class LoginModel {
  public login = async (email: string): Promise<IUser> => {
    const user = await User.findOne({ where: { email } });

    return user as IUser;
  }
}