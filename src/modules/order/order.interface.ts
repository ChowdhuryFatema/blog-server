import mongoose from 'mongoose';

export interface IOrder {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  status: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  }
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}


// product details, total price, status
