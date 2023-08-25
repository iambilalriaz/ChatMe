import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: [String],
    marked_as_read: Boolean,
    last_message_text: String,
  },
  {
    timestamps: true,
  }
);

export const Conversation = model('conversations', conversationSchema);
