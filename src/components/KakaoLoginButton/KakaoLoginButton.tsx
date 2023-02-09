import { Button, Link } from '@mui/material';
import { KAKAO_LOGIN_PATH } from '../../routes/const';

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
    <Button component={Link} href={KAKAO_LOGIN_PATH}>
      카카오로 로그인하기
    </Button>
  );
}

export { KakaoLoginButton };
