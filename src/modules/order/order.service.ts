import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import Order from "./order.model";
import { orderUtils } from "./order.utils";
import { Product } from "../product/product.model";
import { JwtPayload } from "jsonwebtoken";

const createOrder = async (
  client_ip: string,
  user: JwtPayload,
  payload: { products: { product: string; quantity: number }[] }
) => {
  console.log(payload);
  if (!payload?.products?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        const stock = product ?  (product.quantity || 0) - item.quantity : 0;
        totalPrice += subtotal;
        product.quantity = stock;
        return item;
      }
    })
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  const paymentDetails = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: "N/A",
    customer_email: user.email, // optional
    customer_address: "N/A",
    customer_phone: "N/A",
    customer_city: "N/A",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(paymentDetails);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        status: payment.transactionStatus,
      },
    });
  }

  return { order, payment };
};


const getOrders = async (userId: string) => {
  const data = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return data;
};

const verifyPayment = async (sp_trxn_id: string) => {
  const verifiedResponse = await orderUtils.verifyPaymentAsync(sp_trxn_id);

  if (verifiedResponse.length) {
    await Order.findOneAndUpdate(
      { "transaction.id": sp_trxn_id },
      {
        "transaction.code": verifiedResponse[0].sp_code,
        "transaction.message": verifiedResponse[0].sp_message,
        "transaction.status": verifiedResponse[0].transaction_status,
        "transaction.method": verifiedResponse[0].method,
        "transaction.bank_status": verifiedResponse[0].bank_status,
        "transaction.date_time": verifiedResponse[0].date_time,
        status:
          verifiedResponse[0].bank_status == "Success"
            ? "Paid"
            : verifiedResponse[0].bank_status == "Cancel"
            ? "Cancelled"
            : "Pending",
      }
    );
  }
  return verifiedResponse;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
};