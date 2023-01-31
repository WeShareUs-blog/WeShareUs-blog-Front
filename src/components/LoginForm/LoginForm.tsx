import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useSignIn } from '../../libs/auth';
import { MAIN_PATH } from '../../routes/const';

const loginSchema = yup.object({
  account: yup.string().required(),
  password: yup.string().required(),
});
function LoginForm() {
  // 1. destructure props
  // 2. lib hooks
  const navigation = useNavigate();
  const [userLogin] = useSignIn();

  // 3. state hooks
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 4. query hooks
  // 5. form hooks
  const {
    register,
    formState: { isValid, errors },
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
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigation(MAIN_PATH);
    }
  }, []);

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
          <TextField
            {...register('account')}
            fullWidth
            placeholder="아이디"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            {...register('password')}
            fullWidth
            variant="outlined"
            placeholder="비밀번호"
            type={isShowPassword ? 'text' : 'password'}
            error={!!errorMessage || !!errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
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
          {errorMessage && (
            <FormHelperText sx={{ color: 'red' }}>
              {errorMessage}
            </FormHelperText>
          )}
        </div>
        <Button
          disabled={!isValid}
          onClick={handleSubmit(async ({ account, password }) => {
            await userLogin({
              variables: { account, password },
              onError: (err: Error) => {
                setErrorMessage(err.message);
              },
            });
          })}
          sx={{
            backgroundColor: isValid ? '#C99DCA' : '#807097',
            '&:hover': { backgroundColor: '#C99DCA' },
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>로그인</Typography>
        </Button>
      </Stack>
      <FormHelperText sx={{ marginTop: '12px' }}>
        처음이신가요?{' '}
        <Link
          to="/signup"
          style={{ textDecorationLine: 'none', color: 'blue' }}
        >
          회원가입
        </Link>
        을 진행해주세요.
      </FormHelperText>
    </Box>
  );
}

export { LoginForm };
