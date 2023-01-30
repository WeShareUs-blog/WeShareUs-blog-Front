import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
          <InputLabel>Account</InputLabel>
          <TextField {...register('account')} fullWidth />
        </div>
        <div>
          <InputLabel>Password</InputLabel>
          <TextField
            {...register('password')}
            fullWidth
            variant="outlined"
            type={isShowPassword ? 'text' : 'password'}
            error={!!errorMessage || !!errors.password}
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
          Login
        </Button>
      </Stack>
    </Box>
  );
}

export { LoginForm };
