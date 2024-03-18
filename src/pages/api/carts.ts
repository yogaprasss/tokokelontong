// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllCarts } from '@/services/carts';
import { getUserById } from '@/services/user';
import { getProductById } from '@/services/product';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { CartProps, ProductCartProps } from '@/services/carts';
import type { ProductProps } from '@/services/product';
import type { UserProps } from '@/services/user';

export interface ProductCartMetadataProps extends ProductCartProps, ProductProps {}

export interface CartMetadataProps extends CartProps {
  user: UserProps;
  products: ProductCartMetadataProps[];
}

interface CartsResponse {
  count: Number;
  carts: CartMetadataProps[];
}

const mapProducts = async (item: ProductCartProps) => {
  const product = await getProductById(item.productId);
  return {
    ...item,
    ...product
  } as ProductCartMetadataProps;
};

const mapCarts = async (item: CartProps) => {
  const user = await getUserById(item.userId);
  const products = await Promise.all(item.products.map(mapProducts));
  return {
    ...item,
    user,
    products
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartsResponse>,
) {
  const data = await getAllCarts();
  if (data) {
    const page = Number(req.query.page as string);
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    const allCarts = await Promise.all(data.map(mapCarts));
    const carts = allCarts.slice(startIndex, endIndex);
    const response: CartsResponse = { count: allCarts.length, carts };
    res.status(200).json(response);
  } else {
    res.status(500);
  }
}