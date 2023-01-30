import { httpClient } from '../libs/http-client';
import { queryKeyMap } from '../libs/react-query';

export type Todo = {
  id: string;
  publishedDate: string;
  userId: string;
  todoItems: {
    content: string;
    done: boolean;
  }[];
};
const todoRepository = {
  async retrieve({ publishedDate }: { publishedDate: string }) {
    return httpClient.get<Todo>('/users/todos', { params: { publishedDate } });
  },

  async edit({ id, todoItems }: { id: string; todoItems: any }) {
    return httpClient.patch('/users/todos', { id, todoItems });
  },
};

queryKeyMap.set(todoRepository.retrieve, ['todos']);
queryKeyMap.set(todoRepository.edit, ['todos']);

export { todoRepository };
