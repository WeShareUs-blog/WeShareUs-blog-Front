import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { SignupScreen } from './SignupScreen';

type ArgsTypes = ComponentProps<typeof SignupScreen>;

export default {
  title: 'screens/SignupScreen',
  component: SignupScreen,
  parameters: {
    msw: {
      handlers: {
        checkAccount: rest.post(
          'http://localhost:4000/users/signup/check',
          (req, res, ctx) => res(ctx.json({})),
        ),
        register: rest.post(
          'http://localhost:4000/users/signup',
          (req, res, ctx) => res(ctx.json({})),
        ),
      },
    },
  },
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
