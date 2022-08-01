import { Request, Response } from 'express';
import UserService, { userValidation } from '../services/user.service';
import { loginValidation } from '../services/login.service';

export default class ProductController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    await userValidation.validateUserBody(user);

    const newUser = await this.userService.createUser(user);
    const { id, username } = newUser;
    const token = await loginValidation.createToken(id, username);

    res.status(201).json({ token });
  };
}