import { httpClient } from '../libs/http-client';

const userRepository = {
  async checkAccount({ account }: { account: string }) {
    return httpClient.post('/users/signup/check', { account });
  },
};

export { userRepository };
