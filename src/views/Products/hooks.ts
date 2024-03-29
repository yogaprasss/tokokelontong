/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllCategories } from '@/services/category';
import { deleteProduct } from '@/services/product';

import type { ChangeEvent } from 'react';
import type { CategoryOption } from '@/services/category';
import type { ProductProps } from '@/services/product';

const useProductsHooks = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  const getCategories = useCallback(async () => {
    const data = await getAllCategories();
    setCategories([{ label: 'Select Categories', value: '' }, ...data]);
  }, []);

  const getProducts = useCallback(async () => {
    setIsLoading(true);

    const pathname = '/api/products';
    const pageQuery = `?page=${page}`;
    const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';

    const data = await axios.get(pathname + pageQuery + categoryQuery);
    if (data) {
      setProducts(data.data.products as unknown as ProductProps[]);
      setTotalPage(Math.ceil((data.data.count as unknown as number) / 6));
    }
  
    setIsLoading(false);
  }, [page, selectedCategory]);

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    await getCategories();
    await getProducts();
    setIsLoading(false);
  }, []);

  const onInputCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
  }, [page]);

  const onChangePage = useCallback((e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const resetFilter = useCallback(() => {
    setSelectedCategory('');
    setPage(1);
  }, []);

  const onDeleteProduct = useCallback(async (id: string | number) => {
    const result = await deleteProduct(id);
    if (result) {
      setIsShowSnackbar(true);
      setProducts((_products) => _products.filter((item) => item.id !== id));
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsShowSnackbar(false);
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) router.replace('/login');
    else getAllData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, selectedCategory]);

  return {
    data: {
      isLoading,
      categories,
      selectedCategory,
      products,
      totalPage,
      page,
      isShowSnackbar
    },
    methods: {
      onInputCategory,
      onChangePage,
      resetFilter,
      onDeleteProduct,
      handleClose
    }
  }
};

export default useProductsHooks;
