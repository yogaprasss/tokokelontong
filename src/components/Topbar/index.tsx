import { Snackbar } from '@mui/material';
import styles from './Topbar.module.css';
import useTopbarHooks from './hooks';

const Topbar = () => {
  const {
    data: { isShowSnackbar },
    methods: { logout, handleClose }
  } = useTopbarHooks();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isShowSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Logout Success'
      />
      <div className={styles.topbar}>
        <button
          className={styles.buttonLogout}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Topbar;
