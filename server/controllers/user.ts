import { Request, Response } from 'express';
import { TypedRequestBody } from '../types';
import { User } from '../models/user';

export const getUserDetails = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const response = {
      id: user?._id,
      name: user?.name,
      profile_image: user?.profile_image,
      email: user?.email,
    };
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
export const getUserMessages = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const response = {
      id: user?._id,
      name: user?.name,
      profile_image: user?.profile_image,
      email: user?.email,
    };
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
