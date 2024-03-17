// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllProducts, getProductsByCategory } from '@/services/product';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProductProps } from '@/services/product';

interface ProductsResponse {
  count: number;
  products: ProductProps[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsResponse>,
) {
  const category = req.query.category as string;
  const data = await (!category ? getAllProducts() : getProductsByCategory(category));

  if (data) {
    const page = Number(req.query.page as string);
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const products = data.slice(startIndex, endIndex);
    const response = { count: data.length, products };
    res.status(200).json(response);
  } else {
    res.status(500);
  }
}