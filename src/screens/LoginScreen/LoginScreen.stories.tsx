import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { LoginScreen } from './LoginScreen';

type ArgsTypes = ComponentProps<typeof LoginScreen>;

export default {
  title: 'screens/LoginScreen',
  component: LoginScreen,
  parameters: {
    msw: {
      handlers: {
        login: rest.post('http://localhost:4000/users/login', (req, res, ctx) =>
          res(ctx.json({ data: { token: 'ejdhekadklhjgioe-dklahkles;d' } })),
        ),
      },
    },
  },
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
