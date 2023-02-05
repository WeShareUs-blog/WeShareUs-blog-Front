import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { within, userEvent, waitFor } from '@storybook/testing-library';
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

export const FailLogin: StoryObj<ArgsTypes> = {
  parameters: {
    msw: {
      handlers: {
        login: rest.post('http://localhost:4000/users/login', (req, res, ctx) =>
          res(
            ctx.status(400),
            ctx.json({ errorMessage: '아이디 또는 비밀번호가 틀렸습니다.' }),
          ),
        ),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const accountTextInput = await canvas.findByPlaceholderText('아이디');
    await userEvent.type(accountTextInput, 'testID');

    const passwordTextInput = await canvas.findByPlaceholderText('비밀번호');
    await userEvent.type(passwordTextInput, '1234');

    const loginButton = await canvas.findByRole('button', {
      name: '로그인하기',
    });

    await waitFor(async () => {
      await userEvent.click(loginButton);
      // const errorMessageText = await canvas.findByText(
      //   '아이디 또는 비밀번호가 틀렸습니다.',
      // );
      // expect(errorMessageText).toBeInTheDocument();
    });
  },
};
