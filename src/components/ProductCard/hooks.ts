import { useCallback } from 'react';

const useProductCardHooks = () => {
  const deleteProduct = useCallback((
    id: string | number,
    callback: (id: string | number) => void
  ) => () => {
    callback(id);
  }, []);

  const background = useCallback((styles: { [key: string]: string }, category: string) => {
    const categoryLowerCase = category.toLowerCase();
    if (categoryLowerCase === 'electronics') return styles.category1;
    if (categoryLowerCase === 'jewelery') return styles.category2;
    if (categoryLowerCase === 'men\'s clothing') return styles.category3;
    if (categoryLowerCase === 'women\'s clothing') return styles.category4;
    return '';
  }, []);

  return {
    data: {},
    methods: { deleteProduct, background }
  }
};

export default useProductCardHooks;
