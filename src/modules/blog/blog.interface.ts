import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IBlog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | IUser;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
