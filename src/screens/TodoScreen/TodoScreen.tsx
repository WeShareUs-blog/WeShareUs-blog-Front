import { useState } from 'react';
import { Chip, Divider, Stack, Typography } from '@mui/material';
import { today } from '../../libs/dayjs';
import { useQuery } from '../../libs/react-query';
import { todoRepository } from '../../repositories/todo.repository';
import { Layout, TodoList } from '../../components';
import { TodoListSkeleton } from '../../skeleton';

function TodoScreen() {
  // 1. destructure props
  // 2. lib hooks

  // 3. state hooks
  const [publishedDate, setPublishedDate] = useState(today());

  // 4. query hooks
  const { data: todo, loading: isTodoLoading } = useQuery(
    todoRepository.retrieve,
    {
      variables: { publishedDate },
    },
  );

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Layout maxWidth="50%">
      <Stack
        sx={{
          borderRadius: '12px',
          boxShadow: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '24px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ color: '#FFF' }}>
          TODO LIST
        </Typography>
        <Divider sx={{ width: '90%', color: '#FFF' }}>
          <Chip
            label={`오늘의 할일(${todo?.todoItems.length || 0})`}
            sx={{ color: '#FFF', backgroundColor: 'black' }}
          />
        </Divider>
        {todo ? <TodoList todo={todo} /> : <TodoListSkeleton />}
      </Stack>
    </Layout>
  );
}

export { TodoScreen };
