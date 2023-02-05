import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { TodoList } from './TodoList';

type ArgsTypes = ComponentProps<typeof TodoList>;

export default {
  title: 'components/TodoList',
  component: TodoList,
  parameters: {
    msw: {
      handlers: {
        updateTodo: rest.patch(
          `http://localhost:4000/users/todos`,
          (req, res, ctx) => res(ctx.json({ data: {} })),
        ),
      },
    },
  },
  args: {
    todo: {
      id: '1',
      publishedDate: '2023-01-01',
      userId: '1',
      todoItems: [
        {
          content: 'Todo list-1',
          done: false,
        },
        {
          content: 'Todo list-2',
          done: true,
        },
        {
          content: 'Todo list-3',
          done: false,
        },
      ],
    },
  },
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
