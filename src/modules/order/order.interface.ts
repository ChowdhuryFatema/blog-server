import mongoose from 'mongoose';

export interface IOrder {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  totalPrice: number;
  status: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}


// product details, total price, status
