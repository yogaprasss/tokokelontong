import Layout from '@/layout';
import useProductsHooks from './hooks';
import styles from './Products.module.css';
import ProductCard from '@/components/ProductCard';

import { Pagination } from '@mui/material';
import SkeletonList from '@/components/Skeleton/list';
import SkeletonPagination from '@/components/Skeleton/pagination';

const ProductsView = () => {
  const {
    data: {
      isLoading,
      selectedCategory,
      categories,
      products,
      totalPage,
      page
    },
    methods: { onInputCategory, onChangePage, resetFilter }
  } = useProductsHooks();
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Products</h1>
        <div className={styles.filterContainer}>
          <p>Filter by Category</p>
          <select
            value={selectedCategory}
            onChange={onInputCategory}
            className={styles.categorySelector}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <button onClick={resetFilter} className={styles.buttonReset}>Reset</button>
          )}
        </div>
      </div>
      <br />
      <div className={styles.productsContainer}>
        {isLoading ?
          new Array(6).fill('').map((_, index) => <SkeletonList key={`skeleton-${index + 1}`} />) :
          products.map((item) => {
            return <ProductCard key={item.id} {...item} />
          }
        )}
      </div>
      <br />
      <br />
      <div className={styles.pagination}>
        {isLoading ?
          new Array(6).fill('').map((_, index) => <SkeletonPagination key={`skeleton-${index + 1}`} />) : (
          <Pagination page={page} count={totalPage} color='primary' onChange={onChangePage} />
        )}
      </div>
    </Layout>
  );
};

export default ProductsView;
