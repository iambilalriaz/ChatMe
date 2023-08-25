import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    sender: String,
    reciever: String,
    text: String,
    conversation_id: String,
  },
  { timestamps: true }
);

export const Message = model('messages', messageSchema);
