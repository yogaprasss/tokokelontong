/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

const useTopbarHooks = () => {
  const router = useRouter();
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  const logout = useCallback(() => {
    window.localStorage.removeItem('token');
    setIsShowSnackbar(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsShowSnackbar(false);
    router.replace('/login');
  }, []);

  return {
    data: {isShowSnackbar},
    methods: { logout, handleClose }
  };
};

export default useTopbarHooks;
