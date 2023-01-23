import { httpClient } from '../libs/http-client';
import { queryKeyMap } from '../libs/react-query';

const userRepository = {
  async login({ account, password }: { account: string; password: string }) {
    return httpClient.post<{ token: string }>('/users/login', {
      account,
      password,
    });
  },
};

queryKeyMap.set(['user'], userRepository.login);

export { userRepository };
