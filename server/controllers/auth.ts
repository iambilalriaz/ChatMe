import { validate } from 'email-validator';
import { SignUpOptions, TypedRequestBody } from '../types';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from '../models/user';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

import { AvatarGenerator } from 'random-avatar-generator';

import { sign } from 'jsonwebtoken';
import { OTP } from '../models/OTP';
import otpGenerator from 'otp-generator';
import fs from 'fs';
import path from 'path';

const readHTMLFile = (
  path: string,
  callback: (err: NodeJS.ErrnoException | null, html?: any) => void
) => {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

export const userSignup = async (
  req: TypedRequestBody<SignUpOptions>,
  res: Response
) => {
  const { email, name, password } = req.body;
  try {
    if (!validate(email) || !name?.trim()) {
      return res.status(404).json({ message: 'Invalid email / name.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already registered with this email.' });
    }
    if (!password?.trim() || password?.trim()?.length < 6) {
      return res
        .status(404)
        .json({ message: 'Password should be at least six characters long.' });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const generator = new AvatarGenerator();
    const profileImage = generator.generateRandomAvatar();

    const userToBeCreated = new User({
      email,
      password: hashedPassword,
      name,
      profile_image: profileImage,
    });
    await userToBeCreated.save();
    return res.status(201).json({
      message: 'User created successfully.',
    });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
export const userLogin = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields.' });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const decoded = await compare(password, existingUser?.password as string);
  if (!decoded) {
    return res.status(404).json({ message: 'Invalid password.' });
  }
  const userToBeLoggedIn = {
    name: existingUser?.name,
    email: existingUser?.email,
    id: existingUser?._id,
    profile_image: existingUser?.profile_image,
  };
  const token = sign(
    userToBeLoggedIn,
    process.env.SECRET_ACCESS_TOKEN as string
  );

  return res.status(200).json({
    user: userToBeLoggedIn,
    token,
  });
};

export const sendOTP = async (
  req: TypedRequestBody<SignUpOptions>,
  res: Response
) => {
  const { email, name, password } = req.body;
  const alreadSentOTP = await OTP.findOne({ email });
  if (alreadSentOTP) {
    await OTP.deleteOne({ email });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(406)
      .json({ message: 'User with this email already exists.' });
  }
  if (email) {
    const otp = otpGenerator
      .generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      })
      .toUpperCase();
    const emailTemplate = path.join(__dirname, '..', 'templates', 'otp.html');
    readHTMLFile(emailTemplate, (err, html) => {
      const template = handlebars.compile(html);
      const replacements = {
        oneTimePassword: otp,
      };
      const htmlToSend = template(replacements);

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      transporter
        .sendMail({
          from: '"ChatMe" <iamdesigner124@gmail.com>',
          to: email,
          subject: 'OTP Verificatiom',
          html: htmlToSend,
        })
        .then(() => console.log('Email sent.'))
        .catch(() => console.log('Email not sent.'));
    });
    const newOTP = new OTP({
      email,
      otp,
    });
    newOTP
      .save()
      .then(() => {
        return res.status(200).json({ message: 'OTP sent successfully.' });
      })
      .catch(() => {
        return res.status(500).json({ message: 'Some error occured.' });
      });
  } else {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const otp = req?.body?.otp;
  const email = req?.body?.email;
  if (otp?.length === 4 && validate(email)) {
    const otpFromDb = await OTP.findOne({ otp, email });
    if (otpFromDb) {
      await OTP.deleteOne({ otp, email });
      return res.status(200).json({
        message: 'OTP verified successfully.',
      });
    } else {
      return res.status(404).json({ message: 'Unable to verify OTP.' });
    }
  } else {
    return res.status(400).json({ message: 'Please enter valid OTP.' });
  }
};
export const forgetPassword = (req: Request, res: Response) => {};
export const resetPassword = (req: Request, res: Response) => {};
