import { useRouter } from 'next/router';

const useLayoutHooks = () => {
  const router = useRouter();

  return {
    data: { pathname: router.pathname },
    methods: {}
  }
};

export default useLayoutHooks;
