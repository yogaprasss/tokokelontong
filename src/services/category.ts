import axios from 'axios';

import { baseURL } from '@/utils/constant';
import { capitalizeWord } from '@/utils/string';

export interface CategoryOption {
  label: string;
  value: string;
}

export const getAllCategories = async () => {
  const path = '/products/categories';
  const result = await axios.get(baseURL + path);
  const categories: CategoryOption[] = result.data.map((item: string) => {
    const label = item.split(' ').map((word) => capitalizeWord(word)).join(' ');
    return { label, value: item };
  });
  return categories;
};