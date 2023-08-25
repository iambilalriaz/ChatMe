import { User } from '../models/user';

export const getUser = async (userId: string) => {
  if (!userId) {
    return null;
  }
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  return {
    email: user.email,
    name: user.name,
    id: userId,
    profile_image: user.profile_image,
  };
};
