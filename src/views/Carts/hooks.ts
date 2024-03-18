/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import dayjs from 'dayjs';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { ChangeEvent } from 'react';
import type { CartMetadataProps, ProductCartMetadataProps } from '@/pages/api/carts';

const useCartsHooks = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<CartMetadataProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductCartMetadataProps[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const getCarts = useCallback(async () => {
    setIsLoading(true);

    const pathname = '/api/carts';
    const pageQuery = `?page=${page}`;
    const startDateQuery = startDate ? `&startdate=${startDate}` : '';
    const endDateQuery = endDate ? `&enddate=${endDate}` : '';

    const data = await axios.get(pathname + pageQuery + startDateQuery + endDateQuery);
    if (data) {
      setCarts(data.data.carts as unknown as CartMetadataProps[]);
      setTotalPage(Math.ceil((data.data.count as unknown as number) / 5));
    }
  
    setIsLoading(false);
    setIsFetching(false);
  }, [page, startDate, endDate]);

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    await getCarts();
    setIsLoading(false);
  }, []);

  const onChangePage = useCallback((e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIsFetching(true);
  }, []);

  const toggleShowProduct = useCallback(() => {
    setIsShowProduct((value) => !value);
  }, []);

  const onShowProduct = useCallback((product: ProductCartMetadataProps[]) => () => {
    setSelectedProduct(product);
    toggleShowProduct();
  }, []);

  const onInputStartDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(dayjs(e.target.value).format('YYYY-MM-DD'));
  }, [])

  const onInputEndDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(dayjs(e.target.value).format('YYYY-MM-DD'));
  }, [])

  const submitFilter = useCallback(() => {
    setPage(1);
    setIsFetching(true);
  }, [startDate, endDate]);

  const resetFilter = useCallback(async () => {
    setStartDate('');
    setEndDate('');
    setPage(1);
    setIsFetching(true);
  }, [startDate, endDate]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) router.replace('/login');
    else getAllData();
  }, []);

  useEffect(() => {
    if (isFetching) getCarts();
  }, [isFetching]);

  return {
    data: {
      isLoading,
      carts,
      totalPage,
      page,
      isShowProduct,
      selectedProduct,
      startDate,
      endDate
    },
    methods: {
      onChangePage,
      toggleShowProduct,
      onShowProduct,
      onInputStartDate,
      onInputEndDate,
      submitFilter,
      resetFilter
    }
  }
};

export default useCartsHooks;
