import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKakaoLogin } from '../../libs/auth';

function KakaoAuthScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [kakaoLogin] = useKakaoLogin();
  const [searchParams] = useSearchParams();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values

  // 7. effect hooks
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      kakaoLogin({
        variables: { code },
        onError: () => {
          alert('이상하다');
        },
      });
    }
  }, []);
  // 8. handlers
  return <div>kakao loading</div>;
}

export { KakaoAuthScreen };
