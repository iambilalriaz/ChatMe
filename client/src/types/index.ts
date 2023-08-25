import { KeyboardEvent } from 'react';

export interface IUser {
  name: string;
  email: string;
  id: string;
  profile_image?: string;
}

export interface IInput {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  styles?: string;
  onEnterPress?: (event: KeyboardEvent) => void;
}

export interface IButton {
  label: string;
  onClick: (params?: unknown) => void;
  styles?: string;
  variant?: 'primary' | 'secondary' | 'praimry-outline' | 'secondary-outline';
}

export interface IConversation {
  id: string;
  participants: IUser[];
  createdAt: string;
  markedAsRead: boolean;
  lastMessageSent: string;
}

export interface IMessage {
  id: string;
  sender: string;
  reciever: string;
  text: string;
  createdAt?: string;
}
