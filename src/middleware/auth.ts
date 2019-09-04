import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

export default function(req: Request, res: Response, next: NextFunction) {
  let secret: string | undefined = process.env.JWTsecretKey || undefined;
  //   Comment this line when you set environment variable in you machine called [JWTsecretKey]
  secret = 'ahmed';
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send('No Token Provided, You Are Unauthorized.');
    return;
  }

  if (secret) {
    try {
      const payload = jwt.verify(token, secret) as { [key: string]: any };
      if (Date.now() >= payload['exp'] * 1000) {
        res.status(401).send('Token Expired, You Are Unauthorized.');
        return;
      }
      if (payload) {
        next();
      }
    } catch (err) {
      res.status(401).send('Invalid Token Unauthorized.');
    }
  }
}
