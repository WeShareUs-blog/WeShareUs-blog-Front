import { useForm } from 'react-hook-form';
import { Box, Button, InputLabel, Stack, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRepository } from '../../repositories/uesr.repository';

const signupSchema = yup
  .object({
    account: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  })
  .required();
function SignupForm() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupSchema),
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Box
      sx={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '24px' }}
    >
      <Stack spacing="16px">
        <div>
          <InputLabel>계정</InputLabel>
          <TextField {...register('account')} fullWidth />
        </div>
        <div>
          <InputLabel>비밀번호</InputLabel>
          <TextField type="password" {...register('password')} fullWidth />
        </div>
        <div>
          <InputLabel>재확인 비밀번호</InputLabel>
          <TextField
            type="password"
            {...register('confirmPassword')}
            fullWidth
          />
        </div>
      </Stack>
      <Button
        onClick={handleSubmit(
          async ({ account, password, confirmPassword }) => {
            await userRepository.signup({ account, password, confirmPassword });
          },
        )}
      >
        회원가입
      </Button>
    </Box>
  );
}

export { SignupForm };
