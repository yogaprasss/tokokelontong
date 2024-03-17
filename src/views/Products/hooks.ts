/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getAllCategories } from '@/services/category';

import type { CategoryOption } from '@/services/category';

const useProductsHooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategories = useCallback(async () => {
    const data = await getAllCategories();
    setCategories([{ label: 'Select Categories', value: '' }, ...data]);
  }, []);

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    await getCategories();
    setIsLoading(false);
  }, []);

  const onInputCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return {
    data: { isLoading, categories, selectedCategory },
    methods: { onInputCategory }
  }
};

export default useProductsHooks;
