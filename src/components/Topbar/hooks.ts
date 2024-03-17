import { useCallback } from 'react';

const useTopbarHooks = () => {
  const logout = useCallback(() => {}, []);

  return {
    data: {},
    methods: { logout }
  };
};

export default useTopbarHooks;
