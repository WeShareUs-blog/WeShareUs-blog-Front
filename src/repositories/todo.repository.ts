import { httpClient } from '../libs/http-client';
import { queryKeyMap } from '../libs/react-query';

const todoRepository = {
  async retrieve({ publishedDate }: { publishedDate: string }) {
    return httpClient.get('/users/todos', { params: { publishedDate } });
  },
};

queryKeyMap.set(todoRepository.retrieve, ['todos']);

export { todoRepository };
