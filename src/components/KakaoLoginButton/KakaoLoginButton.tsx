import { Button, Link, Stack, Typography } from '@mui/material';
import { Image } from '@mui/icons-material';
import { KAKAO_LOGIN_PATH } from '../../routes/const';
import KakaoIcon from '../../assets/kakao-icon.svg';

function KakaoLoginButton() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Button
      component={Link}
      href={KAKAO_LOGIN_PATH}
      sx={{
        backgroundColor: '#ffe500',
        '&:hover': { backgroundColor: '#ffe500' },
      }}
    >
      <img src={`${KakaoIcon}`} />
      <Typography sx={{ marginLeft: '8px' }}>카카오로 로그인하기</Typography>
    </Button>
  );
}

export { KakaoLoginButton };
