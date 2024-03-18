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

export const getAllCarts = async (startDate: string, endDate: string) => {
  const path = '/carts';

  const queryArray: string[] = [];
  if (!!startDate) queryArray.push(`startdate=${startDate}`);
  if (!!endDate) queryArray.push(`enddate=${endDate}`);
  const query = queryArray.length > 0 ? `?${queryArray.join('&')}` : '';
  const result = await axios.get(baseURL + path + query);
  return result.data as CartProps[];
};
