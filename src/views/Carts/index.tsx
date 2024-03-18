import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SkeletonTable from '@/components/Skeleton/table';
import SkeletonPagination from '@/components/Skeleton/pagination';
import Layout from '@/layout';
import useCartsHooks from './hooks';
import styles from './Carts.module.css';

import { formatCurrency, isoDateToString } from '@/utils/string';
import { Dialog, DialogTitle, Pagination } from '@mui/material';

const tableColumns = [
  'Buyer Name',
  'Date',
  'Products'
];

const CartsView = () => {
  const {
    data: {
      carts,
      page,
      totalPage,
      isShowProduct,
      selectedProduct,
      startDate,
      endDate,
      isLoading,
      isShowModalAddCart
    },
    methods: {
      onChangePage,
      onShowProduct,
      toggleShowProduct,
      onInputStartDate,
      onInputEndDate,
      submitFilter,
      resetFilter,
      toggleModalAddCart
    }
  } = useCartsHooks();
  return (
    <>
      <Dialog open={isShowProduct} onClose={toggleShowProduct}>
        <DialogTitle>Products</DialogTitle>
        <div className={styles.productListContainer}>
          {selectedProduct.map((product) => (
            <div key={product.id} className={styles.productContainer}>
              <div className={styles.productImageTitleContainer}>
                <Image
                  src={product.image}
                  alt='product-img'
                  width={50}
                  height={80}
                  className={styles.productImage}
                />
                <div>
                  <h4>{product.title}</h4>
                  <p>{formatCurrency(product.price)}</p>
                </div>
              </div>
              <div className={styles.productQuantity}>
                Qty: <strong>{product.quantity}</strong>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
      <Dialog open={isShowModalAddCart} onClose={toggleModalAddCart}>
        <DialogTitle>New Cart</DialogTitle>
        <div className={styles.comingSoon}>
          Coming Soon
        </div>
      </Dialog>
      <Layout>
        <div>
          <div className={styles.titleContainer}>
            <h1>Carts</h1>
            <div className={styles.filterContainer}>
              <h4>Filter Date</h4>
              <label htmlFor='start-date'>Start Date</label>
              <input
                type='date'
                id='start-date'
                name='start-date'
                value={startDate}
                onChange={onInputStartDate}
              />
              <label htmlFor='start-date'>End Date</label>
              <input
                type='date'
                id='start-date'
                name='start-date'
                value={endDate}
                onChange={onInputEndDate}
              />
              <button
                type='button'
                onClick={submitFilter}
                className={styles.buttonSubmitFilter}
              >
                Submit
              </button>
              {(startDate || endDate) && (
                <button
                  type='button'
                  onClick={resetFilter}
                  className={styles.buttonResetFilter}
                >
                  Reset
                </button>
              )}
              <button type='button' onClick={toggleModalAddCart} className={styles.buttonAddCart}>
                Add Cart
              </button>
            </div>
          </div>
          <div>
            {isLoading ? <SkeletonTable /> : (
              <Table>
                <TableHead>
                  <TableRow>
                    {tableColumns.map((item, index) => (
                      <TableCell key={`column-${index + 1}`}>{item}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carts.map((cart) => (
                    <TableRow
                      key={cart.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{cart.user.name.firstname} {cart.user.name.lastname}</TableCell>
                      <TableCell>{isoDateToString(cart.date)}</TableCell>
                      <TableCell>
                        <button
                          type='button'
                          onClick={onShowProduct(cart.products)}
                          className={styles.buttonSeeProduct}
                        >
                          See Products
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <br />
            <div className={styles.pagination}>
              {isLoading ?
                new Array(4).fill('').map((_, index) => <SkeletonPagination key={`skeleton-${index + 1}`} />) : (
                <Pagination page={page} count={totalPage} color='primary' onChange={onChangePage} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartsView;
