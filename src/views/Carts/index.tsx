import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useCartsHooks from './hooks';
import Layout from '@/layout';
import styles from './Carts.module.css';

import { isoDateToString } from '@/utils/string';

const tableColumns = [
  'Buyer Name',
  'Date',
  'Products'
];

const CartsView = () => {
  const {
    data: { carts }
  } = useCartsHooks();
  return (
    <Layout>
      <div>
        <div className={styles.titleContainer}>
          <h1>Carts</h1>
        </div>
        <div>
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
                    <button>See Products</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default CartsView;
