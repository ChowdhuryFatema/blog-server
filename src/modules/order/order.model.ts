import mongoose, { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required and must be a valid number.'],
      min: 1,
    },
    status: {
      type: String,
      required: [true, 'Status is required.'],
      min: 0,
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);

