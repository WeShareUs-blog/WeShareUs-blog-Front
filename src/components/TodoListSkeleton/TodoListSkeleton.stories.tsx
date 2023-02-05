import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TodoListSkeleton } from './TodoListSkeleton';

type ArgsTypes = ComponentProps<typeof TodoListSkeleton>;

export default {
  title: 'components/TodoListSkeleton',
  component: TodoListSkeleton,
} as Meta<ArgsTypes>;

export const Default: StoryObj<ArgsTypes> = {};
