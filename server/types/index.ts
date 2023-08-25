import { Request } from 'express';

export type SignUpOptions = {
  email: string;
  name: string;
  password: string;
};

export interface TypedRequestBody<T> extends Request {
  user?: IUser;
  body: T;
}
export interface IMessage {
  _id?: string;
  sender: string;
  reciever: string;
  text: string;
  conversation_id?: string;
}
export interface IUser {
  email: string;
  name: string;
  id: string;
  lat?: number;
  profile_image?: string;
}
