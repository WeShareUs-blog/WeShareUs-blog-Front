import { Typography, Stack, Divider, Chip } from '@mui/material';
import { useState } from 'react';
import { CalendarDatePicker, Layout } from '../../components';
import { today } from '../../libs/dayjs';

function TodoScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [publishedDate, setPublishedDate] = useState(today());

  // 4. query hooks
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
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF' }}>
          Todo List
        </Typography>
        <CalendarDatePicker
          onChange={(date) => {
            setPublishedDate(date);
          }}
          publishedDate={publishedDate}
        />
        <Divider sx={{ width: '90%' }}>
          <Chip
            label={
              <Typography
                sx={{ color: '#FFF' }}
              >{`오늘의 할일(${0})`}</Typography>
            }
            sx={{ backgroundColor: '#000' }}
          />
        </Divider>
      </Stack>
    </Layout>
  );
}

export { TodoScreen };
