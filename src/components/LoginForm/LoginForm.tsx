import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '../../libs/react-query';
import { userRepository } from '../../repositories/uesr.repository';

const loginSchema = yup.object({
  account: yup.string().required(),
  password: yup.string().required(),
});
function LoginForm() {
  // 1. destructure props
  // 2. lib hooks
  const navigation = useNavigate();

  // 3. state hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // 4. query hooks
  const [loginUser] = useMutation(userRepository.login);

  // 5. form hooks
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: ' 24px',
      }}
    >
      <Stack spacing="24px">
        <div>
          <InputLabel>Account</InputLabel>
          <TextField {...register('account')} fullWidth autoComplete="off" />
        </div>
        <div>
          <InputLabel>Password</InputLabel>
          <TextField
            {...register('password')}
            fullWidth
            variant="outlined"
            type={isShowPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsShowPassword(!isShowPassword);
                    }}
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          disabled={!isValid}
          onClick={handleSubmit(async ({ account, password }) => {
            const { token } = await loginUser({
              variables: { account, password },
            });

            if (token) {
              localStorage.setItem('token', token);
              navigation('/');
            }
          })}
          sx={{
            backgroundColor: isValid ? '#8bc34a' : '#aed581',
            '&:hover': { backgroundColor: '#8bc34a' },
          }}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
}

export { LoginForm };
