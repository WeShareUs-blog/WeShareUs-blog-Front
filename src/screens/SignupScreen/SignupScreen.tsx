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
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components';
import { userRepository } from '../../repositories/user.repository';
import { useMutation } from '../../libs/react-query';

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
  const navigation = useNavigate();

  // 3. state hooks
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [accountErrorMessage, setAccountErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // 4. query hooks
  const [checkAccount, { loading: isCheckAccount }] = useMutation(
    userRepository.checkAccount,
    {
      onCompleted: () => {
        setAccountErrorMessage('사용 가능한 계정입니다.');
        setIsValidAccount(true);
      },
      onError: (err) => setAccountErrorMessage(err.message),
    },
  );
  const [registerAccount, { loading: isRegisteringAccount }] = useMutation(
    userRepository.register,
    {
      onCompleted: () => {
        navigation('/login');
      },
    },
  );

  // 5. form hooks
  const {
    formState: { errors, isValid },
    getValues,
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

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Layout width="360px">
      <Box
        sx={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '12px' }}
      >
        <Stack>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <TextField
              {...register('account')}
              onChange={() => {
                setIsValidAccount(false);
                setAccountErrorMessage('');
              }}
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
              loading={isCheckAccount}
              onClick={async () => {
                await checkAccount({
                  variables: { account: getValues('account') },
                });
              }}
              sx={{
                height: '36px',
                backgroundColor: '#dbe5ff',
                '&:hover': { backgroundColor: '#dbe5ff' },
              }}
            >
              중복확인
            </LoadingButton>
          </Stack>
          {accountErrorMessage && (
            <FormHelperText
              sx={{ marginLeft: '4px', color: isValidAccount ? 'blue' : 'red' }}
            >
              {accountErrorMessage}
            </FormHelperText>
          )}
          <Stack spacing={4} sx={{ marginTop: '16px' }}>
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
              loading={isRegisteringAccount}
              disabled={!isValid || !isValidAccount}
              onClick={handleSubmit(
                async ({ account, password, confirmPassword }) => {
                  if (!isValidAccount) {
                    setAccountErrorMessage('중복 확인을 해주세요.');
                    return;
                  }
                  if (password !== confirmPassword) {
                    setPasswordErrorMessage('비밀번호와 일치하지 않습니다.');
                    return;
                  }

                  await registerAccount({
                    variables: { account, password, confirmPassword },
                  });
                },
              )}
              sx={{
                backgroundColor:
                  !isValid || !isValidAccount ? '#C99DCA' : '#E2C0E3',
                '&:hover': { backgroundColor: '#E2C0E3' },
              }}
            >
              회원가입하기
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}

export { SignupScreen };
