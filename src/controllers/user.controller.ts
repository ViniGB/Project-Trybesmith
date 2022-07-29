import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

const secret: string = process.env.JWT_SECRET || 'my_secret';

export default class ProductController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;

    const newUser = await this.userService.createUser(user);
    const { id, username } = newUser;
    const payload = { data: { id, username } };
    const token = jwt.sign(payload, secret);

    res.status(201).json({ token });
  };
}