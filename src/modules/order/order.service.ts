
import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { IUser } from '../user/user.interface';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { orderUtils } from './order.utils';

const createOrder = async (
  payload: IOrder,
  productId: string,
  quantity: number,
  user: JwtPayload,
  client_ip: string,
) => {

  // Fetch the product from the database
  const orderedProduct = await Product.findById(productId);

  // Check if the product exists
  if (!orderedProduct) {
    throw new Error('Product not found');
  }

  // Check if there is enough stock for the order
  if (orderedProduct.quantity < quantity) {
    throw new Error(
      `Insufficient stock. Available quantity: ${orderedProduct.quantity}`,
    );
  }

  // Create the order
  let result = await Order.create(payload);

  // Reduce the product quantity and update inStock status
  orderedProduct.quantity -= quantity;
  if (orderedProduct.quantity === 0) {
    orderedProduct.inStock = false;
  }

  let totalPrice = orderedProduct.price * quantity;

  console.log("totalPrice", totalPrice)
  await orderedProduct.save();

  // payment integration

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: result._id,
    currency: "BDT",
    customer_name: result.name,
    customer_address: result.address,
    customer_email: user.email,
    customer_phone: result.phone,
    customer_city: result.city,
    client_ip
  }

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    result = await Order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus
      }
    })
  }

  return payment.checkout_url;
  // return { result, payment };
};


const getAllOrders = async () => {
  const result = await Order.find();
  return result;
}


const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {

    await Order.findOneAndUpdate({
      "transaction.id": order_id,
    }, {
      "transaction.bank_status": verifiedPayment[0].bank_status,
      "transaction.sp_code": verifiedPayment[0].sp_code,
      "transaction.sp_message": verifiedPayment[0].sp_message,
      "transaction.method": verifiedPayment[0].method,
      "transaction.date_time": verifiedPayment[0].date_time,
      status: 
      verifiedPayment[0].bank_status == "Success" ? "Paid" :
      verifiedPayment[0].bank_status === "Failed" ? "Pending" : 
      verifiedPayment[0].bank_status === "Cancel" ? "Cancelled" : "" 
    })
  }


  return verifiedPayment;
}

const getRevenue = async () => {
  const [result] = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result ? result.totalRevenue : 0;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  verifyPayment,
  getRevenue,
};
