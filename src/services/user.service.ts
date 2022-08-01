import Joi from 'joi';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

export const userValidation = {
  async validateUserBody(data: User): Promise<User> {
    const schema = Joi.object<User>({
      username: Joi.string().required().min(3).max(255),
      classe: Joi.string().required().min(3).max(255),
      level: Joi.number().required().min(1),
      password: Joi.string().required().min(8).max(255),
    });
  
    const result = await schema.validateAsync(data);
    return result;
  },
};

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public createUser(user: User): Promise<User> {
    return this.model.createUser(user);
  }
}