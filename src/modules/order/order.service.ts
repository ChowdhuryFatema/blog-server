import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (
  payload: IOrder,
  productId: string,
  quantity: number,
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
  const result = await Order.create(payload);

  // Reduce the product quantity and update inStock status
  orderedProduct.quantity -= quantity;
  if (orderedProduct.quantity === 0) {
    orderedProduct.inStock = false;
  }
  await orderedProduct.save();

  return result;
};

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
  getRevenue,
};
