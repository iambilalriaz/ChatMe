import { Response } from 'express';
import { TypedRequestBody } from '../types';
import { User } from '../models/user';

export const getUserContacts = async (
  req: TypedRequestBody<{}>,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(404).json({ message: 'User not found.' });
  }
  try {
    const contacts = await User.find();
    const filteredContacts = contacts
      .filter((contact) => contact._id.toString() !== userId)
      ?.map(({ _id, profile_image, name, email }) => ({
        id: _id,
        profile_image,
        name,
        email,
      }));
    return res.status(200).json(filteredContacts);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
