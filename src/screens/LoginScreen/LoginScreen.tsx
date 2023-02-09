import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KakaoLoginButton, Layout } from '../../components';
import { useLogin } from '../../libs/auth';
import { SIGNUP_PATH } from '../../routes/const';

const loginSchema = yup.object({
  account: yup.string().required(),
  password: yup.string().required(),
});

function LoginScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [loginUser, { loading }] = useLogin();

  // 3. state hooks
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // 4. query hooks
  // 5. form hooks
  const {
    formState: { errors, isValid },
    register,
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
    <Layout width="320px">
      <Box
        sx={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px' }}
      >
        <Stack spacing={4}>
          <TextField
            {...register('account')}
            placeholder="아이디"
            fullWidth
            error={!!errors.account}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <Stack>
            <TextField
              {...register('password')}
              fullWidth
              type={isShowPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              error={!!errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {loginErrorMessage && (
              <FormHelperText sx={{ color: 'red', marginLeft: '4px' }}>
                {loginErrorMessage}
              </FormHelperText>
            )}
          </Stack>
          <Stack spacing={2}>
            <LoadingButton
              size="medium"
              loading={loading}
              disabled={!isValid}
              onClick={handleSubmit(async ({ account, password }) => {
                setLoginErrorMessage('');
                await loginUser({
                  variables: { account, password },
                  onError: (err) => {
                    setLoginErrorMessage(err.message);
                  },
                });
              })}
              sx={{
                backgroundColor: isValid ? '#C99DCA' : '#E2C0E3',
                '&:hover': { backgroundColor: '#C99DCA' },
              }}
            >
              로그인하기
            </LoadingButton>
            <KakaoLoginButton />
          </Stack>
        </Stack>
        <FormHelperText>
          처음이신가요?{' '}
          <Link
            to={SIGNUP_PATH}
            style={{ textDecorationLine: 'none', color: 'blue' }}
          >
            회원가입
          </Link>
          을 진행해주세요.
        </FormHelperText>
      </Box>
    </Layout>
  );
}

export { LoginScreen };
