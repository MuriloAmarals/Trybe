import { Model, DataTypes} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;