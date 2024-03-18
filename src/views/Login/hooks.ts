/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/services/user';

import type { ChangeEvent, FormEvent } from 'react';

const useLoginHooks = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  const onInputUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (isSubmit) setIsErrorUsername(value.length < 8);
  }, [isSubmit]);

  const onInputPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (isSubmit) setIsErrorPassword(value.length < 8);
  }, [isSubmit]);

  const onTogglePassword = useCallback(() => {
    setTogglePassword((value) => !value);
  }, []);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const invalidUsername = username.length < 8;
    const invalidPassword = password.length < 8;

    if (!isSubmit) setIsSubmit(true);
    if (invalidUsername || invalidUsername) {
      setIsErrorUsername(invalidUsername);
      setIsErrorPassword(invalidPassword);
      return;
    }
    setIsLoading(true);
    const result = await login({ username, password });
    if (result?.code === 'ERR_BAD_REQUEST') {
      setIsErrorLogin(true);
      setResponseMessage(result.response.data);
    } else {
      setIsErrorLogin(false);
      setResponseMessage('Login Success');
      window.localStorage.setItem('token', result.token);
    }
    setIsLoading(false);
    setIsShowSnackbar(true);
  }, [username, password, isSubmit]);

  const onCloseSnackbar = useCallback(() => {
    setIsShowSnackbar(false);
    if (!isErrorLogin) router.replace('/');
  }, [isErrorLogin]);

  return {
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
  };
};

export default useLoginHooks;
