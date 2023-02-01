import {
  Box,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Layout } from '../../components';

const signupSchema = yup
  .object({
    account: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  })
  .required();
function SignupScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // 4. query hooks
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupSchema),
  });

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Layout width="360px">
      <Box
        sx={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px' }}
      >
        <Stack spacing={4}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <TextField
              {...register('account')}
              placeholder="아이디"
              error={!!errors.account}
              sx={{ width: '75%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              sx={{
                height: '36px',
                backgroundColor: '#dbe5ff',
                '&:hover': { backgroundColor: '#dbe5ff' },
              }}
            >
              중복확인
            </LoadingButton>
          </Stack>
          <TextField
            {...register('password')}
            type="password"
            placeholder="비밀번호"
            fullWidth
            error={!!errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <div>
            <TextField
              {...register('confirmPassword')}
              type="password"
              placeholder="비밀번호 재확인"
              error={!!errors.confirmPassword}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {passwordErrorMessage && (
              <FormHelperText sx={{ marginLeft: '4px', color: 'red' }}>
                {passwordErrorMessage}
              </FormHelperText>
            )}
          </div>
          <LoadingButton
            disabled={!isValid}
            onClick={handleSubmit(
              async ({ account, password, confirmPassword }) => {
                if (password !== confirmPassword) {
                  setPasswordErrorMessage('비밀번호와 일치하지 않습니다.');
                }
              },
            )}
            sx={{
              backgroundColor: isValid ? '#C99DCA' : '#E2C0E3',
              '&:hover': { backgroundColor: '#C99DCA' },
            }}
          >
            회원가입하기
          </LoadingButton>
        </Stack>
      </Box>
    </Layout>
  );
}

export { SignupScreen };
