import axios from './axios';
import { API_URL } from './constants';

export const sendOTPRequest = (email: string) =>
  axios.request({
    url: `${API_URL}/auth/otp/send`,
    method: 'POST',
    data: { email },
  });
export const verifyOTPRequest = (otp: string, email: string) =>
  axios.request({
    url: `${API_URL}/auth/otp/verify`,
    method: 'POST',
    data: { otp, email },
  });

export const loginRequest = (email: string, password: string) =>
  axios.request({
    url: `${API_URL}/auth/login`,
    method: 'POST',
    data: { email, password },
  });
export const signupRequest = (name: string, email: string, password: string) =>
  axios.request({
    url: `${API_URL}/auth/signup`,
    method: 'POST',
    data: { name, email, password },
  });
export const getConversationsRequest = () =>
  axios.request({
    url: `${API_URL}/conversation`,
    method: 'GET',
    authorizedRequest: true,
  });
export const getConversationRequest = (conversationId: string) =>
  axios.request({
    url: `${API_URL}/conversation/${conversationId}`,
    method: 'GET',
    authorizedRequest: true,
  });
export const getConversationByUserIdRequest = (userId: string) =>
  axios.request({
    url: `${API_URL}/conversation/user/${userId}`,
    method: 'GET',
    authorizedRequest: true,
  });
export const getConversationMessagesRequest = (conversationId: string) =>
  axios.request({
    url: `${API_URL}/conversation/${conversationId}/message`,
    method: 'GET',
    authorizedRequest: true,
  });
export const getUserContactsRequest = () =>
  axios.request({
    url: `${API_URL}/contact`,
    method: 'GET',
    authorizedRequest: true,
  });
export const getUserDetailsRequest = (userId: string) =>
  axios.request({
    url: `${API_URL}/user/${userId}`,
    method: 'GET',
    authorizedRequest: true,
  });
export const sendMessageRequest = (
  recipientEmail: string,
  messageText: string
) =>
  axios.request({
    method: 'POST',
    url: `${API_URL}/message`,
    authorizedRequest: true,
    data: { sendTo: recipientEmail, message: messageText },
  });
