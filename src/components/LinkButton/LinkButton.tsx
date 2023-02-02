import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

function LinkButton(props: { to: string; children: ReactNode }) {
  // 1. destructure props
  const { to, children } = props;

  // 2. lib hooks
  const navigation = useNavigate();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Button
      sx={{ color: '#FAD4D2' }}
      onClick={() => {
        navigation(to);
      }}
    >
      {children}
    </Button>
  );
}

export { LinkButton };
