import { httpClient } from '../libs/http-client';
import { queryClient, queryKeyMap } from '../libs/react-query';

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

  async edit({
    id,
    publishedDate,
    todoItems,
  }: {
    id: string;
    publishedDate: string;
    todoItems: { content: string; done: boolean }[];
  }) {
    return httpClient.patch('/users/todos', { id, todoItems }).then(() => {
      queryClient.invalidateQueries(['todo', publishedDate]);
    });
  },
};

queryKeyMap.set(todoRepository.retrieve, ['todo']);
queryKeyMap.set(todoRepository.edit, ['todo']);

export { todoRepository };
