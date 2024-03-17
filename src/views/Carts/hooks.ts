/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';

import type { ChangeEvent } from 'react';
import type { CartMetadataProps } from '@/pages/api/carts';

const useCartsHooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<CartMetadataProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getCarts = useCallback(async () => {
    setIsLoading(true);

    const pathname = '/api/carts';
    const pageQuery = `?page=${page}`;

    const data = await axios.get(pathname + pageQuery);
    if (data) {
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

  const onChangePage = useCallback((e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
      page
    },
    methods: { onChangePage }
  }
};

export default useCartsHooks;
