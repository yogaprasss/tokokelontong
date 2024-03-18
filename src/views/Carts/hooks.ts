/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { CartMetadataProps, ProductCartMetadataProps } from '@/pages/api/carts';

const useCartsHooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<CartMetadataProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductCartMetadataProps[]>([]);

  const getCarts = useCallback(async () => {
    setIsLoading(true);

    const pathname = '/api/carts';
    const pageQuery = `?page=${page}`;

    const data = await axios.get(pathname + pageQuery);
    if (data) {
      console.log(data.data.count);
      setCarts(data.data.carts as unknown as CartMetadataProps[]);
      setTotalPage(Math.ceil((data.data.count as unknown as number) / 5));
    }
  
    setIsLoading(false);
  }, [page]);

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    await getCarts();
    setIsLoading(false);
  }, []);

  const onChangePage = useCallback((e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const toggleShowProduct = useCallback(() => {
    setIsShowProduct((value) => !value);
  }, []);

  const onShowProduct = useCallback((product: ProductCartMetadataProps[]) => () => {
    setSelectedProduct(product);
    toggleShowProduct();
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getCarts();
  }, [page]);

  return {
    data: {
      isLoading,
      carts,
      totalPage,
      page,
      isShowProduct,
      selectedProduct
    },
    methods: { onChangePage, toggleShowProduct, onShowProduct }
  }
};

export default useCartsHooks;
