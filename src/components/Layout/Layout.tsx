import { Stack } from '@mui/material';
import { ReactNode } from 'react';

function Layout(props: { width: string; children: ReactNode }) {
  // 1. destructure props
  const { width, children } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack sx={{ width, margin: '0 auto', padding: ' 144px 16px' }}>
      {children}
    </Stack>
  );
}

export { Layout };
