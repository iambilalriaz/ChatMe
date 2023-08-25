import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IUser, TypedRequestBody } from '../types';

export const isAuthorized = (
  req: TypedRequestBody<{}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.['authorization']?.split(' ')?.[1];
    if (!token) {
      return res.status(401).json({ message: 'Auth failed.' });
    }
    const decodedUser = verify(
      token,
      process.env.SECRET_ACCESS_TOKEN as string
    ) as IUser;

    if (!decodedUser) {
      return res.status(401).json({ message: 'Auth failed.' });
    }
    req.user = decodedUser;
    next();
  } catch {
    return res.status(401).json({ message: 'Auth failed.' });
  }
};
