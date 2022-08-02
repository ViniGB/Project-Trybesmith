import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'my_secret';

const authToken = {
  async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
  
    if (!token) return res.status(401).json({ message: 'Token not found' });
  
    try {
      jwt.verify(token, secret);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
};

export default authToken;