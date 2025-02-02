export interface IProduct {
  name: string;
  brand: string;
  price: number;
  image: string;
  model: string;
  category: string;
  inStock: boolean;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// name, brand, price, model, stock
