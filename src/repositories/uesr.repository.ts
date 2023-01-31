import { httpClient } from '../libs/http-client';

const userRepository = {
  async signup({
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
