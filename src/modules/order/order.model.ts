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
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required and must be a valid number.'],
      min: 0,
    },
    status: {
      type: String,
      required: [true, 'Status is required.'],
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
