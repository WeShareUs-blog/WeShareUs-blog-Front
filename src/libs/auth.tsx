import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from './http-client';

export const useLogin: () => [
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
        .post<{ token: string; account: string }>('/users/login', variables)
        .then(({ token, account }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('account', account);
          navigation(`/${account}`);
        })
        .catch((err) => onError(err))
        .finally(() => setLoading(false));
    },
    { loading },
  ];
};

export const useKakaoLogin: () => [
  ({
    variables,
    onError,
  }: {
    variables: { code: string };
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
      variables: { code: string };
      onError: (err: Error) => void;
    }) => {
      setLoading(true);
      httpClient
        .post<{ token: string; account: string }>(
          '/users/login/kakao',
          variables,
        )
        .then(({ token, account }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('account', account);
          navigation(`/${account}`);
        })
        .catch((err) => onError(err))
        .finally(() => setLoading(false));
    },
    { loading },
  ];
};
