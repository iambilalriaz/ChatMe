import { connect } from 'mongoose';

export const createDBConnection = async () => {
  try {
    await connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.3dvhxwm.mongodb.net/`
    );
    console.log('DB connection established.');
  } catch (err) {
    console.log('Failed to connect to DB.', err);
  }
};
