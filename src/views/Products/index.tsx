import Layout from '@/layout';
import useProductsHooks from './hooks';
import styles from './Products.module.css';
import ProductCard from '@/components/ProductCard';
import SkeletonList from '@/components/Skeleton/list';
import SkeletonPagination from '@/components/Skeleton/pagination';

import { Pagination, Snackbar } from '@mui/material';

const ProductsView = () => {
  const {
    data: {
      isLoading,
      selectedCategory,
      categories,
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
  } = useProductsHooks();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isShowSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Success delete product'
      />
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
              return <ProductCard key={item.id} {...item} onDeleteProduct={onDeleteProduct} />
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
    </>
  );
};

export default ProductsView;
