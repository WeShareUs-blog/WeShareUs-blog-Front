import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

type ArgsTypes = ComponentProps<typeof Header>;

export default {
  title: 'components/Header',
  component: Header,
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
