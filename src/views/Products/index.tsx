import Layout from '@/layout';
import useProductsHooks from './hooks';
import styles from './Products.module.css';

const ProductsView = () => {
  const {
    data: { selectedCategory, categories },
    methods: { onInputCategory }
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductsView;
