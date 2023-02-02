import { httpClient } from '../libs/http-client';

const userRepository = {
  async checkAccount({ account }: { account: string }) {
    return httpClient.post('/users/signup/check', { account });
  },

  async register({
    account,
    password,
    confirmPassword,
  }: {
    account: string;
    password: string;
    confirmPassword: string;
  }) {
    return httpClient.post('/users/signup', {
      account,
      password,
      confirmPassword,
    });
  },
};

export { userRepository };
