import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from './http-client';
import { MAIN_PATH } from '../routes/const';

export const useSignIn: () => [
  ({
    variables,
    onError,
  }: {
    variables: { account: string; password: string };
    onError: (err: Error) => void;
  }) => void,
  { loading: boolean },
] = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  return [
    ({
      variables,
      onError,
    }: {
      variables: { account: string; password: string };
      onError: (err: Error) => void;
    }) => {
      setLoading(true);
      httpClient
        .post<{ token: string }>('/users/login', variables)
        .then(({ token }) => {
          localStorage.setItem('token', token);
          navigation(MAIN_PATH);
        })
        .catch((err) => onError(err))
        .finally(() => setLoading(false));
    },
    { loading },
  ];
};

export const useSignup: () => [
  ({
    variables,
    onError,
  }: {
    variables: { account: string; password: string; confirmPassword: string };
    onError: (err: Error) => void;
  }) => void,
] = () => {
  const [, setLoading] = useState(false);

  return [
    ({
      variables,
      onError,
    }: {
      variables: { account: string; password: string; confirmPassword: string };
      onError: (err: Error) => void;
    }) => {
      setLoading(true);
      httpClient
        .post('/users/signup', variables)
        .catch((err) => onError(err))
        .finally(() => setLoading(false));
    },
  ];
};
