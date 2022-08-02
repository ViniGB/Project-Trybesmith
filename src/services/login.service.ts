import Joi from 'joi';
import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import Login from '../interfaces/login.interface';

const secret: string = process.env.JWT_SECRET || 'my_secret';

export const loginValidation = {
  async validateLoginBody(data: Login): Promise<Login> {
    const schema = Joi.object<Login>({
      username: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
    });
  
    const { error, value } = await schema.validateAsync(data);
    if (error) return { error, username: data.username, password: data.password };
    return value;
  },

  async createToken(id: number | undefined, username: string) {
    const payload = { data: { id, username } };
    const token = jwt.sign(payload, secret);

    return token;
  },
};

export class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async validateUser(user: string) {
    const returnedUser = await this.model.getUserByName(user);
    return returnedUser;
  }
}