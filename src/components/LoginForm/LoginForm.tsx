import { Box, InputLabel, Stack, TextField } from '@mui/material';

function LoginForm() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255)',
        borderRadius: '12px',
        padding: ' 24px',
      }}
    >
      <Stack>
        <div>
          <InputLabel>Account</InputLabel>
          <TextField fullWidth />
        </div>
        <div>
          <InputLabel>Password</InputLabel>
          <TextField fullWidth />
        </div>
      </Stack>
    </Box>
  );
}

export { LoginForm };
