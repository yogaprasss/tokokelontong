import Image from 'next/image';
import useLoginHooks from './hooks';
import styles from './Login.module.css';
import EyeIcon from '@/assets/eye.svg';
import EyeSlashIcon from '@/assets/eye-slash.svg';

import { Alert, Snackbar } from '@mui/material';

const LoginView = () => {
  const {
    data: {
      username,
      password,
      isErrorUsername,
      isErrorPassword,
      togglePassword,
      isLoading,
      isErrorLogin,
      responseMessage,
      isShowSnackbar
    },
    methods: {
      onInputUsername,
      onInputPassword,
      onTogglePassword,
      onSubmit,
      onCloseSnackbar
    }
  } = useLoginHooks();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        open={isShowSnackbar}
        onClose={onCloseSnackbar}
      >
        <Alert severity={isErrorLogin ? 'error' : 'success'} variant='filled'>
          {responseMessage}
        </Alert>
      </Snackbar>
      <form className={styles.container} onSubmit={onSubmit}>
        <h1 className={styles.title}>Login</h1>
        <div>
          <input
            placeholder='Username'
            value={username}
            onChange={onInputUsername}
            disabled={isLoading}
            className={styles.input}
          />
          {isErrorUsername && <p className={styles.errorMessage}>Min. 8 Karakter</p>}
        </div>
        <div>
          <div className={styles.passwordContainer}>
            <input
              placeholder='Password'
              type={togglePassword ? 'text' : 'password'}
              value={password}
              onChange={onInputPassword}
              disabled={isLoading}
              className={styles.inputPassword}
            />
            <button
              type='button'
              onClick={onTogglePassword}
              className={styles.buttonTogglePassword}
            >
              <Image src={togglePassword ? EyeSlashIcon : EyeIcon} alt='pw' width={16} height={16} />
            </button>
          </div>
          {isErrorPassword && <p className={styles.errorMessage}>Min. 8 Karakter</p>}
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className={styles.buttonLogin}
        >
          Login
        </button>
      </form>
    </>
  )
};

export default LoginView;
