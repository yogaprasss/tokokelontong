import axios from 'axios';

import { baseURL } from '@/utils/constant';

interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

export interface UserProps {
  address: Address;
  id: string| number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v?: number;
}

interface LoginPayload {
  username: string;
  password: string;
}

export const getUserById = async (id: string | number) => {
  const path = `/users/${id}`;
  const result = await axios.get(baseURL + path);
  return result.data as UserProps;
};

export const login = async (payload: LoginPayload) => {
  const path = '/auth/login';
  try {
    const result = await axios.post(baseURL + path, payload);
    if (result) return result.data;
  } catch (e) {
    return e;
  }
};

