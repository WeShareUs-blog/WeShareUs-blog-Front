import { Typography, Stack, Divider, Chip } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDatePicker, Layout, TodoList } from '../../components';
import { today } from '../../libs/dayjs';
import { useQuery } from '../../libs/react-query';
import { todoRepository } from '../../repositories/todo.repository';

function TodoScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [searchParams, setSearchParams] = useSearchParams();

  // 3. state hooks
  const [publishedDate, setPublishedDate] = useState(today());

  // 4. query hooks
  const { data: todo } = useQuery(todoRepository.retrieve, {
    variables: { publishedDate },
  });

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Layout width="40%">
      <Stack
        boxShadow={3}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          alignItems: 'center',
          padding: '24px 16px',
        }}
      >
        <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF' }}>
            Todo List
          </Typography>
          <CalendarDatePicker
            onChange={(date) => {
              setPublishedDate(date);
              searchParams.set('publishedDate', date);
              setSearchParams(searchParams);
            }}
            publishedDate={publishedDate}
          />
          <Divider sx={{ width: '90%' }}>
            <Chip
              label={
                <Typography sx={{ color: '#FFF' }}>{`오늘의 할일(${
                  todo?.todoItems.length || 0
                })`}</Typography>
              }
              sx={{ backgroundColor: '#000' }}
            />
          </Divider>
        </Stack>
        {todo && <TodoList todo={todo} />}
      </Stack>
    </Layout>
  );
}

export { TodoScreen };
