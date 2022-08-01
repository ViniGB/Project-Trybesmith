import { Request, Response } from 'express';
import { LoginService, userValidation } from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public validateUser = async (req: Request, res: Response) => {
    const data = req.body;
    await userValidation.validateUserBody(data);
    
    const user = await this.loginService.validateUser(data);

    if (!user || user.password !== data.password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    const { id, username } = user;
    const token = await userValidation.createToken(id, username);

    res.status(200).json({ token });
  };
}