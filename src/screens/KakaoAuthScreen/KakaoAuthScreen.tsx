import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKakaoLogin } from '../../libs/auth';

function KakaoAuthScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [kakaoLogin] = useKakaoLogin();
  const [searchParams] = useSearchParams();

  // 3. state hooks
  const [errorMessage, setErrorMessage] = useState('');
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values

  // 7. effect hooks
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      kakaoLogin({
        variables: { code },
        onError: (err) => {
          setErrorMessage(err.message);
        },
      });
    }
  }, []);
  // 8. handlers
  return <div>{errorMessage}</div>;
}

export { KakaoAuthScreen };
