import { httpClient } from '../libs/http-client';

const userRepository = {
  async checkAccount({ account }: { account: string }) {
    return httpClient.post('/users/signup/check', { account });
  },

  async register({
    account,
    nickname,
    password,
    confirmPassword,
  }: {
    account: string;
    nickname: string;
    password: string;
    confirmPassword: string;
  }) {
    return httpClient.post('/users/signup', {
      account,
      nickname,
      password,
      confirmPassword,
    });
  },
};

export { userRepository };
