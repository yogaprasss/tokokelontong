import axios from 'axios';

import { baseURL } from '@/utils/constant';

export interface ProductCartProps {
  productId: string | number;
  quantity: number
}

export interface CartProps {
  id: string| number;
  userId: string | number;
  date: string;
  products: ProductCartProps[];
  __v?: number;
}

export const getAllCarts = async () => {
  const path = '/carts';
  const result = await axios.get(baseURL + path);
  return result.data as CartProps[];
};
