import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import TodoListStories from '../../components/TodoList/TodoList.stories';
import { TodoScreen } from './TodoScreen';

type ArgsTypes = ComponentProps<typeof TodoScreen>;

export default {
  title: 'screens/TodoScreen',
  component: TodoScreen,
  parameters: {
    msw: {
      handlers: {
        ...(TodoListStories.parameters?.msw?.handlers || {}),
        retrieveTodo: rest.get(
          'http://localhost:4000/users/todos',
          (req, res, ctx) =>
            res(
              ctx.json({
                data: {
                  id: 'uuid',
                  publishedDate: '2023-01-01',
                  userId: 'userId-uuid',
                  todoItems: [
                    {
                      content: 'content',
                      done: false,
                    },
                  ],
                },
              }),
            ),
        ),
      },
    },
  },
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
